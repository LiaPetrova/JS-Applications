const phonebookEl = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');


function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    loadContacts();
    document.getElementById('btnCreate').addEventListener('click', onCreate);
    phonebookEl.addEventListener('click', onDelete);
}

attachEvents();


async function onCreate() {
    const data = { person: personInput.value, phone: phoneInput.value };
    await createContact(data);
}

async function loadContacts() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url);
    const data = await res.json();
    phonebookEl.replaceChildren();
    Object.values(data).forEach(createLiElement);


}

function createLiElement(c) {
    const liEl = document.createElement('li');
    liEl.innerHTML = `${c.person}: ${c.phone}<button data-id="${c['_id']}">Delete</button>`;
    console.log(c);
    phonebookEl.appendChild(liEl);
}

async function createContact(data) {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    const res = await fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await res.json();
    createLiElement(result);
    return result;
}

async function onDelete(event) {
    console.log(event.target);
    if (event.target.tagName === 'BUTTON') {
        const id = event.target.getAttribute('data-id');
        event.target.parentElement.remove();
        deleteContact(id)
    };

}

async function deleteContact(id) {
    const url = 'http://localhost:3030/jsonstore/phonebook/' + id;
    const res = await fetch(url, {
        method: 'delete'
    });
    const data = await res.json();
    return data;

}