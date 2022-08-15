
import { editTopic, getTopicById } from "../api/data.js";
import { input } from "../common/input.js";
import { html, until } from "../lib.js";
import { createSubmitHandler } from "../util.js";


const editTemplate = (topicPromise) => html`
<div class="drop main">
  <header><h1>Edit Topic</h1></header>
  ${ until(topicPromise, html`<p>Loading &hellip;</p>`)}`;


const formTemplate = (onSubmit, errorMsg, errors, values) => html`
  <form @submit=${onSubmit}>
  ${errorMsg ? html`<p class="error-msg" > ${errorMsg}</p>` : null}
  ${input("Topic Title", "text", "title", values.title, errors.title)}
  ${input("Content", "textarea", "content", values.content, errors.content)}
  <div class='center'>
    <input class="action" type="submit" value="Publish Topic" />
  </div>
  </form>
</div>`;

export function editPage(ctx) {
    const topicPromise = getTopicById(ctx.params.id);
  update(topicPromise);

  function update(topicPromise,errorMsg = '', errors = {}, values= {}) {
    ctx.render(editTemplate(loadItem(topicPromise, errorMsg, errors, values)));
  }

  async function loadItem(topicPromise, errorMsg, errors, values) {
      const topic = await topicPromise;
      values = topic;
      return formTemplate(createSubmitHandler(onSubmit, 'title', 'content'), errorMsg, 
      errors,
       values);
  }
  
  
  async function onSubmit(data) {
    try {
      const missing = Object.entries(data).filter(([k, v]) => v == "");
      if (missing.length > 0) {
        const errors = missing.reduce(
          (a, [k]) => Object.assign(a, { [k]: true }),
          {}
        );
        throw {
          error: new Error("All fields are required!"),
          errors
        };
      }

      const result = await editTopic(ctx.params.id, data);
      ctx.page.redirect('/topic/' + result._id);
    } catch (err) {
      const message = err.message || err.error.message;
      update(message, err.errors, data);
    }
    }
}


