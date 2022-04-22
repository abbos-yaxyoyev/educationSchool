import fastify from "fastify";
import path from 'path'

import dotenv from 'dotenv'
dotenv.config({
    path: path.resolve(
        __dirname,
        './../../.env'
    )
})
import { connectorPlugin } from "../common/db/connector";
import { replyPlugin } from "../common/reply/custom.reply";
import { moderatorPlugin } from "./route/moderator.route";
import { authPlugin } from "./middleware/auth";
import { regionModeratorPlugin } from "./route/region.route";
import { roleModeratorPlugin } from "./route/role.route";
import { userTypePlugin } from "./route/user-type.route";
import { userLevelPlugin } from "./route/user-level.route";
import { subjectPlugin } from "./route/subject.route";
import { sectionPlugin } from "./route/section.route";
import { topicPlugin } from "./route/topic.route";
import { newsPlugin } from "./route/news.route";
import fastifyCors from "fastify-cors";
import { testModeratoPlugin } from "./route/test/test.route";
import { questionPlugin } from "./route/test/question.route";

const server = fastify({
    logger: true
})
server.register(fastifyCors, {
    origin: true
})

server.register(replyPlugin)
server.register(authPlugin)
server.register(connectorPlugin)
server.register(moderatorPlugin)
server.register(regionModeratorPlugin)
server.register(roleModeratorPlugin)
server.register(userTypePlugin)
server.register(userLevelPlugin)
server.register(subjectPlugin)
server.register(sectionPlugin)
server.register(topicPlugin)
server.register(newsPlugin)
server.register(testModeratoPlugin)
server.register(questionPlugin)

let startRetry;
function start() {
    server.listen({
        port: Number(process.env.MODERATOR_PORT) | 4000,
        host: '0.0.0.0'
    }).then(() => {
        if (startRetry) clearTimeout(startRetry)
        console.log('moderator started successfully')
    }).catch(e => {
        console.log(e)
        console.log('moderator failed to start')
        if (!startRetry) {
            startRetry = setTimeout(() => {
                start()
            }, 5000)
        }
    })
}

start()