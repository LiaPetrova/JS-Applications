import page from '../node_modules/page/page.mjs';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderContentMiddleware, renderNavigationMiddleware } from './middlewares/renderMiddleware.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';
import { searchPage } from './views/search.js';

page(authMiddleware);
page(renderNavigationMiddleware);
page(renderContentMiddleware);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/catalog', catalogView);
page('/create', createView);
page('/albums/:id', detailsPage);
page('/albums/edit/:id', editPage);
page('/search', searchPage);

page.start();

