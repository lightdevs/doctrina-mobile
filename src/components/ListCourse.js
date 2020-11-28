import React from 'react';
import {
    Button,
    Text,
    View,
    Spinner
} from "native-base";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import TextTicker from "react-native-text-ticker";
import * as Progress from "react-native-progress";

export const ListCourse = ({loading, error, data, onPressCourse, getPage}) => {
    if(error){
        return <Text>{JSON.stringify(error)}</Text>
    }

    return (
        <ScrollView>
            <View style={styles.containerCourses}>
                {
                    data && data.personById.courses.map(({course}) =>
                        <TouchableOpacity
                            key={course._id}
                            style={styles.course}
                            onPress={() => onPressCourse(course._id)}
                        >
                            <View style={{width: 50}}>
                                <TextTicker
                                    style={{fontWeight: "bold"}}
                                    loop
                                    bounce={false}
                                    marqueeDelay={1000}
                                    scrollSpeed={250}
                                >
                                    {course.title}
                                </TextTicker>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Progress.Bar
                                    progress={40/100}
                                    style={{height: 20, marginRight: 5}}
                                    height={20}
                                />
                                <Text style={{color: 'lightgray'}}>
                                    {`${40}%`}
                                </Text>
                            </View>
                            <View style={{width: 50}}>
                                <Text style={{textAlign: "right"}}>
                                    <Text style={{fontWeight: "bold"}}>
                                        {course.mark}
                                    </Text>
                                    <Text>
                                        {`/${course.maxMark  || "???"}`}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            </View>
            {
                loading?
                    <Spinner/>
                : data && !data.personById.isEnd &&
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity
                            style={{width: 150, height: 50, borderRadius: 20, justifyContent: "center", backgroundColor: "blue", alignItems: "center"}}
                            onPress={() => getPage()}
                        >
                            <Text style={{color: "white", fontWeight: "bold"}}>
                                {"MORE..."}
                            </Text>
                        </TouchableOpacity>
                    </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerCourses: {
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginBottom: 10
    },
    course: {
        margin: 5,
        flexDirection: 'row',
        backgroundColor: "#fff",
        height: 50,
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }
});