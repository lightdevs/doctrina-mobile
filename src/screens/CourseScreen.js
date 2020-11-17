import React, { useState, useContext, useCallback } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert
} from 'react-native';
import {
    View,
    Text
} from 'native-base'
import { CourseContext } from "../context/data/course/courseContext";
import { useFocusEffect } from "@react-navigation/native";
import TextTicker from "react-native-text-ticker";
import FlipCard from "react-native-flip-card";
import dateFormat from 'dateformat';
import {QueryContext} from "../context/query/queryContext";

export const CourseScreen = ({navigation}) => {
    const { courseState } = useContext(CourseContext);
    const { getLesson } = useContext(QueryContext);

    const [show, setShow] = useState({
        link: true,
        material: true,
        desc: true,
        lesson: true
    });

    useFocusEffect(useCallback(() => {
        navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerRight: null
        });
    }), []);

    const onPressLesson = async (id, params) => {
        getLesson({variables: {id: id}})
        await navigation.navigate("Lesson", params);
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

    const status = (dateStart, dateEnd) => {
        if(Date.now() < dateStart){
            return "Upcoming";
        }
        else if (Date.now() > dateEnd){
            return "Completed";
        }
        else{
            return "Ongoing";
        }
    }

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
                        {courseState.title}
                    </TextTicker>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Identifier: "}
                        </Text>
                        <Text>
                            {courseState._id}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Teacher: "}
                        </Text>
                        <Text>
                            {courseState.infoTeacher}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Date: "}
                        </Text>
                        <Text>
                            <Text>
                                {
                                    courseState.dateStart && (dateFormat(new Date(courseState.dateStart), "dd.mm.yyyy"))
                                }
                                {" - "}
                                {
                                    courseState.dateEnd && (dateFormat(new Date(courseState.dateEnd), "dd.mm.yyyy"))
                                }
                            </Text>
                        </Text>
                    </Text>
                </View>
            </FlipCard>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShow({...show, link: !show.link})}
                >
                    <Text style={styles.title}>
                        {"Links:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(show.link)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                { show.link && <View>
                    {courseState.links.map((link, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                            onPress={() => pressLink(link.link)}
                        >
                            <View style={{ flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>{link.description}: </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>{link.link}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>}
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShow({...show, material: !show.material})}
                >
                    <Text style={styles.title}>
                        {"Materials:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(show.material)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {show.material && <View>
                    {courseState.materials.map((material, index) => (
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
                </View>}
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShow({...show, desc: !show.desc})}
                >
                    <Text style={styles.title}>
                        {"Description:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(show.desc)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {show.desc && <View>
                    <Text>
                        {courseState.description}
                    </Text>
                </View>}
            </View>
            <View style={[styles.viewPart, {backgroundColor: "#F6F6F6"}]}>
                <TouchableOpacity
                    style={styles.titleLesson}
                    onPress={() => setShow({...show, lesson: !show.lesson})}
                >
                    <Text style={styles.title}>
                        {"Lessons:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(show.lesson)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {show.lesson && <View>
                    {courseState.lessons.map((lesson, index) =>
                        <TouchableOpacity
                            style={styles.containerLesson}
                            key={index}
                            onPress={() => onPressLesson(lesson._id, {
                                title: courseState.title,
                                teacher: courseState.infoTeacher
                            })}
                        >
                            <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.type}
                                </Text>
                            </View>
                            <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.title}
                                </Text>
                            </View>
                            <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {dateFormat(new Date(lesson.dateStart), "dd.mm.yyyy HH:MM")}
                                </Text>
                            </View>
                            <View style={{width: "10%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.mark}
                                </Text>
                            </View>
                            <View style={{
                                width: "20%",
                                alignItems: "center",
                                backgroundColor: 'lightblue',
                                borderTopRightRadius: 10,
                                borderBottomRightRadius: 10,
                                justifyContent: "center"
                            }}>
                                <Text style={styles.textLesson}>
                                    {status(lesson.dateStart, lesson.dateEnd)}
                                </Text>
                            </View>
                        </TouchableOpacity>)}
                </View>}
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
        fontWeight: 'bold'
    },
    button: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleLesson: {
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 10,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    containerLesson: {
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 40
    },
    textLesson: {
        fontSize: 12,
        textAlign: 'center'
    }
});
