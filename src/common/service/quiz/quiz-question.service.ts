import { Types } from "mongoose";
import { CollectionNames } from "../../db/models/base.model";
import { QuestionError } from "../../db/models/test/question/question.error";
import { QuizQuestionError } from "../../db/models/test/quiz/question/quiz-question.error";
import { QuizQuestionModel } from "../../db/models/test/quiz/question/quiz-question.model"
import { aggregate, createMany, deleteMany, findById, updateOne } from "../base.service"

export async function saveQuizQuestionsService(data: any[]) {
    try {
        const questions = await createMany(QuizQuestionModel, data);
        return questions
    } catch (e) {
        throw QuizQuestionError.UnknownError(e)
    }
}

export async function updateQuizQuestionService(id: string, data) {
    try {
        const question = await updateOne(QuizQuestionModel, new Types.ObjectId(id), data);
        if (!question) throw QuestionError.NotFound(id)
        return question
    } catch (e) {
        throw QuizQuestionError.UnknownError(e)
    }
}

export async function deleteQuizQuestionsByQuiz(id: string) {
    return await deleteMany(QuizQuestionModel, { quizId: new Types.ObjectId(id) })
}

export async function getQuizQuestionsService(id: string) {
    const $match = {
        $match: { quizId: new Types.ObjectId(id) }
    };

    const $lookupQuestion = {
        $lookup: {
            from: CollectionNames.QUESTION,
            localField: 'questionId',
            foreignField: '_id',
            as: 'question'
        }
    };

    const $unwindQuestion = {
        $unwind: {
            path: '$question',
            preserveNullAndEmptyArrays: true
        }
    };

    const $projection = {
        $project: {
            _id: 1,
            question: {
                _id: 1,
                question: 1,
                answers: {
                    _id: 1,
                    uuid: 1,
                    image: 1,
                    title: 1
                },
                subjectId: 1
            },
            answerId: 1,
            answerUuid: 1
        }
    }

    const $unwindAnswers = {
        $unwind: '$question.answers'
    }

    const $group = {
        $group: {
            _id: '$_id',
            'answers': {
                $push: '$question.answers'
            },
            doc: { $first: '$$ROOT' }
        }
    };

    const $replaceRoot = {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    '$doc',
                    {
                        question: {
                            _id: '$doc.question._id',
                            question: '$doc.question.question',
                            'answers': '$answers',
                        }
                    }
                ]
            }
        }
    }

    const $sort = {
        $sort: { 'question.subjectId': 1 }
    };

    const $aggregation = [
        $match,
        $lookupQuestion,
        $unwindQuestion,
        $unwindAnswers,
        $projection,
        $group,
        $replaceRoot,
        $sort
    ];


    const data = await aggregate(QuizQuestionModel, $aggregation);
    return data;
}

export async function getQuizQuestionByIdService(id: string) {
    const question = await findById(QuizQuestionModel, id);
    if (!question) throw QuizQuestionError.NotFound(id);
    return question;
}