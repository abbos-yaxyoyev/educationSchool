import fastifyJWT from "fastify-jwt";
import fp from "fastify-plugin";
import { getModeratorByNumberService } from "../service/moderator.service";

//calls with every url query
export async function authenticate(request, reply) {
    try {
        const { phoneNumber } = await request.jwtVerify();
        const moderator = await getModeratorByNumberService(phoneNumber)
        const token = request.headers['authorization']?.replace('Bearer ', '');
        const method: String = request.method;
        switch (method.toLocaleLowerCase()) {
            case 'delete': {
                request.body ? request.body.deletedBy = moderator._id : request.body = {
                    deletedBy: moderator._id
                };
                break;
            }
            case 'put': {
                request.body ? request.body.updatedBy = moderator._id : "";
                break;
            }
            case 'post': {
                request.body ? request.body.createdBy = moderator._id : ""
                break;
            }
            default: { }
        }

        request.moderator = moderator;
    } catch (error) {
        console.log(error)
        return reply.status(401).send({
            success: false,
            code: 401,
            statusCode: 401,
            message: "Authorization failed",
        });
    }
}

async function auth(instance, options, next) {

    instance.register(fastifyJWT, {
        secret: process.env.MODERATOR_SECRET,
        sign: {
            expiresIn: "1y",
        },
    });
    instance.decorate("auth", authenticate);

    instance.addHook('onRequest', function (request, reply, done) {
        request.instance = instance;
        request.lang = request.headers['language']
        done()
    });

    next();
}

export const authPlugin = fp(auth);
