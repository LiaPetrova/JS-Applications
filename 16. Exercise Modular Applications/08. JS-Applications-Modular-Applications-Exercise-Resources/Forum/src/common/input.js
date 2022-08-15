import { classMap, html } from "../lib.js";

export const input = (label, type, name, value = '', hasError) => html`
<label class=${classMap({error: hasError})}>
    <span>${label}</span>
        ${ type != 'textarea' 
        ? html`<input type=${type} name=${name} .value=${value}>`
        : html`<textarea name=${name} .value=${value}></textarea>`}
</label> `;