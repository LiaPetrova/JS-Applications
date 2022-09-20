import page from '../node_modules/page/page.mjs';

import { logout } from './api/user.js';


import { addRender } from './middlewares/render.js';
import { updateNav } from './middlewares/updateNav.js';

import { dashboardPage } from './views/dashboard.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { createPage } from './views/create.js';

import { editPage } from './views/edit.js';
import { myBooksPage } from './views/myBooks.js';
import { detailsPage } from './views/details.js';
import { addSession } from './middlewares/session.js';


page(addSession);
page(addRender);
page(updateNav);

page('/edit/:id', editPage)
page('/details/:id', detailsPage);
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', onLogout);
page('/add', createPage);
page('/myBooks',myBooksPage);

page.start(); 

function onLogout() {
    logout();
    page.redirect('/dashboard');
}