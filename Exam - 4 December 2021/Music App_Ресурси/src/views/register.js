import { html } from '../../node_modules/lit-html/lit-html.js';

import * as authServices from '../services/userServices.js';

const registerTemplate = (submitHandler) => html`
 <section id="registerPage">
            <form @submit=${submitHandler}>
                <fieldset>
                    <legend>Register</legend>

                    <label for="email" class="vhide">Email</label>
                    <input id="email" class="email" name="email" type="text" placeholder="Email">

                    <label for="password" class="vhide">Password</label>
                    <input id="password" class="password" name="password" type="password" placeholder="Password">

                    <label for="conf-pass" class="vhide">Confirm Password:</label>
                    <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                    <button type="submit" class="register">Register</button>

                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>`;

export const registerView = (ctx) => {

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {email, password, ['conf-pass']: repass} = Object.fromEntries(formData);
        

        if(repass != password) {
            alert('Passwords should match!');

            return;
        }

        if([email, password,repass].some(v=> v== '')) {
            alert('There should be no empty fields!');
            return;
        }

        authServices.register(email, password)
        .then((res) => {
            if(res.ok!= true) {
                alert(res.message);
                return;
            }
            ctx.page.redirect('/');
        })
        .catch(err => {
            alert(err);
        })
    }

ctx.render(registerTemplate(submitHandler));
};