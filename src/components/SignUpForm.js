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

const REGISTER = gql`
    mutation Register($email: String!, $name: String!, $surname: String!, $password: String!) {
        register(email: $email, name: $name, surname: $surname, password: $password, accountType: "student") {
            _id
            token
        }
    }
`

export const SignUpForm = () => {
    const { signIn } = useContext(AuthContext);

    const [register] = useMutation(REGISTER, {
        onCompleted: async (data) => {
            if(data.register){
                signIn({token: data.register.token, id: data.register._id})
                    .catch((e) => {
                        return e;
                    });
            }
        }
    });

    const initialFields = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const [fields, setFields] = useState(initialFields);

    return (
        <View style={styles.container}>
            <Form>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"first name"}
                        style={{height: 30}}
                        onChangeText={(value) => setFields({
                            ...fields,
                            firstName: value
                        })}
                    />
                </Item>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"last name"}
                        style={{height: 30}}
                        onChangeText={(value) => setFields({
                            ...fields,
                            lastName: value
                        })}
                    />
                </Item>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"e-mail"}
                        style={{height: 30}}
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
                        onChangeText={(value) => setFields({
                            ...fields,
                            password: value
                        })}
                    />
                </Item>
                <Item style={styles.input} rounded>
                    <Input
                        placeholder={"repeat password"}
                        style={{height: 30}}
                        secureTextEntry={true}
                        onChangeText={(value) => setFields({
                            ...fields,
                            repeatPassword: value
                        })}
                    />
                </Item>
            </Form>
            <View style={{marginTop: 20, alignItems: 'center'}}>
                <Button
                    style={{borderRadius: 10, backgroundColor: '#58c2d5', alignSelf: 'center'}}
                    onPress={() => {
                        const validName = /^[^0-9" \!\"#\$\%&'\(\)\*\+\,\-\./\:;\<\=\>\?@\[\\\]\^_`\{\|\}~"]+$/
                        const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
                        const validPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;

                        if(!(fields.firstName
                            &&
                            fields.lastName
                            &&
                            fields.email
                            &&
                            fields.password
                            &&
                            fields.repeatPassword
                        )) {
                            return Toast.show({
                                text: "Not all field fill",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }
                        else if(!validName.test(fields.firstName)) {
                            return Toast.show({
                                text: "The first name cannot contain numbers or special characters",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }
                        else if(!validName.test(fields.lastName)){
                            return Toast.show({
                                text: "The last name cannot contain numbers or special characters",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }
                        else if(!validEmail.test(fields.email)){
                            return Toast.show({
                                text: "Wrong email format entered",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }
                        else if(!validPassword.test(fields.password)){
                            return Toast.show({
                                text: "The password is too short, 8 or more characters needed\n" +
                                    "The password must contain a capital letter\n" +
                                    "The password must not contain non-Latin letters\n" +
                                    "The password must contain a number",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }
                        else if(fields.password !== fields.repeatPassword){
                            return Toast.show({
                                text: "You repeated the password incorrectly",
                                type: "error",
                                duration: 4000,
                                position: 'bottom'
                            });
                        }

                        register({
                            variables: {
                                name: fields.firstName,
                                surname: fields.lastName,
                                email: fields.email,
                                password: fields.password
                            }
                        })
                            .then(() => setFields(initialFields))
                            .catch();
                    }}
                >
                    <Text style={{fontWeight: 'bold'}}>
                        {"Sign up"}
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
});