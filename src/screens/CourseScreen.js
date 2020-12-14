import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    View,
    Text,
    Spinner
} from 'native-base'
import { useFocusEffect } from "@react-navigation/native";
import {gql, useLazyQuery, useQuery} from "@apollo/client";
import { ListCourseLink } from "../components/ListCourseLink";
import { ListCourseMaterial } from "../components/ListCourseMaterial";
import { ListCourseLesson } from "../components/ListCourseLesson";
import TextTicker from "react-native-text-ticker";
import dateFormat from "dateformat";
import FlipCard from "react-native-flip-card";

export const GET_COURSE = gql`
    query GetCourse($id: String!) {
        courseById(id: $id, page: 0, count: 0) {
            course { 
                _id
                title
                teacher
                description
                dateEnd
                dateStart
            }
        }
    }
`

export const GET_TEACHER = gql`
    query GetTeacher($id: String!) {
        personById(id: $id, page: 0, count: 0){
            person {
                name
                surname
            }
        }
    }
`

export const CourseScreen = ({navigation, route}) => {
    const {loading: loadingC, data: dataC} = useQuery(GET_COURSE, {
        variables: {
            id: route.params.id
        },
        onCompleted(data){
            getTeacher({
                variables: {
                    id: dataC.courseById.course.teacher
                }
            })
        }
    });

    const [getTeacher, {loading: loadingT, data: dataT}] = useLazyQuery(GET_TEACHER, {
        fetchPolicy: "network-only"
    });

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


    const onPressLesson = (params) => {
        navigation.navigate("Lesson", {
            ...params,
            title: dataC.courseById.course.title,
            teacher: dataT.personById.person
        });
    }

    if(loadingC){
        return <Spinner/>
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
                        {dataC.courseById.course.title}
                    </TextTicker>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Identifier: "}
                        </Text>
                        <Text>
                            {dataC.courseById.course._id}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Teacher: "}
                        </Text>
                        <Text>
                            {loadingT? "" : dataT && `${dataT.personById.person.name} ${dataT.personById.person.surname}`}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Date: "}
                        </Text>
                        <Text>
                            <Text>
                                {
                                    dataC && (dateFormat(new Date(dataC.courseById.course.dateStart), "dd.mm.yyyy"))
                                }
                                {" - "}
                                {
                                    dataC && (dateFormat(new Date(dataC.courseById.course.dateEnd), "dd.mm.yyyy"))
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
                <ListCourseLink params={{id: route.params.id}} context={{show}}/>
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
                <ListCourseMaterial params={{id: route.params.id}} context={{show}}/>
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
                        {dataC.courseById.course.description}
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
                <ListCourseLesson params={{id: route.params.id}} context={{show}} onPressLesson={onPressLesson}/>
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
