import React, { useContext } from 'react';

import {
    Alert,
    Dimensions,
    ImageBackground,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {
    Text,
    View
} from "native-base";

import FlipCard from "react-native-flip-card";
import { Avatar } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/auth/authContext";
import { nameServer } from "../config";
import student from '../../assets/student.png';

const width = Dimensions.get('window').width;

export const ProfileShow = ({params, context}) => {
    const { flip, setFlip } = context;
    const { signOut } = useContext(AuthContext);

    const {name, surname, email, country, city, institution, description, photo} = params;

    const alerting = () => Alert.alert(
        "LOG OUT",
        "Are you want sign out?",
        [
            {
                text: 'OK',
                onPress: () => signOut(),

            },
            {
                text: 'CANCEL',
                style: 'cancel'
            }
        ],
        {
            cancelable: false
        }
    )

    const generateLink = (fileId) => {
        return `${nameServer}/download?id=${fileId}`
    }

    return (
        <>
            <FlipCard
                flipVertical={false}
                flipHorizontal={false}
                flip={flip}
                clickable={false}
            >
                <View style={[styles.viewPart, {marginTop: 10}]}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{marginRight: 10}}>
                            <Avatar
                                size={100}
                                rounded
                                onPress={() => setFlip(true)}
                                source={photo? {uri: generateLink(photo)}: student}
                                title={`${name[0]}${surname[0]}`}
                            />
                        </View>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{fontWeight: 'bold'}}>
                                {name} {surname}
                            </Text>
                            <Text style={{fontWeight: 'bold', fontSize: 13}}>
                                {"Student"}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    style={{marginBottom: 10}}
                    onPress={() => setFlip(false)}
                >
                    <ImageBackground
                        style={{height: width, justifyContent: 'space-between'}}
                        source={photo? {uri: generateLink(photo)}: student}
                    >
                        <LinearGradient
                            style={{height: 70, padding: 5, alignItems: 'flex-end'}}
                            locations={[0, 1.0]}
                            colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.00)']}
                        />
                        <LinearGradient
                            style={{height: 70, paddingLeft: 10, justifyContent: 'center'}}
                            locations={[0, 1.0]}
                            colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.25)']}
                        >
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                                {name} {surname}
                            </Text>
                            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
                                {"Student"}
                            </Text>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>
            </FlipCard>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Information:"}
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={{width: 70}}>
                        <Text>
                            {"E-mail:"}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {email}
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{width: 70}}>
                        <Text>
                            {"Country:"}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {country}
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{width: 70}}>
                        <Text>
                            {"City:"}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {city}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Education:"}
                    </Text>
                </View>
                <View style={styles.content}>
                    <View style={{width: 120}}>
                        <Text>
                            {"Educational institution:"}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text>
                            {institution}
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{width: 120}}>
                        <Text>
                            {"Course of institution:"}
                        </Text>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text>
                            {"SE"}
                        </Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={{width: 120}}>
                        <Text>
                            {"Group / Form:"}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {"18-7"}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"About me:"}
                    </Text>
                </View>
                <View>
                    <Text>
                        {description}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.viewPart, {alignItems: 'center', borderWidth: 0.5, borderColor: '#ffcccc'}]}
                onPress={() => alerting()}
            >
                <Text style={{fontWeight: 'bold', color: '#ff8080'}}>
                    {"LOG OUT"}
                </Text>
            </TouchableOpacity>
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
        flexDirection: 'row',
        marginVertical: 2
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
});