import React, { useContext, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {
    View,
    Button,
    Text,
    Icon
} from 'native-base';
import * as Progress from 'react-native-progress'
import {QueryContext} from "../context/query/queryContext";
import {ListCourseContext} from "../context/data/listCourse/listCourseContext";
import {getCash} from "../../util";
import {USER_ID} from "../../cashItems";

export const ListCourseScreen = ({navigation}) => {
    const { getAllCourses, getCourse } = useContext(QueryContext);
    const { listCourseState, clearList} = useContext(ListCourseContext);

    const getCourses = async () => {
        getAllCourses({variables: {id: await getCash(USER_ID), page: listCourseState.page}})
    }

    const onPressCourse = async (id) => {
        getCourse({variables: {id: id}});
        await navigation.navigate("Course");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.buttonHeader}>
                    <Text style={{fontWeight: "bold", paddingVertical: 3}}>
                        {"ALL COURSES"}
                    </Text>
                </View>
                <View>
                    <Button style={styles.buttonHeader}>
                        <Text style={styles.textHeader}>
                            {"SORT"}
                        </Text>
                    </Button>
                </View>
                <View>
                    <Button style={styles.buttonHeader}>
                        <View style={{padding: 10, flexDirection: 'row', alignItems: "center"}}>
                            <Text style={styles.textHeader}>
                                {"FILTER"}
                            </Text>
                            <Icon
                                style={{fontSize: 15, marginLeft: 5, color: "lightblue"}}
                                type={"AntDesign"}
                                name={"caretdown"}
                            />
                        </View>
                    </Button>
                </View>
            </View>
            <ScrollView>
                <View style={styles.containerCourses}>
                    {
                        listCourseState.courses.map(({
                                      _id,
                                      title,
                                      perCentStatus = 50,
                                      mark = 2,
                                      maxMark
                        }) =>
                            <TouchableOpacity
                                key={_id}
                                style={styles.course}
                                onPress={() => onPressCourse(_id)}
                            >
                                <View>
                                    <Text style={{fontWeight: "bold"}}>
                                        {title}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Progress.Bar
                                        progress={perCentStatus/100}
                                        style={{height: 20, marginRight: 5}}
                                        height={20}
                                    />
                                    <Text style={{color: 'lightgray'}}>
                                        {`${perCentStatus}%`}
                                    </Text>
                                </View>
                                <View>
                                    <Text>
                                        <Text style={{fontWeight: "bold"}}>
                                            {mark}
                                        </Text>
                                        <Text>
                                            {`/${maxMark  || "???"}`}
                                        </Text>
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
                {!listCourseState.end && <Button
                    style={{width: 200, borderRadius: 20, justifyContent: "center", alignSelf: "center"}}
                    onPress={() => getCourses()}
                >
                    <Text>
                        {"MORE..."}
                    </Text>
                </Button>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: '100%',
        backgroundColor: '#ECECEC'
    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    buttonHeader: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 20
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "bold",
        color: "lightblue"
    },
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