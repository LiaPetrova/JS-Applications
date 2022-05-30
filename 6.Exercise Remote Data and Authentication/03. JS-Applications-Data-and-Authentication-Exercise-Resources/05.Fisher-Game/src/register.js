window.addEventListener('load', () => {
    const form = document.querySelector('form')
    form.addEventListener('submit', onRegister);
    document.getElementById('user').style.display = 'none';

});

async function onRegister(event) {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const rePass = formData.get('rePass').trim();
    const url = 'http://localhost:3030/users/register';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, rePass })
    };
    try {
        const res = await fetch(url, options);
        if (res.ok != true) {
            const error = res.json();
            throw new Error(error.message);
        }
        const data = await res.json();
        // window.location = 'index.html';
        console.log(data);
        const userData = {
            email: data.email,
            id: data._id,
            token: data.token
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        window.location = 'index.html';
    } catch (err) {
        alert(err.message);
    }
}