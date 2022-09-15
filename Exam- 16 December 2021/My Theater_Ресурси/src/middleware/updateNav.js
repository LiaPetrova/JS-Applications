import { render, html } from "../../node_modules/lit-html/lit-html.js";
import { getUserData } from "../util.js";

const header = document.querySelector('.my-header');



const navTemplate = (user) => html`
<nav>
<a href="/">Theater</a>
<ul>
    ${user
    ? html`<li><a href="/profile">Profile</a></li>
    <li><a href="/create">Create Event</a></li>
    <li><a href="/logout">Logout</a></li>`
    : html`<li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`};  
    </ul>
</nav>`;

export function addNav (ctx, next) {
    render(navTemplate(getUserData()), header);
    

    next();
}