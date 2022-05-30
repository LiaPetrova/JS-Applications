function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    loadMessages();
    document.getElementById('submit').addEventListener('click', onSubmit)
}

attachEvents();

const list = document.getElementById('messages');
const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');


async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const res = await fetch(url);
    const data = await res.json();

    const result = Object.values(data).map(m => `${m.author}: ${m.content}`).join('\n');
    list.value = result;

}

async function onSubmit() {
    const author = authorInput.value;
    const content = contentInput.value;
    const message = { author, content };
    await createMessage(message);
    contentInput.value = '';
    list.value += '\n' + `${author}: ${ content}`;
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const options = {
        method: 'post',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
}