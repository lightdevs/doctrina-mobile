import React, { useEffect, useContext } from 'react';

import {
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert
} from "react-native";
import {
    View,
    Text,
    Spinner,
    Form,
    Item,
    Input,
    Textarea
} from 'native-base';

import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from "apollo-upload-client";
import { AuthContext } from "../context/auth/authContext";
import { nameServer } from "../config";
import student from '../../assets/student.png';

export const ProfileEdit = ({params, context, updateAvatar, loadingUpdateAvatar, refetch}) => {
    const { auth } = useContext(AuthContext);

    const {fields, setFields} = context;

    const {
        name,
        surname,
        email,
        country,
        city,
        institution,
        description,
        photo
    } = params;

    useEffect(() => {
        setFields({
            name, surname, email, country, city, institution, description
        });
    }, [])

    const uploadFile = (uri) => {
        const file = new ReactNativeFile({
            uri: uri,
            type: 'image/jpeg',
            name: "Avatar.jpg"
        });
        updateAvatar({
            variables: {
                id: auth.id,
                file: file
            }
        })
            .then(() => refetch())
            .catch(e => alert(JSON.stringify(e)));
    }

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
            uploadFile(result.uri);
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

        if(!result.cancelled){
            uploadFile(result.uri);
        }
    }

    const alerting = () => Alert.alert(
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

    const generateLink = (fileId) => {
        return `${nameServer}/download?id=${fileId}`
    }

    return(
        <>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Avatar:"}
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    {loadingUpdateAvatar?
                        <Spinner/>
                    :
                        <TouchableOpacity
                            style={{width: 200}}
                            onPress={() => alerting()}
                        >
                            <Image
                                style={{height: 200, width: 200}}
                                resizeMode={"contain"}
                                source={photo ? {uri: generateLink(photo)}: student}
                            />
                        </TouchableOpacity>}
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