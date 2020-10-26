import { AsyncStorage } from 'react-native';

export const getCash = async (item) => {
    try{
        return JSON.parse(await AsyncStorage.getItem(item));
    }
    catch (e) {
        console.log(e.message);
    }
};

export const setCash = async (item, newValue) => {
    try{
        await AsyncStorage.setItem(item, JSON.stringify(newValue));
    }
    catch (e){
        console.log(e.message);
    }
};

export const removeCash = async (item) => {
    try{
        await AsyncStorage.removeItem(item);
    }
    catch (e) {
        console.log(e.message);
    }
};

