import { Types } from "mongoose";
import { CollectionNames } from "../../db/models/base.model";
import { QuestionModel } from "../../db/models/test/question/question.model";
import { TestError } from "../../db/models/test/test.error";
import { TestModel, TestSubject } from "../../db/models/test/test.model";
import { TestGetDto } from "../../validation/dto/test.dto";
import { aggregate, countTotal, create, findById, findPagin, markAsDeleted, updateOne, updateOneQuery } from "../base.service";
import { getTotalQuestionsService } from "./question.service";

export async function saveTestService(data) {
    try {
        const test = await create(TestModel, data)
        return test;
    } catch (e) {
        if (e.code == 11000) throw TestError.AlreadyExists(Object.keys(e.keyPattern))
        throw TestError.UnknownError(e);
    }
}

export async function updateTestService(id: string, data) {
    try {
        const test = await updateOne(TestModel, new Types.ObjectId(id), data)
        return test;
    } catch (e) {
        if (e.code == 11000) throw TestError.AlreadyExists(Object.keys(e.keyPattern))
        throw TestError.UnknownError(e);
    }
}

export async function markTestAsDeletedService(id: string) {
    return await markAsDeleted(TestModel, new Types.ObjectId(id))
}

export async function getTestByIdService(id: string) {
    const test = await findById(TestModel, id);
    if (!test) throw TestError.NotFound(id);
    return test;
}

export async function getTestByIdFullService(id: string) {
    const $match = {
        $match: { _id: new Types.ObjectId(id) }
    }

    const $unwindSubjects = {
        $unwind: {
            path: '$subjects',
            preserveNullAndEmptyArrays: true
        }
    }

    const $lookupSubject = {
        $lookup: {
            from: CollectionNames.SUBJECT,
            localField: 'subjects.subjectId',
            foreignField: '_id',
            as: 'subjects.subject'
        }
    }

    const $lookupSection = {
        $lookup: {
            from: CollectionNames.SECTION,
            localField: 'subjects.sectionId',
            foreignField: '_id',
            as: 'subjects.section'
        }
    }

    const $lookupTopic = {
        $lookup: {
            from: CollectionNames.TOPIC,
            localField: 'subjects.topicId',
            foreignField: '_id',
            as: 'subjects.topic'
        }
    }

    const $lookupUserLevel = {
        $lookup: {
            from: CollectionNames.USER_LEVEL,
            localField: 'subjects.userLevelId',
            foreignField: '_id',
            as: 'subjects.userLevel'
        }
    }
    const $project = {
        $project: {
            _id: 1,
            name: 1,
            questionCount: 1,
            paymentType: 1,
            type: 1,
            subjects: {
                subject: { $first: '$subjects.subject' },
                section: {
                    $cond: {
                        if: {
                            $gte: [{ $type: { $first: '$subjects.topic' } }, null]
                        },
                        then: { $first: '$subjects.section' },
                        else: null
                    }
                },
                topic: {
                    $cond: {
                        if: {
                            $gte: [{ $type: { $first: '$subjects.topic' } }, null]
                        },
                        then: { $first: '$subjects.topic' },
                        else: null
                    }
                },
                userLevel: { $first: '$subjects.userLevel' },
                mark: 1,
                questionCount: 1
            },
            startingDate: 1,
            finishingDate: 1,
            duration: 1,
            isAvailable: 1,
            solvedUserCount: 1,
            solvingUserCount: 1,
            createdAt: 1,
            updatedAt: 1
        }
    };

    const $group = {
        $group: {
            _id: '$_id',
            doc: { $first: '$$ROOT' },
            subjects: {
                $push: '$subjects'
            }
        }
    };

    const $replaceRoot = {
        $replaceRoot: {
            newRoot: {
                $mergeObjects: [
                    '$doc',
                    {
                        subjects: '$subjects'
                    }
                ]
            }
        }
    };

    const $pipeline = [
        $match,
        $unwindSubjects,
        $lookupSubject,
        $lookupSection,
        $lookupTopic,
        $lookupUserLevel,
        $project,
        $group,
        $replaceRoot
    ];

    const data = await aggregate(TestModel, $pipeline);
    const test = data.shift();
    if (!test) throw TestError.NotFound(id);
    return test
}

export async function getTestsPagingService(dto: TestGetDto) {
    const query: any = {
        isDeleted: false
    };

    const {
        subjectId, sectionId, topicId, userLevelId
    } = dto

    if (subjectId) {
        query.subjects = {
            $elemMatch: {
                subjectId: new Types.ObjectId(subjectId)
            }
        }
    }

    if (sectionId) {
        query.subjects.$elemMatch = {
            ...query.subjects.$elemMatch,
            sectionId: new Types.ObjectId(sectionId)
        } as any
    }

    if (topicId) {
        query.subjects.$elemMatch = {
            ...query.subjects.$elemMatch,
            topicId: new Types.ObjectId(topicId)
        } as any
    }

    if (userLevelId) {
        query.subjects.$elemMatch = {
            ...query.subjects.$elemMatch,
            userLevelId: new Types.ObjectId(userLevelId)
        } as any
    }

    const data = await findPagin(TestModel, query, dto, []);

    return data;
}

export async function updateQuestionCountService(testId: string, subjectId: string) {

    try {

        const countQuery: any = {
            testId: new Types.ObjectId(testId)
        }
        countQuery.subjectId = new Types.ObjectId(subjectId);
        const subjectTestCount = await getTotalQuestionsService(countQuery);

        const subjectQuery = {
            testId: new Types.ObjectId(testId),
            'subjects.subjectId': new Types.ObjectId(subjectId)
        }

        const subjectCount = {
            'subjects.$.questionCount': subjectTestCount
        };

        const subjectUpdateResult = await updateOneQuery(TestModel, subjectQuery, subjectCount);
        delete countQuery.subjectId

        console.log(subjectUpdateResult)

        const testquestionCount = await getTotalQuestionsService(countQuery);
        const test = await updateTestService(testId, {
            questionCount: testquestionCount
        });

        console.log(test)

        let score = 0;
        for (const subject of test.subjects) {
            score += subject.mark * subject.questionCount
        };

        await updateTestService(testId, {
            maxScore: score
        })

    } catch (e) {
        console.log(e)
    }
}
