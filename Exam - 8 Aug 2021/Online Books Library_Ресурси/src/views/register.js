import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';
import { createSubmitHandler } from '../util.js';

const registerTemplate = (onSubmit) => html`<section id="register-page" class="register">
<form  @submit=${onSubmit} id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>`;


export async function registerPage (ctx) {
    ctx.render(registerTemplate(createSubmitHandler(ctx, onSubmit)));

    async function onSubmit(ctx, data, event) {
        if(data.password !== data['confirm-pass']) {
            return alert('Passwords don\'t match!');
        }

        if(Object.values(data).some(v=> v== '')) {
            return alert('There should be no empty fields!')
        }
        await register({email: data.email, password: data.password});
        event.target.reset();
        ctx.page.redirect('/dashboard');
    }
}