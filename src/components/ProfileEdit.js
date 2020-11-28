import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    View,
    Text,
    Form,
    Item,
    Input,
    Textarea
} from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from "apollo-upload-client";
import {gql} from "@apollo/client";

export const UPDATE_AVATAR = gql`
    mutation UpdateAvatar($id: String!, $file: Upload!){
        uploadProfilePic(personId: $id, file: $file)
    }
`

export const ProfileEdit = ({params, context}) => {
    const {fields, setFields} = context;

    const {
        name,
        surname,
        email,
        country,
        city,
        institution,
        description
    } = params;

    useEffect(() => {
        setFields({
            name, surname, email, country, city, institution, description
        });
    }, [])

    const pickImage = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if(!result.cancelled){

        }
    };

    const cameraImage = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    }

    const alert = () => Alert.alert(
        "Change photo",
        "Choose one of methods",
        [
            {
                text: "Gallery",
                onPress: () => pickImage()
            },
            {
                text: "Camera",
                onPress: () => cameraImage()
            }
        ],
        {
            cancelable: true
        }
    );

    return(
        <>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Avatar:"}
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{width: 200}}
                        onPress={() => alert()}
                    >
                        <Image
                            style={{height: 200, width: 200}}
                            resizeMode={"contain"}
                            source={{uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ad36332-03b9-4804-aad7-acc8455a1109/d48alga-49085c28-64dc-4c5b-834f-a014130bddd3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNGFkMzYzMzItMDNiOS00ODA0LWFhZDctYWNjODQ1NWExMTA5XC9kNDhhbGdhLTQ5MDg1YzI4LTY0ZGMtNGM1Yi04MzRmLWEwMTQxMzBiZGRkMy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.fgDrJScXYuMki_ee5-Qx8g554MMjdRZr1yvyqRlB5K8'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Information:"}
                    </Text>
                </View>
                <Form>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Name"}
                            value={fields.name}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    name: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Surname"}
                            value={fields.surname}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    surname: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"E-mail"}
                            value={fields.email}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    email: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Country"}
                            value={fields.country}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    country: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"City"}
                            value={fields.city}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    city: value
                            })}
                        />
                    </Item>
                </Form>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Education:"}
                    </Text>
                </View>
                <Form>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Educational institution"}
                            value={fields.institution}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    institution: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Course of institution"}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Group / Form"}
                        />
                    </Item>
                </Form>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"About me:"}
                    </Text>
                </View>
                <Form>
                    <Item style={[styles.content, {borderRadius: 10}]} rounded>
                        <Textarea
                            placeholder={"Description"}
                            value={fields.description}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    description: value
                            })}
                            rowSpan={5}
                        />
                    </Item>
                </Form>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    viewPart: {
        backgroundColor: '#fff',
        padding: 12,
        margin: 10,
        borderRadius: 5,
        marginTop: 0
    },
    content: {
        marginVertical: 2
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
});