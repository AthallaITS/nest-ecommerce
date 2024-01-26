/* eslint-disable */
export default async () => {
    const t = {
        ["./auth/dto/token.dto"]: await import("./auth/dto/token.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./auth/dto/create-user.dto"), { "CreateUserDto": { email: { required: true, type: () => String }, password: { required: true, type: () => String }, firstName: { required: false, type: () => String }, lastName: { required: false, type: () => String }, role: { required: true, type: () => Object, default: "USER" } } }], [import("./auth/dto/token.dto"), { "TokenDto": { accessToken: { required: true, type: () => String }, refreshToken: { required: true, type: () => String } } }], [import("./auth/dto/login.dto"), { "LoginDto": {} }]], "controllers": [[import("./auth/auth.controller"), { "AuthController": { "register": {}, "login": { type: t["./auth/dto/token.dto"].TokenDto }, "findAllUsers": {}, "findUser": {} } }]] } };
};