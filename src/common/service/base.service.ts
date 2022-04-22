
import { BeAnObject, ModelType } from "@typegoose/typegoose/lib/types";
import { Document, Types } from "mongoose";
import { BaseError } from "../reporter/base.error";
import { PagingDto } from "../validation/dto/paging.dto";

export async function countTotal<T>(
    model: ModelType<T, BeAnObject>,
    query: object
) {
    try {
        return await model.countDocuments(query).exec();
    }
    catch (error) {
        console.log(error)
        throw BaseError.UnknownError(error)
    }
};

export async function findPagin<T>(
    model: ModelType<T & Document>,
    query,
    dto: PagingDto,
    additional_pipeline: any = [
        {
            $project: {
                __v: 0
            }
        }
    ],
    sort = null
) {

    const { limit, page,
        sortBy, asc
    } = dto;

    try {

        // if (!query.created_at) {
        //     query.created_at = {
        //         $gte: moment(date_from).startOf('day').toDate(),
        //         $lte: moment(date_to).endOf('day').toDate()
        //     }
        // }

        const total = await countTotal(
            model,
            query
        )
        const $match = {
            $match: query
        };

        const $sort = {
            $sort: {
                _id: -1
            }
        };

        if (sortBy) {
            $sort.$sort = {} as any;
            $sort.$sort[`${sortBy}`] = asc > 0 ? 1 : -1
        }
        else if (sort) {
            $sort.$sort = sort
        }

        const $skip = {
            $skip: limit * (page - 1)
        };

        const $limit = {
            $limit: limit
        };

        let pipeline: Array<any> = [
            $match,
            $sort,
            $skip,
            $limit
        ];

        if (additional_pipeline.length > 0) {
            pipeline = [...pipeline, ...additional_pipeline]
        };

        const data = await model.aggregate(pipeline).allowDiskUse(true).exec();
        return {
            total,
            data
        };
    }
    catch (error) {
        console.log(error)
        throw BaseError.UnknownError(error)
    }
};

export async function find<T>(
    model: ModelType<T & Document>,
    query: object,
    project: object = {
        __v: 0
    }
) {
    try {
        return await model.find(query, project);
    } catch (error) {
        console.log(error);
        throw BaseError.UnknownError(error)
    }
}

export async function getAll<T>(
    model: ModelType<T & Document>,
) {
    try {
        const filter = {};
        return await model.find(filter).exec();
    } catch (e) {
        console.log(e);
        throw BaseError.UnknownError(e);
    }
}

export async function findOne<T>(
    model: ModelType<T & Document>,
    query: object,
    project: any = { __v: 0 }
) {
    try {
        return await model.findOne(query, project).exec();
    } catch (error) {
        console.log(error)
        throw BaseError.UnknownError(error)
    }
};

export async function findById<T>(
    model: ModelType<T & Document>,
    id: string,
    project: any = { __v: 0 }
) {
    try {
        return await model.findById(id, project).exec();
    } catch (error) {
        console.log(error)
        throw BaseError.UnknownError(error)
    }
};

export async function create<T>(
    model: ModelType<T & Document>,
    item,
    project: any = { __v: 0 }
) {
    try {
        const { _id: id } = await new model(item).save();
        return await findById(model, id, project);
    } catch (e) {
        // reportBug(e);
        console.log(e);
        throw e
    }
};

export async function deleteOne<T>(
    model: ModelType<T & Document>,
    query: object
) {
    try {
        return await model.deleteOne(query).exec();
    }
    catch (error) {
        console.log(error);
        throw BaseError.UnknownError(error)
    }
};

export async function deleteMany<T>(
    model: ModelType<T & Document>,
    query: object
) {
    try {
        return await model.deleteMany(query)
    } catch (e) {
        console.log(e);
        throw BaseError.UnknownError(e)
    }
};

export async function updateOne<T>(
    model: ModelType<T & Document>,
    id: any,
    data: any,
    projection: any = { __v: 0 }
) {
    try {
        return await model.findByIdAndUpdate(id, data, { new: true, projection: projection },).exec();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

export async function updateOneQuery<T>(
    model: ModelType<T & Document>,
    query: any,
    data: any
) {
    try {
        return await model.findOneAndUpdate(query, data, { new: true },).exec();
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};

export async function updateMany<T>(
    model: ModelType<T & Document>,
    query: object,
    data: object
) {
    try {
        return await model.updateMany(query, data);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export async function aggregate<T>(
    model: ModelType<T & Document>,
    pipeline
): Promise<Array<any>> {
    try {
        return await model.aggregate(pipeline).allowDiskUse(true).exec();
    }
    catch (error) {
        console.log(error);
        throw BaseError.UnknownError(error)
    }
};


export async function createMany<T>(
    model: ModelType<T & Document>,
    data: any[]
) {
    try {
        return await model.insertMany(data);
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const markAsDeleted = <T>(
    model: ModelType<T & Document>,
    id: Types.ObjectId
) => updateOne(model, id, { isDeleted: true })