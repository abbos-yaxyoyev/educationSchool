import { Transform, TransformOptions } from "class-transformer";
import { isNumberString } from "class-validator";

export function NumberToString(transformOptions?: TransformOptions): (target: any, key: string) => void {
    return Transform((value: unknown) => {
        if (isNumberString(value)) return Number(value)
        return value;
    }, transformOptions);
}
