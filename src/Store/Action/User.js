export const updateSession = data=>({
    type: 'USER_UPDATE',
    value: data
});

export const updateUser = user=>updateSession({user});
export const updateToken = token=>updateSession({token});
export const logOut = ()=>updateSession({
    user: null,
    token: null,
    account: null,
    profile: null,
    error: null
});

export const setAccount = account=> updateSession({account});
export const setAccounts = accounts => updateSession({accounts});

export const logIn = data=>updateSession(data);