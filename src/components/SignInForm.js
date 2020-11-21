import React, { useState, useContext } from 'react';
import {
    StyleSheet
} from "react-native";
import {
    Form,
    Item,
    View,
    Input,
    Button,
    Text,
    Toast
} from 'native-base';
import {gql, useMutation} from "@apollo/client";
import {AuthContext} from "../context/auth/authContext";

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            _id
            token
        }
    }
`

export const SignInForm = () => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })

    const { signIn } = useContext(AuthContext);

    const [login] = useMutation(LOGIN, {
        onCompleted: async (data) => {
            if(data.login){
                signIn({token: data.login.token, id: data.login._id});
            }
        }
    });

    return (
        <View style={styles.container}>
            <Form>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"e-mail"}
                        style={{height: 30}}
                        value={fields.email}
                        onChangeText={(value) => setFields({
                            ...fields,
                            email: value
                        })}
                    />
                </Item>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"password"}
                        style={{height: 30}}
                        secureTextEntry={true}
                        value={fields.password}
                        onChangeText={(value) => setFields({
                            ...fields,
                            password: value
                        })}
                    />
                </Item>
            </Form>
            <View>
                <Button style={{alignSelf: 'center', height: 20, marginTop: 5}} transparent>
                    <Text
                        style={{fontSize: 10, color: '#000'}}
                        onPress={() => {

                        }}
                    >
                        {"forget your password?"}
                    </Text>
                </Button>
            </View>
            <View style={{marginTop: 20, alignItems: 'center'}}>
                <Button
                    style={{borderRadius: 10, backgroundColor: '#58c2d5', alignSelf: 'center'}}
                    onPress={() => {
                        login({
                            variables: {
                                email: fields.email,
                                password: fields.password
                            }
                        })
                            .catch((e) => {
                                return Toast.show({
                                    text: e.message
                                })
                            });
                    }}
                >
                    <Text style={{fontWeight: 'bold'}}>
                        {"Sign in"}
                    </Text>
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 5,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#ededed',
        borderRadius: 10,
        marginVertical: 5
    }
})