import { Types } from "mongoose";
import { CollectionNames } from "../../common/db/models/base.model";
import { QuizStatus } from "../../common/db/models/test/quiz/quiz.model";
import { TestError } from "../../common/db/models/test/test.error";
import { TestModel } from "../../common/db/models/test/test.model";
import { aggregate, findPagin } from "../../common/service/base.service";
import { TestGetDto } from "../../common/validation/dto/test.dto";

export async function getTestPaginUserService(dto: TestGetDto) {
    const query: any = {
        isDeleted: false,
        isAvailable: true
    };

    const {
        subjectId, sectionId, topicId
    } = dto

    if (subjectId) {
        query.subjects = {
            $elemMatch: {
                subjectId: new Types.ObjectId(subjectId)
            }
        }
    }

    if (sectionId) {
        query.sectionId = new Types.ObjectId(sectionId)
    }

    if (topicId) {
        query.topicId = new Types.ObjectId(topicId)
    }

    const $lookupQuiz = {
        $lookup: {
            from: CollectionNames.QUIZ,
            let: { testId: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ['$testId', '$$testId']
                                },
                                {
                                    $eq: ['$userId', dto.userId]
                                },
                                {
                                    $in: ['$status', [QuizStatus.PENDING, QuizStatus.STARTED]]
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        status: 1,
                        startedAt: 1
                    }
                }
            ],
            as: 'quiz'
        }
    }

    const $unwindQuiz = {
        $unwind: {
            path: '$quiz',
            preserveNullAndEmptyArrays: true
        }
    }

    const $unwindSubjects = {
        $unwind: '$subjects'
    }

    const $lookupSubject = {
        $lookup: {
            from: CollectionNames.SUBJECT,
            foreignField: '_id',
            localField: 'subjects.subjectId',
            as: 'subjects.subject'
        }
    }

    const $unwindSubject = {
        $unwind: '$subjects.subject'
    };

    const $project = {
        $project: {
            name: 1,
            questionCount: 1,
            paymentType: 1,
            type: 1,
            startingDate: 1,
            finishingDate: 1,
            duration: 1,
            isAvailable: 1,
            solvedUserCount: 1,
            solvingUserCount: 1,
            quiz: 1,
            subjects: {
                _id: 1,
                subject: {
                    _id: 1,
                    name: 1
                },
                mark: 1,
                questionCount: 1
            },
            averageResult: 1,
            maxResult: 1
        }
    }

    const $group = {
        $group: {
            _id: '$_id',
            subjects: {
                $push: '$subjects'
            },
            doc: { $first: '$$ROOT' }
        }
    };

    const $replaceRoot = {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    '$doc',
                    { subjects: '$subjects' }
                ]
            }
        }
    }

    const $pipeline = [
        $lookupQuiz,
        $unwindQuiz,
        $unwindSubjects,
        $lookupSubject,
        $unwindSubject,
        $project,
        $group,
        $replaceRoot
    ]

    const $sort = {
        createdAt: -1
    };

    const data = await findPagin(TestModel, query, dto, $pipeline, $sort);

    return data;
}

export async function getTestByIdUserService(id: string, userId) {
    const $match: any = {
        $match: { _id: new Types.ObjectId(id) }
    };

    const $lookupQuiz = {
        $lookup: {
            from: CollectionNames.QUIZ,
            let: { testId: '$_id' },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $eq: ['$testId', '$$testId']
                                },
                                {
                                    $eq: ['$userId', userId]
                                },
                                {
                                    $in: ['$status', [QuizStatus.PENDING, QuizStatus.STARTED]]
                                }
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        status: 1,
                        startedAt: 1
                    }
                }
            ],
            as: 'quiz'
        }
    }

    const $unwindQuiz = {
        $unwind: {
            path: '$quiz',
            preserveNullAndEmptyArrays: true
        }
    }

    const $unwindSubjects = {
        $unwind: '$subjects'
    }

    const $lookupSubject = {
        $lookup: {
            from: CollectionNames.SUBJECT,
            foreignField: '_id',
            localField: 'subjects.subjectId',
            as: 'subjects.subject'
        }
    }

    const $unwindSubject = {
        $unwind: '$subjects.subject'
    };

    const $project = {
        $project: {
            name: 1,
            questionCount: 1,
            paymentType: 1,
            type: 1,
            startingDate: 1,
            finishingDate: 1,
            duration: 1,
            isAvailable: 1,
            solvedUserCount: 1,
            solvingUserCount: 1,
            quiz: 1,
            subjects: {
                _id: 1,
                subject: {
                    _id: 1,
                    name: 1
                },
                mark: 1,
                questionCount: 1
            },
            averageResult: 1,
            maxResult: 1
        }
    }

    const $group = {
        $group: {
            _id: '$_id',
            subjects: {
                $push: '$subjects'
            },
            doc: { $first: '$$ROOT' }
        }
    };

    const $replaceRoot = {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    '$doc',
                    { subjects: '$subjects' }
                ]
            }
        }
    }

    const $pipeline = [
        $match,
        $lookupQuiz,
        $unwindQuiz,
        $unwindSubjects,
        $lookupSubject,
        $unwindSubject,
        $project,
        $group,
        $replaceRoot
    ]

    const data = await aggregate(TestModel, $pipeline);
    const test = data.shift();
    if (!test) throw TestError.NotFound(id)
    return test;
}