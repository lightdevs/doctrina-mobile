import React from 'react';
import {Text, View} from "native-base";
import {StyleSheet} from "react-native";

export const ListLessonTask = ({params}) => {
    const test = {
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



    const {
        tasks
    } = test;

    return (
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
