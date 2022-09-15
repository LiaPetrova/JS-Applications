import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";


const registerTemplate = (onSubmit) => html`
<section id="registerPage">
<form @submit=${onSubmit} class="registerForm">
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
    </p>
</form>
</section>`;


export async function registerPage (ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, event) {
        if(data.password !== data.repeatPassword) {
            return alert('Passwords don\'t match!')
        }

        if (Object.values(data).some(v => v == '')) {
            return alert('All fields are required!');
        }
        await register(data.email, data.password);

        event.target.reset();
        ctx.page.redirect('/');
    }
}