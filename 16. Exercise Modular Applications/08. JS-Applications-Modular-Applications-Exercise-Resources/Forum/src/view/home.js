import { getTopicCount } from '../api/data.js';
import { html, until } from '../lib.js';

const homeTemplate = (topicPromise) => html`
<h1>IT Ladies Forum</h1>
<div class="splash drop">
    <p>Welcome to IT Ladies Forum!</p>
    <div>
        <a class="action" href="/topics">Browse ${until(topicPromise, 'topics')}!</a>
    </div>
</div>`;

export function homePage (ctx){
ctx.render(homeTemplate(loadHome()));
}

async function loadHome() {
    const count = await getTopicCount();

    return `${count} topics`;
}