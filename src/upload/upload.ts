import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';
import { BaseError } from '../common/reporter/base.error';

async function uploadFileHandler(request, reply) {
    try {
        const files = request.raw.files;
        if (!files) throw BaseError.InvalidUploadType();
        const file = files['file'];
        if (!file) throw BaseError.InvalidUploadType();
        const name = '/uploads/file' + '-' + file.md5 + path.extname(file.name)

        const direction = path.join(__dirname, '../..');
        const wstream = fs.createWriteStream(direction + name);
        wstream.write(file.data);
        wstream.end();

        reply.success(name);
    } catch (e) {
        reply.fail(e);
    }
}

async function upload(instance, options, next) {
    instance.post(
        `/upload`,
        uploadFileHandler
    );
    next();
}

export const uploadPlugin = fp(upload)
