import React, {useCallback, useContext} from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    View,
    Text,
    Spinner
} from 'native-base'
import FlipCard from "react-native-flip-card";
import TextTicker from "react-native-text-ticker";
import {useFocusEffect} from "@react-navigation/native";
import dateFormat from 'dateformat';
import {gql, useQuery} from "@apollo/client";

import { ListLessonLink } from "../components/ListLessonLink";
import { ListLessonMaterial } from "../components/ListLessonMaterial";
import { ListLessonTask } from "../components/ListLessonTask";
import {AuthContext} from "../context/auth/authContext";

export const GET_LESSON = gql`
    query GetLesson($id: String!){
        lessonById(id: $id){
            _id,
            type,
            description,
            dateStart,
            dateEnd,
            maxMark,
            title,
            visitors
        }
    }
`


export const LessonScreen = ({navigation, route}) => {
    const {auth} = useContext(AuthContext)

    const {loading, error, data} = useQuery(GET_LESSON, {
        variables: {
            id: route.params.id
        }
    });

    const {id, title, teacher} = route.params;

    useFocusEffect(useCallback(() => {
        navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerRight: null
        });
    }), []);

    const onPressTask = (params) => {
        navigation.navigate("Task", {
            ...params,
            title: title,
            teacher: teacher
        });
    }



    if(loading){
        return <Spinner/>
    }

    if(error){
        return <Text>{JSON.stringify(error)}</Text>
    }

    const statusVisit = () => {
        if(data.lessonById.visitors.indexOf(auth.id) === -1) {
            if(Date.now() > data.lessonById.dateStart && Date.now() < data.lessonById.dateEnd){
                return 0
            }
            else{
                return -1
            }
        }
        else{
            return 1
        }
    }

    const displayVisit = () => {
        switch (statusVisit()){
            case -1:
                return "Not visited";
            case 0:
                return "Mark visit";
            case 1:
                return "Visited"
        }
    }

    const colorBtnVisit = () => {
        switch (statusVisit()){
            case -1:
                return "orange";
            case 0:
                return "lightyellow";
            case 1:
                return "lightgreen"
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
                        {title}
                    </TextTicker>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 15}}>
                            <Text>
                                {"Lesson"}
                            </Text>
                        </Text>
                        <Text>
                            {data.lessonById.type}
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Identifier: "}
                        </Text>
                        <Text>
                            {id}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Teacher: "}
                        </Text>
                        <Text>
                            {teacher.name} {teacher.surname}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Date: "}
                        </Text>
                        <Text>
                            {
                                data && (dateFormat(new Date(data.lessonById.dateStart), "dd.mm.yyyy"))
                            }
                            {" - "}
                            {
                                data && (dateFormat(new Date(data.lessonById.dateEnd), "dd.mm.yyyy"))
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
                        {"Links:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <ListLessonLink params={{id}}/>
            </View>
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
                <ListLessonMaterial params={{id}}/>
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
                        {data.lessonById.description}
                    </Text>
                </View>
            </View>
            <View style={[styles.viewPart, {backgroundColor: "#F6F6F6"}]}>
                <TouchableOpacity
                    style={styles.titleLesson}
                    onPress={null}
                >
                    <View>
                        <Text style={styles.title}>
                            {"Tasks:"}
                        </Text>
                    </View>
                    <View>
                        <Text style={{fontSize: 20, marginRight: 5}}>
                            {"+"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <ListLessonTask params={{id}} onPressTask={onPressTask}/>
            </View>
            <TouchableOpacity
                style={[styles.viewPart, {alignItems: "center", padding: 10, backgroundColor: colorBtnVisit()}]}
                onPress={statusVisit() == 0? (() => {}): (() => {})}
            >
                <Text>{displayVisit()}</Text>
            </TouchableOpacity>
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
