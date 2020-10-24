import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';

export const getToken = () => {
    return AsyncStorage.getItem(AUTH_TOKEN);
};

export const setToken = (newToken) => {
    return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const removeToken = () => {
    return AsyncStorage.removeItem(AUTH_TOKEN);
};