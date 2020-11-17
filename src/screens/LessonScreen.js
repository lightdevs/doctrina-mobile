import React, { useState, useContext, useCallback } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity, Linking, Alert
} from 'react-native';
import {
    View,
    Text
} from 'native-base'
import FlipCard from "react-native-flip-card";
import TextTicker from "react-native-text-ticker";
import {LessonContext} from "../context/data/lesson/lessonContext";
import {useFocusEffect} from "@react-navigation/native";
import dateFormat from 'dateformat';

export const LessonScreen = ({navigation, route}) => {
    const { lessonState } = useContext(LessonContext);

    const {title, teacher} = route.params;

    useFocusEffect(useCallback(() => {
        navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerRight: null
        });
    }), []);

    const params = {
        tasks: [
            {
                type: "Laboratory",
                topic: "SRS-document",
                mark: 10,
                date: "01.09.2020 7:45",
                status: "Passed"
            },
            {
                type: "Practical",
                topic: "Mockups",
                mark: 10,
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                type: "Practical",
                topic: "Mockups",
                mark: 10,
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                type: "Practical",
                topic: "Mockups",
                mark: 10,
                date: "12.09.2020 9:30",
                status: "Passes"
            },
            {
                type: "Practical",
                topic: "Mockups",
                mark: 10,
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                type: "Practical",
                topic: "Mockups",
                mark: 10,
                date: "12.09.2020 9:30",
                status: "Will pass"
            }
        ]
    }

    const pressLink = async (link) => {
        const supported = await Linking.canOpenURL(link);

        if(supported){
            await Linking.openURL(link);
        } else {
            Alert.alert("Breaking url", "Sorry, but I can not open this url");
        }
    }

    const generateLink = (fileId) => {
        return `http://192.168.0.106:5000/download?id=${fileId}`
    }

    const {
        tasks
    } = params;

    return (
        <ScrollView style={{backgroundColor: '#ECECEC'}}>
            <FlipCard
                style={[styles.viewPart, { marginTop: 10, justifyContent: 'center', height: 100}]}
                flipHorizontal={false}
                flipVertical={true}
                friction={6}
            >
                <View style={{justifyContent: 'center'}}>
                    <TextTicker
                        style={{color: "lightblue", fontSize:40, fontWeight: "bold"}}
                        loop
                        bounce={false}
                        marqueeDelay={1000}
                        scrollSpeed={250}
                    >
                        {title}
                    </TextTicker>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 15}}>
                            <Text>
                                {"Lesson"}
                            </Text>
                        </Text>
                        <Text>
                            {lessonState.type}
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Identifier: "}
                        </Text>
                        <Text>
                            {lessonState._id}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Teacher: "}
                        </Text>
                        <Text>
                            {teacher}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Date: "}
                        </Text>
                        <Text>
                            {
                                lessonState.dateStart && (dateFormat(new Date(lessonState.dateStart), "dd.mm.yyyy"))
                            }
                            {" - "}
                            {
                                lessonState.dateEnd && (dateFormat(new Date(lessonState.dateEnd), "dd.mm.yyyy"))
                            }
                        </Text>
                    </Text>
                </View>
            </FlipCard>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={null}
                >
                    <Text style={styles.title}>
                        {"Materials:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <View>
                    {lessonState.materials.map((material, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                            onPress={() => pressLink(generateLink(material._id))}
                        >
                            <View style={{flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>{material.title}</Text>
                                </View>
                                <View style={{width: 150}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>{material.description}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 13}}>{material.mimeType}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={null}
                >
                    <Text style={styles.title}>
                        {"Links:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <View>
                    {lessonState.links.map((link, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                            onPress={() => pressLink(link.link)}
                        >
                            <View style={{ flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>
                                        {link.description}:
                                    </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>
                                        {link.link}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={null}
                >
                    <Text style={styles.title}>
                        {"Description:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        {lessonState.description}
                    </Text>
                </View>
            </View>
            <View style={[styles.viewPart, {backgroundColor: "#F6F6F6"}]}>
                <TouchableOpacity
                    style={styles.titleLesson}
                    onPress={null}
                >
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.title}>
                            {"Tasks:"}
                        </Text>
                        <View style={{justifyContent: 'flex-end', marginLeft: 5, marginBottom: 3}}>
                            <Text style={{fontSize: 12}}>
                                {"(max "}{"10"}{" points)"}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, marginRight: 5}}>
                            {"+"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View>
                    {tasks.map((task, index) =>
                        <View style={styles.containerLesson} key={index}>
                            <View style={{width: 75, alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {task.type}
                                </Text>
                            </View>
                            <View style={{width: 150, alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {task.topic}
                                </Text>
                            </View>
                            <View style={{width: 50, alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {task.mark}
                                </Text>
                            </View>
                            <View style={{
                                width: 60,
                                alignItems: "center",
                                backgroundColor: 'lightblue',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: "center"
                            }}>
                                <Text style={styles.textLesson}>
                                    {task.status}
                                </Text>
                            </View>
                        </View>)}
                </View>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    viewPart: {
        backgroundColor: '#fff',
        padding: 12,
        margin: 10,
        borderRadius: 5,
        marginTop: 0
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        width: "100%",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLesson: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: 'row'
    },
    containerLesson: {
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 40
    },
    textLesson: {
        fontSize: 12,
        textAlign: "center"
    }
});
