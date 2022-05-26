window.addEventListener('load', async() => {

    const form = document.querySelector('form');
    form.addEventListener('submit', onRegister)
});

async function onRegister(event) {
    event.preventDefault();
    const url = 'http://localhost:3030/users/register';

    const form = document.querySelector('form');
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repeat = formData.get('rePass').trim();
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, repeat })
        });

        if (res.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const token = data.accessToken;
        sessionStorage.setItem('token', token);

        window.location = '/index.html';

    } catch (err) {
        alert(err.message)
    }



}