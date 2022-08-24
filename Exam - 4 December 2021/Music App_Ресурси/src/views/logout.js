import * as authServices from '../services/userServices.js';

export const logoutView = (ctx) => {
    authServices.logout()
    .then(()=> {
        ctx.page.redirect('/');
    });
}