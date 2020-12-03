import React from 'react';
import {Text, View, Spinner} from "native-base";
import {StyleSheet, TouchableOpacity} from "react-native";
import {gql, useQuery} from "@apollo/client";

const GET_LESSON_TASKS = gql`
    query GetLessonTasks($id: String!){
        tasksByLesson(id: $id){
            task{
                _id,
                title,
                description,
                dateStart,
                dateEnd,
                maxMark
            }
            status
        }
    }
`

const setStatus = (status) => {
    if(status == -1){
        return "Not answered";
    }
    else if (status == 0){
        return "Not Graded";
    }
    else{
        return "Graded";
    }
}

export const ListLessonTask = ({params, onPressTask}) => {
    const {data, error, loading} = useQuery(GET_LESSON_TASKS, {
        variables: {
            id: params.id
        }
    })

    if(loading){
        return <Spinner/>
    }

    if(error){
        return <Text>{JSON.stringify(error)}</Text>
    }

    return (
        <View>
            {data.tasksByLesson.map(({task, status}) =>
                <TouchableOpacity
                    style={styles.containerLesson}
                    onPress={() => onPressTask({id: task._id})}
                    key={task._id}
                >
                    <View style={{width: 75, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.textLesson}>
                            {task.title}
                        </Text>
                    </View>
                    <View style={{width: 150, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.textLesson}>
                            {task.description}
                        </Text>
                    </View>
                    <View style={{width: 50, alignItems: "center", justifyContent: "center"}}>
                        <Text style={styles.textLesson}>
                            {task.maxMark}
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
                            {setStatus(status)}
                        </Text>
                    </View>
                </TouchableOpacity>)}
        </View>
    )
}

const styles = StyleSheet.create({
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
