import { Types } from "mongoose";
import { CollectionNames } from "../../db/models/base.model";
import { QuizQuestionModel } from "../../db/models/test/quiz/question/quiz-question.model";
import { QuizError } from "../../db/models/test/quiz/quiz.error";
import { QuizModel, QuizStatus } from "../../db/models/test/quiz/quiz.model";
import { QuizGetDto } from "../../validation/dto/quiz/quiz.dto";
import { aggregate, create, deleteOne, findById, findOne, findPagin, updateOne } from "../base.service";
import { getTestByIdService, updateTestService } from "../test/test.service";

export async function createQuizService(data) {
    try {
        let quiz = await findOne(QuizModel, {
            testId: data.testId,
            userId: data.userId,
            status: {
                $in: [QuizStatus.STARTED, QuizStatus.PENDING]
            }
        });
        if (quiz) return quiz;
        quiz = await create(QuizModel, data);
        return quiz;
    } catch (e) {
        if (e.code == 11000) throw QuizError.AlreadyExists(Object.keys(e.keyPattern))
        throw QuizError.UnknownError(e)
    }
}

export async function updateQuizService(id: string, data) {
    try {
        let quiz = await updateOne(QuizModel, new Types.ObjectId(id), data);
        if (!quiz) throw QuizError.NotFound(id)
        return quiz;
    } catch (e) {
        if (e.code == 11000) throw QuizError.AlreadyExists(Object.keys(e.keyPattern))
        throw QuizError.UnknownError(e)
    }
}

export async function deleteQuizService(id: string) {
    return await deleteOne(QuizModel, { _id: new Types.ObjectId(id) })
}

export async function getQuizByIdService(id) {
    const quiz = await findById(QuizModel, id);
    if (!quiz) throw QuizError.NotFound(id);
    return quiz;
}

export async function getQuizPagingService(data: QuizGetDto) {
    const { sectionId, userLevelId, subjectId, topicId, testId, userId, status } = data

    const query: any = {};

    if (sectionId) query.sectionId = new Types.ObjectId(sectionId)
    if (userLevelId) query.userLevelId = new Types.ObjectId(userLevelId)
    if (subjectId) query.subjectId = new Types.ObjectId(subjectId)
    if (topicId) query.topicId = new Types.ObjectId(topicId)
    if (testId) query.testId = new Types.ObjectId(testId)
    if (userId) query.userId = new Types.ObjectId(userId)
    if (status) query.status = status;

    const $lookupTest = {
        $lookup: {
            from: CollectionNames.TEST,
            foreignField: '_id',
            localField: 'testId',
            as: 'test'
        }
    }

    const $lookupUser = {
        $lookup: {
            from: CollectionNames.USER,
            foreignField: '_id',
            localField: 'userId',
            as: 'user'
        }
    }

    const $unwindTest = {
        $unwind: {
            path: '$test',
            preserveNullAndEmptyArrays: true
        }
    }

    const $unwindUser = {
        $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true
        }
    }

    const $project = {
        $project: {
            user: {
                firstName: 1,
                _id: 1,
                lastName: 1,
                phoneNumber: 1
            },
            test: {
                _id: 1,
                name: 1
            },
            startedAt: 1,
            createdAt: 1,
            finishedAt: 1,
            status: 1,
            score: 1
        }
    }

    const $pipeline = [
        $lookupTest,
        $lookupUser,
        $unwindTest,
        $unwindUser,
        $project
    ];

    const $sort = {
        createdAt: -1
    }

    const quiz = await findPagin(QuizModel, query, data, $pipeline, $sort);

    return quiz;

}

export async function calculateQuizResultService(id: string) {
    let quiz = await getQuizByIdService(id);
    const test = await getTestByIdService(quiz.testId.toString());
    let score = 0;
    let correctAnswerCount = 0
    const subjects = [];
    const $match = {
        $match: {
            quizId: quiz._id
        }
    };

    const $lookupQuestion = {
        $lookup: {
            from: CollectionNames.QUESTION,
            foreignField: '_id',
            localField: 'questionId',
            as: 'question'
        }
    };

    const $unwindQuestion = {
        $unwind: '$question'
    };

    const $unwindAnswers = {
        $unwind: '$question.answers'
    };

    const $matchAnswers = {
        $match: {
            $expr: {
                $and: [
                    {
                        $eq: ['$question.answers.isCorrect', true]
                    },
                    {
                        $let: {
                            vars: {
                                answerUuid: '$answerUuid',
                                innerAnswerUuid: '$question.answers.uuid'
                            },
                            in: {
                                $eq: [
                                    '$$answerUuid', '$$innerAnswerUuid'
                                ]
                            }
                        }
                    }
                ]
            }
        }
    }
    const $group = {
        $group: {
            _id: null,
            count: { $sum: 1 }
        }
    }

    for (const subject of test.subjects) {
        const $matchSubjects = {
            $match: {
                'question.subjectId': subject.subjectId
            }
        };

        const $pipeline = [
            $match,
            $lookupQuestion,
            $unwindQuestion,
            $matchSubjects,
            $unwindAnswers,
            $matchAnswers,
            $group
        ];

        const data = (await aggregate(QuizQuestionModel, $pipeline)).shift();
        const correctSubjectAnswerCount = data ? data.count : 0
        const result = {
            ...subject,
            correctAnswerCount: correctSubjectAnswerCount,
            score: correctSubjectAnswerCount * subject.mark
        };
        correctAnswerCount += correctSubjectAnswerCount
        score += result.score
        subjects.push(result)
    }

    quiz = await updateQuizService(id, {
        subjects: subjects,
        score: score,
        percent: quiz.maxScore == 0 ? 0 : score / quiz.maxScore,
        status: QuizStatus.FINISHED,
        finishedAt: new Date(),
        correctAnswerCount
    });

    await calculateTestUserCountService(quiz.testId.toString())
    return quiz;
}

export async function calculateTestUserCountService(testId: string) {
    let data: any = {}
    for (const status of Object.values(QuizStatus)) {
        const count = (await QuizModel.distinct('userId', { testId: new Types.ObjectId(testId), status: status })).length;
        switch (status) {
            case QuizStatus.PENDING: {
                data.registeredUserCount = count;
                break;
            }
            case QuizStatus.STARTED: {
                data.solvingUserCount = count;
                break;
            }
            case QuizStatus.FINISHED: {
                data.solvedUserCount = count;
            }
        }
    }

    const $matchBestResult = {
        $match: {
            status: QuizStatus.FINISHED,
            testId: new Types.ObjectId(testId)
        }
    };

    const $limit = {
        $limit: 1
    }

    const $sort = {
        $sort: {
            percent: 1
        }
    }

    const $pipelineBestResult = [
        $matchBestResult,
        $sort,
        $limit
    ]
    const bestResult = await (await aggregate(QuizModel, $pipelineBestResult)).shift()
    if (bestResult) {
        data.maxResultId = bestResult._id
        data.maxResult = bestResult.percent
    }

    const $group = {
        $group: {
            _id: null,
            allResult: { $sum: '$percent' },
            userCount: { $sum: 1 }
        }
    };

    const $pipelineAverageResult = [
        $matchBestResult,
        $group
    ]
    const averageResult = await (await aggregate(QuizModel, $pipelineAverageResult)).shift();
    if (averageResult) {
        data.averageResult = averageResult.allResult / averageResult.userCount
    }
    return await updateTestService(testId, data);
}