import fastifyJWT from "fastify-jwt";
import fp from "fastify-plugin";
import { getUserByPhoneNumberService } from "../../common/service/user.service";

//calls with every url query
export async function authenticate(request, reply) {
    try {
        const { phoneNumber } = await request.jwtVerify();

        const user = await getUserByPhoneNumberService(phoneNumber);

        request.user = user;
    } catch (error) {
        return reply.status(401).send({
            success: false,
            code: 401,
            statusCode: 401,
            message: "Authorization failed",
        });
    }
}

export async function mightyAuth(request, reply) {
    try {
        const { phoneNumber } = await request.jwtVerify();
        const user = await getUserByPhoneNumberService(phoneNumber);
        request.user = user;
    } catch (error) {

    }
}
async function auth(instance, options, next) {
    instance.register(fastifyJWT, {
        secret: process.env.USER_SECRET,
        sign: {
            expiresIn: "1y",
        },
    });
    instance.decorate("auth", authenticate);
    instance.decorate("mightyAuth", mightyAuth);

    instance.addHook('onRequest', function (request, reply, done) {
        request.instance = instance;
        request.lang = request.headers['language']
        done()
    });

    next();
}

export const authPlugin = fp(auth);
