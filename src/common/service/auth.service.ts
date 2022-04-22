
export function jwtSign(request, params) {
    return request.instance.jwt.sign(params);
}
