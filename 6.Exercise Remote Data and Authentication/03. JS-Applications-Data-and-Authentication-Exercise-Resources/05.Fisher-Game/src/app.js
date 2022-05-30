let userData = null;
const guestTemplate = document.getElementById('guest');
const userTemplate = document.getElementById('user');
const welcomeMessage = document.querySelector('.email span');
const updateBtn = document.querySelector('.updateBtn');
updateBtn.style.display = 'none';


window.addEventListener('DOMContentLoaded', () => {
    userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData != null) {
        guestTemplate.style.display = 'none';
        document.querySelector('#addForm .add').disabled = false;
        document.querySelector('.email span').textContent = userData.email;
    } else {
        userTemplate.style.display = 'none';
        document.querySelector('.email span').textContent = 'guest';
    }

    document.querySelector('.load').addEventListener('click', loadData);
    document.getElementById('addForm').addEventListener('submit', onCreateSubmit);
    document.getElementById('logout').addEventListener('click', onLogout);
    document.getElementById('catches').addEventListener('click', onTableClick);
    updateBtn.addEventListener('submit', updateCatch);
});

async function onTableClick(event) {
    const id = event.target.getAttribute('data-id');
    if (event.target.className == 'delete') {
        onDelete(id, event);
    } else if (event.target.className == 'update') {
        onEdit(id, event);
    }
}

async function onEdit(id) {
    const book = await getCatchById(id);
    document.querySelector('[name = "angler"]').value = book.angler;
    document.querySelector('[name = "weight"]').value = book.weight;
    document.querySelector('[name = "species"]').value = book.species;
    document.querySelector('[name = "location"]').value = book.location;
    document.querySelector('[name = "bait"]').value = book.bait;
    document.querySelector('[name = "captureTime"]').value = book.captureTime;
    updateBtn.style.display = 'block';
    document.querySelector('#addForm .add').style.display = 'none';
    

}

async function updateCatch(event) {
    const id = event.target.getAttribute('data-id');
    const formData = new FormData(event.target);
    console.log(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});

    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('All fields are required!');
        }
        const res = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        })
        const data = await res.json();
        console.log(data);

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        loadData();
    } catch (err) {
        alert(err.message);
    }

}

async function getCatchById(id) {
    const url = `http://localhost:3030/data/catches/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;

}
async function onDelete(id, event) {
    const url = `http://localhost:3030/data/catches/${id}`;
    const res = await fetch(url, {
        method: 'delete',
        headers: {
            'X-Authorization': userData.token
        }
    });
    event.target.parentElement.remove();
}

async function onLogout() {
    const url = 'http://localhost:3030/users/logout';
    console.log(userData.token);

    const res = await fetch(url, {
        method: 'get',
        headers: {
            'X-Authorization': userData.token
        }
    });
    sessionStorage.clear();
    window.location = 'index.html';
    userTemplate.style.display = 'none';

}


async function onCreateSubmit(event) {
    event.preventDefault();

    if (!userData) {
        window.location = '/login.html';
        return;
    }

    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});

    try {
        if (Object.values(data).some(x => x == '')) {
            throw new Error('All fields are required!');
        }
        const res = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.token
            },
            body: JSON.stringify(data)
        })

        if (res.ok != true) {
            const error = await res.json();
            throw new Error(error.message);
        }
        event.target.reset();
        loadData();
    } catch (err) {
        alert(err.message);
    }
}

async function loadData(event) {
    const res = await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    document.getElementById('catches').replaceChildren(...data.map(createPreview));

}

function createPreview(item) {
    const isOwner = userData && userData.id == item._ownerId;

    const element = document.createElement('div');
    element.className = 'catch';
    element.innerHTML = ` <label>Angler</label>
<input type="text" class="angler" value="${item.angler}" ${!isOwner? 'disabled' : ''}>
<label>Weight</label>
<input type="text" class="weight" value="${item.weight}" ${!isOwner? 'disabled' : ''}>
<label>Species</label>
<input type="text" class="species" value="${item.species}" ${!isOwner? 'disabled' : ''}>
<label>Location</label>
<input type="text" class="location" value="${item.location}" ${!isOwner? 'disabled' : ''}>
<label>Bait</label>
<input type="text" class="bait" value="${item.bait}" ${!isOwner? 'disabled' : ''}>
<label>Capture Time</label>
<input type="number" class="captureTime" value=${item.captureTime} ${!isOwner? 'disabled' : ''}>
<button class="update" data-id="${item._id}" ${!isOwner? 'disabled' : ''}>Update</button>
<button class="delete" data-id="${item._id}" ${!isOwner? 'disabled' : ''}>Delete</button>`
    return element;
}