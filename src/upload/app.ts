import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import path from 'path';

import dotenv from 'dotenv'
dotenv.config({
    path: path.resolve(
        __dirname,
        './../../.env'
    )
})
import fastifyFileUpload from 'fastify-file-upload';
import fastifyStatic from 'fastify-static';
import { replyPlugin } from '../common/reply/custom.reply';
import { uploadPlugin } from './upload';

const server = fastify({
    logger: true
});

server.register(fastifyCors, {
    origin: true
})

server.register(fastifyStatic, {
    root: path.join(__dirname, '../..', 'uploads'),
    prefix: '/public/uploads/'
});

server.register(replyPlugin);
server.register(fastifyFileUpload);

server.register(uploadPlugin);

async function start() {
    const options = {
        port: Number(process.env.UPLOAD_PORT) || 5000,
        host: '0.0.0.0'
    }
    try {
        server.listen(options);
        console.log('Upload started successfully');
    } catch (e) {
        console.log('Upload failed to start');
        console.log(e);
    }
}

start();