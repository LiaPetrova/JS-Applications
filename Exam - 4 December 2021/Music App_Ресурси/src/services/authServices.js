export const saveUser = (userData) => {
    if(userData.accessToken) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
    }
}

export const getUser = () => {
    const serializedUser = sessionStorage.getItem('userData');

    if(serializedUser) {
        return  JSON.parse(serializedUser);
    }
}

export const clearUser = () => {
    sessionStorage.removeItem('userData');
}

export const getToken = () => {
    return getUser()?.accessToken;
}