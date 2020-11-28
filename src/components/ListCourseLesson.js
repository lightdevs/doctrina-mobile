import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Text, View, Spinner} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import dateFormat from "dateformat";

const GET_COURSE_LESSONS = gql`
    query GetCourseLessons($id: String!){
        lessonsByCourse(courseId: $id){
            _id
            title
            type
            maxMark
            description
            dateStart
            dateEnd
        }
    }
`

export const ListCourseLesson = ({params, context, onPressLesson}) => {
    const { show } = context;

    const {loading, error, data} = useQuery(GET_COURSE_LESSONS, {
        variables: {
            id: params.id
        }
    })

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

    if(loading){
        return <Spinner/>
    }

    if(error){
        return (<Text>
            {params.id} {JSON.stringify(error)}
        </Text>)
    }

    return (
        <>
            {show.lesson && <View>
                {data && data.lessonsByCourse.map((lesson, index) =>
                    <TouchableOpacity
                        style={styles.containerLesson}
                        key={index}
                        onPress={() => onPressLesson({id: lesson._id})}
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
        </>
    )
}

const styles = StyleSheet.create({
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