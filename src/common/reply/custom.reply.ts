import fp from "fastify-plugin";
import { BaseError } from "../reporter/base.error";

async function reply(instance, options, next) {

    instance.decorateReply("fail", function (error: BaseError) {
        instance.log.error(error);
        if (!error || !error.code) error = BaseError.UnknownError();
        this.status(400).send({
            success: false,
            ...error,
            time: new Date(),
        });
    });

    instance.decorateReply("success", function (resultData: any) {
        const result = BaseError.Success(resultData);
        this.status(200).send({
            success: true,
            ...result,
            time: new Date(),
        });
    });

    // global error handler
    instance.setErrorHandler((error, _request, reply) => {
        if (error instanceof BaseError) {
            reply.status(400).send(error)
        }
        else {
            reply.send(error)
        }
    })

    next();
}

export const replyPlugin = fp(reply);