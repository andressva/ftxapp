export const authSesion = (): string => {
    const userKey = window.localStorage.getItem('sesion_user')
    const user = userKey ? JSON.parse(userKey) : '';
    if (user) {
        return user.token;
    } 
    return user
}

export const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json'
}