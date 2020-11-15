import React, { useState, useCallback, useContext } from 'react';

import {
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Icon
} from 'native-base';

import { useFocusEffect } from '@react-navigation/native'
import { ProfileContext } from "../context/data/profile/profileContext";
import { ProfileShow } from "../components/ProfileShow";
import { ProfileEdit } from "../components/ProfileEdit";

export const ProfileScreen = ({navigation}) => {
    const { flip, edit, setEdit } = useContext(ProfileContext);

    useFocusEffect(useCallback(() => {
        if(!edit){
            navigation.dangerouslyGetParent().setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={{marginRight: 15}}
                        onPress={() => setEdit(true)}
                    >
                        <Icon type={'MaterialCommunityIcons'} name={'pencil-outline'} />
                    </TouchableOpacity>
                )
            });
        }
        else{
            navigation.dangerouslyGetParent().setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        style={{marginRight: 15}}
                        onPress={() => setEdit(false)}
                    >
                        <Icon type={'MaterialCommunityIcons'} name={'check-bold'} />
                    </TouchableOpacity>
                )
            });
        }
    }), [])

    return (
        <ScrollView>
            {
                edit?
                    <ProfileEdit/>
                :
                    <ProfileShow/>
            }
        </ScrollView>
    )
}