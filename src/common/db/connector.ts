
import fp from 'fastify-plugin'
import mongoose, { Mongoose } from 'mongoose'
import { QuizModel } from './models/test/quiz/quiz.model';

let connectRetry;
async function connect() {
    console.log(process.env.DB_URL)
    mongoose.set('debug', true)
    await mongoose.connect(process.env.DB_URL, {
        appName: 'school-edu',
        dbName: 'schoolEduDb',
        connectTimeoutMS: 5000
    }).then((m: Mongoose) => {
        if (connectRetry) clearTimeout(connectRetry)
        console.log('Db connected')
        QuizModel.syncIndexes()
    }).catch((e) => {
        console.log('Db failed to connect')
        console.log(e)
        if (!connectRetry) connectRetry = setTimeout(() => {
            connect()
        }, 5000);
    })
}


function plugin(instance, options, next) {
    connect()
    next()
}

export const connectorPlugin = fp(plugin)