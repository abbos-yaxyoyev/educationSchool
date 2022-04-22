import dotenv from 'dotenv'
import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import path from 'path'
import { connectorPlugin } from '../common/db/connector'
import { replyPlugin } from '../common/reply/custom.reply'
import { authPlugin } from './middleware/auth'
import { newsUserPlugin } from './route/news.route'
import { questionUserPlugin } from './route/quiz/quiz-question.route'
import { quizUserPlugin } from './route/quiz/quiz.route'
import { regionUserPlugin } from './route/region.route'
import { sectionUserPlugin } from './route/section.route'
import { subjectUserPlugin } from './route/subject.route'
import { testUserPlugin } from './route/test/test.route'
import { topicUserPlugin } from './route/topic.route'
import { userLevelUserPlugin } from './route/user-level.route'
import { userTypeUserPlugin } from './route/user-type.route'
import { userPlugin } from './route/user.route'
dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

const server = fastify({
    logger: true
})

server.register(fastifyCors, {
    origin: true
})

server.register(connectorPlugin)
server.register(replyPlugin)
server.register(authPlugin)
server.register(regionUserPlugin)
server.register(userTypeUserPlugin)
server.register(userLevelUserPlugin)
server.register(subjectUserPlugin)
server.register(sectionUserPlugin)
server.register(topicUserPlugin)
server.register(newsUserPlugin)
server.register(userPlugin)
server.register(testUserPlugin)
server.register(quizUserPlugin)
server.register(questionUserPlugin)

function start() {
    server.listen({
        port: Number(process.env.USER_PORT) || 3000,
        host: '0.0.0.0'
    }).then(() => {
        console.log('User web started successfully')
    }).catch((e) => {
        console.log('User web failed to start')
        console.log(e)
    })
}

start();