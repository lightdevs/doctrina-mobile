import React, {useState, useContext} from 'react';

import {
    StyleSheet
} from 'react-native';
import {
    View,
    Text,
    Root,
    Button
} from 'native-base';

import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";

export const AuthScreen = () => {
    const [position, setPosition] = useState('signIn');

    return (
        <Root>
            <View style={styles.container}>
                <View style={{backgroundColor: '#4d4d4d', padding: 5, paddingHorizontal: 10, borderRadius: 10, margin: 5}}>
                    <Text style={{fontWeight: 'bold'}}>
                        <Text style={{color: 'white', fontSize: 40}}>
                            Doctr
                        </Text>
                        <Text style={{color: '#58c2d5', fontSize: 40}}>
                            i
                        </Text>
                        <Text style={{color: 'white', fontSize: 40}}>
                            na
                        </Text>
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <View style={{backgroundColor: '#ededed', borderRadius: 10, height: 40, flexDirection: 'row'}}>
                        <Button
                            style={(position == 'signIn')? styles.btnChoose: styles.btnNotChoose}
                            transparent={(position == 'signIn')? undefined: true}
                            onPress={()=>setPosition("signIn")}
                        >
                            <Text style={{color: 'black'}}>
                                {"Sign in"}
                            </Text>
                        </Button>
                        <Button
                            style={(position == 'signIn')? styles.btnNotChoose: styles.btnChoose}
                            transparent={(position == 'signIn')? true: undefined}
                            onPress={()=>setPosition("signUp")}
                        >
                            <Text style={{color: 'black'}}>
                                {"Sign up"}
                            </Text>
                        </Button>
                    </View>
                    {(position == 'signIn'? <SignInForm/>: <SignUpForm/>)}
                </View>
            </View>
        </Root>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    formContainer: {
        width: 300,
        backgroundColor: '#F6F6F6',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#80ffff',
        padding: 10
    },
    btnNotChoose: {
        width: 140,
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center'
    },
    btnChoose: {
        width: 140,
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});