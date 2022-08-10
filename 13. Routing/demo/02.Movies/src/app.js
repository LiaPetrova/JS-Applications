import { page, render } from './lib.js';
import { catalogPage } from './views/catalog.js';



const root = document.querySelector('main');

page('/home',decorateContext ,catalogPage);
page.start();
 async function decorateContext (ctx, next) {
     console.log();
    ctx.render = (template) => render(template, root);
    console.log(ctx);
    next();
}