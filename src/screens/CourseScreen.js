import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    Toast
} from 'native-base'
import {CourseContext} from "../context/data/course/courseContext";

export const CourseScreen = () => {
    const { courseState } = useContext(CourseContext);

    // useEffect(() => {
    //     Toast.show({
    //         text: JSON.stringify(courseState),
    //         duration: 20000
    //     })
    // }, [courseState])

    const params = {
        links: [
            {
                name: "Zoom",
                ref: "https://zoom.com"
            },
            {
                name: "Google meet",
                ref: "https://google-meet.com"
            }
        ],
        lessons: [
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
        ],
        materials: [
            {
                title: "Title",
                name: "Lection №1",
                file: "l3.docx"
            },
            {
                title: "Title",
                name: "Lection №1",
                file: "l3.docx"
            },
            {
                title: "Title",
                name: "Lection №1",
                file: "l3.docx"
            },
            {
                title: "Title",
                name: "Lection №1",
                file: "l3.docx"
            }
        ]
    }

    const {
        links,
        lessons,
        materials
    } = params;

    const [showLink, setShowLink] = useState(true);
    const [showMaterial, setShowMaterial] = useState(true);
    const [showDesc, setShowDesc] = useState(true);
    const [showLesson, setShowLesson] = useState(true);

    return (
        <ScrollView style={{backgroundColor: '#ECECEC'}}>
            <View style={[styles.viewPart, { marginTop: 5, flexDirection: "row", justifyContent: 'space-between'}]} >
                <View style={{justifyContent: 'center'}}>
                    <Text style={{color: "lightblue", fontSize:40, fontWeight: "bold"}}>
                        {courseState.title}
                    </Text>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text style={{}}>
                        <Text style={{fontWeight: "bold", fontSize: 11}}>
                            {"Identifier: "}
                        </Text>
                        <Text style={{fontSize: 11}}>
                            {courseState._id}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold", fontSize: 11}}>
                            {"Teacher: "}
                        </Text>
                        <Text style={{fontSize: 11}}>
                            {courseState.teacher}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold", fontSize: 11}}>
                            {"Date: "}
                        </Text>
                        <Text style={{fontSize: 11}}>
                            {courseState.dateStart && (new Date(courseState.dateStart)).toString()} - {courseState.dateStart && (new Date(courseState.dateEnd)).toString()}
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShowLink(!showLink)}
                >
                    <Text style={styles.title}>
                        {"Links:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(showLink)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                { showLink && <View>
                    {links.map((link, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                        >
                            <View style={{ flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>{link.name}: </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>{link.ref}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>}
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShowMaterial(!showMaterial)}
                >
                    <Text style={styles.title}>
                        {"Materials:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(showMaterial)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {showMaterial && <View>
                    {materials.map((material, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                        >
                            <View style={{flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>{material.title}</Text>
                                </View>
                                <View style={{width: 150}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>{material.name}</Text>
                                </View>
                                <View>
                                    <Text style={{fontSize: 13}}>{material.file}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>}
            </View>
            <View style={styles.viewPart}>
                <TouchableOpacity
                    style={{justifyContent: "space-between", flexDirection: 'row'}}
                    onPress={() => setShowDesc(!showDesc)}
                >
                    <Text style={styles.title}>
                        {"Description:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(showDesc)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {showDesc && <View>
                    <Text>
                        {courseState.description}
                    </Text>
                </View>}
            </View>
            <View style={[styles.viewPart, {backgroundColor: "#F6F6F6"}]}>
                <TouchableOpacity
                    style={styles.titleLesson}
                    onPress={() => setShowLesson(!showLesson)}
                >
                    <Text style={styles.title}>
                        {"Lessons:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {(showLesson)? "-": "+"}
                    </Text>
                </TouchableOpacity>
                {showLesson && <View>
                    {lessons.map((lesson, index) =>
                        <View style={styles.containerLesson} key={index}>
                            <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.type}
                                </Text>
                            </View>
                            <View style={{width: "30%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.topic}
                                </Text>
                            </View>
                            <View style={{width: "20%", alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.textLesson}>
                                    {lesson.date}
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
                                    {lesson.status}
                                </Text>
                            </View>
                        </View>)}
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
        justifyContent: "center",
        height: 40
    },
    textLesson: {
        fontSize: 12,
        textAlign: "center"
    }
});