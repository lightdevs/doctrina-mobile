import React, { useState, useCallback } from 'react';

import {
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Icon,
    Text
} from 'native-base';

import { useFocusEffect } from '@react-navigation/native'
import { ProfileShow } from "../components/ProfileShow";
import { ProfileEdit } from "../components/ProfileEdit";
import {gql, useMutation, useQuery} from "@apollo/client";
import { LoadingScreen } from "./LoadingScreen";

const PROFILE_QUERY = gql`
    query{
        me{
            _id
            email
            name
            surname
            country
            city
            institution
            description
            photo
        }
    }
`

const UPDATE_PROFILE = gql`
    mutation UpdatePerson (
        $id: ID!,
        $email: String,
        $name: String,
        $surname: String,
        $country: String,
        $city: String,
        $institution: String,
        $description: String
    )
    {
        updatePerson(
            id: $id, 
            email: $email, 
            name: $name, 
            surname: $surname,
            country: $country,
            city: $city,
            institution: $institution,
            description: $description
        )
        {
            _id
            email 
            name 
            surname
            country
            city
            institution
            description
        }
    }
`

const UPDATE_AVATAR = gql`
    mutation UpdateAvatar($id: String!, $file: Upload!){
        uploadProfilePic(personId: $id, file: $file)
    }
`

export const ProfileScreen = ({navigation}) => {
    const [edit, setEdit] = useState(false);
    const [flip, setFlip] = useState(false);
    const [fields, setFields] = useState({});

    const { loading: loadingQuery, error, data: dataQuery, refetch } = useQuery(PROFILE_QUERY);
    const [updateProfile, {loading: loadingUpdateProfile}] = useMutation(UPDATE_PROFILE, {
        ignoreResults: true
    });

    const [updateAvatar] = useMutation(UPDATE_AVATAR);

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
                        onPress={() => {
                            setEdit(false);
                            updateProfile({
                                variables: {
                                    ...fields,
                                    id: dataQuery.me._id
                                }
                            })
                                .then(() => {
                                setFields({
                                    ...dataQuery.me
                                });
                            })
                                .catch((e) => alert(e.message));
                        }}
                    >
                        <Icon type={'MaterialCommunityIcons'} name={'check-bold'} />
                    </TouchableOpacity>
                )
            });
        }
    }), [])

    error && alert(JSON.stringify(error));

    if(loadingQuery || loadingUpdateProfile){
        return <LoadingScreen/>;
    }

    if(!dataQuery){
        return <Text>{"No data"}</Text>
    }

    return (
        <ScrollView>
            {
                edit?
                    <ProfileEdit
                        params={dataQuery.me}
                        context={{fields, setFields}}
                        updateAvatar={updateAvatar}
                        refetch={refetch}
                    />
                :
                    <ProfileShow
                        params={dataQuery.me}
                        context={{flip, setFlip}}
                        updateAvatar={updateAvatar}
                    />
            }
        </ScrollView>
    )
}