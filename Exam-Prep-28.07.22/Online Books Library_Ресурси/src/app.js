import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { dashboardPage } from './views/dashboard.js';

import * as api from './api/api.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/user.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { myBooksPage } from './views/myBooks.js';
import { searchPage } from './views/search.js';



const main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', () => console.log('home'));
page('/dashboard', dashboardPage);
page('/login', loginPage);
page('/register', registerPage);
page('/create', createPage);
page('/books/:id', detailsPage);
page('/edit/:id', editPage);
page('/myBooks', myBooksPage);
page('/search', searchPage);
updateNav();
page.start();



function decorateContext(ctx, next) {
    ctx.render = renderTemplate;
    ctx.updateNav = updateNav;

    next();
}

function renderTemplate(template) {
    render(template, main);
}

function updateNav () {
    const userData = getUserData();

    if(userData) {
        document.getElementById('user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onLogout () {
    logout();
    updateNav();
    page.redirect('/dashboard');
}

