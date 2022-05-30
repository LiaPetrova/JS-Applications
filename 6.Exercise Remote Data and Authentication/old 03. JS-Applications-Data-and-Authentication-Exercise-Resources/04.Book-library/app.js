console.log('My requests...')
const tbody = document.querySelector('tbody');
document.getElementById('loadBooks').addEventListener('click', loadBooks);

loadBooks();
const createForm = document.getElementById('createForm');
createForm.addEventListener('submit', onCreate);
const editForm = document.getElementById('editForm');
editForm.addEventListener('submit', onEditSubmit);
tbody.addEventListener('click', onTableClick);

async function onEditSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const author = formData.get('author');
    const title = formData.get('title');
    const id = formData.get('id');
 
    const result = await updateBooks(id, { title, author });
    e.target.reset();
    createForm.style.display = 'block';
    editForm.style.display = 'none';
    loadBooks();

}

async function onTableClick(e) {
    const id = e.target.parentElement.dataset.id;
    if (e.target.className == 'delete') {
        await deleteBooks(id);
        e.target.parentElement.parentElement.remove();
    } else if (e.target.className == 'edit') {
        await onEdit(id)
    }
}
async function onEdit(id) {
    const book = await loadBookById(id);
    createForm.style.display = 'none';
    editForm.style.display = 'block';

    editForm.querySelector('[name="author"]').value = book.author;
    editForm.querySelector('[name="title"]').value = book.title;
    editForm.querySelector('[name="id"]').value = id;

}
async function loadBookById(id) {
    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    return book;
}

async function onCreate(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const author = formData.get('author');
    const title = formData.get('title');

    const result = await createBooks({ title, author });
    e.target.reset();
    tbody.appendChild(createRow(result._id, result));

}

async function createBooks(book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        body: JSON.stringify(book)
    });
    return result;
}
async function loadBooks() {
    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const result = Object.entries(books).map(([id, book]) => createRow(id, book));
    tbody.replaceChildren(...result);
}

function createRow(id, book) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td data-id=${id}>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </td>`;
    return row;

}
async function updateBooks(id, book) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        body: JSON.stringify(book)
    });
    return result;
}
async function deleteBooks(id) {
    const result = await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    return result;
}
async function request(url, options) {
    if (options && options.body != undefined) {
        Object.assign(options, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
    }
    const response = await fetch(url, options);
    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message)
    }

    const data = await response.json();
    return data;
}