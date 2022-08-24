import * as authServices from '../services/authServices.js';

export const authMiddleware = (ctx, next) => {
    ctx.user = authServices.getUser();

    next();
}