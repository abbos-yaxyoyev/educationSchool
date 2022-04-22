import {Transform, TransformOptions} from 'class-transformer';
import {isEmpty} from "class-validator";

export interface TrimOptions {
    /** @default 'both' */
    strategy?: 'start' | 'end' | 'both';
}

export function Trim(options?: TrimOptions, transformOptions?: TransformOptions): (target: any, key: string) => void {
    return Transform((value: unknown) => {
        if ('string' !== typeof value) {
            return value;
        }

        let result;
        switch (options?.strategy) {
            case 'start': {
                result = value.trimLeft();
                break;
            }
            case 'end': {
                result = value.trimRight();
                break;
            }
            default: {
                result = value.trim();
                break;
            }
        }
        return isEmpty(result) ? null : result
    }, transformOptions);
}
