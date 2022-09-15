export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export  function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function getAccessToken () {
    const userData = getUserData();
    return userData?.accessToken;
}

export function createSubmitHandler(ctx, callback) {
    return function (event) {
        event.preventDefault();
        const formData = Object.fromEntries(new FormData(event.target));

        callback(ctx, formData, event);
    }
}