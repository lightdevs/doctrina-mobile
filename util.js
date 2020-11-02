import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCash = async (item) => {
    try{
        return await AsyncStorage.getItem(item);
    }
    catch (e) {
        console.log(e.message);
    }
};

export const setCash = async (item, newValue) => {
    try{
        await AsyncStorage.setItem(item, newValue);
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

