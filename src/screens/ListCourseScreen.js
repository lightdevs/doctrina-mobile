import React, { useCallback, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    StyleSheet
} from 'react-native';
import {
    View,
    Button,
    Text,
    Icon
} from 'native-base';
import { ListCourse } from "../components/ListCourse";
import {gql, useQuery} from "@apollo/client";
import {AuthContext} from "../context/auth/authContext";

const GET_ALL_COURSES = gql`
    query GetAllCourses($id: String!, $page: Int!){
        personById(id: $id, page: $page, count: 1){
            courses{
                course{
                    _id
                    title
                    maxMark
                }
            }
            isEnd
        }
    }
`

export const ListCourseScreen = ({navigation}) => {
    const { auth } = useContext(AuthContext);
    const [fetchLoading, setFetchLoading] = useState(false)

    const {loading, error, data, fetchMore} = useQuery(GET_ALL_COURSES, {
        variables: {
            id: auth.id,
            page: 0
        }
    });

    const onPressCourse = (id) => {
        navigation.navigate("Course", {id});
    }

    const getPage = () => {
        setFetchLoading(true);
        fetchMore({
            variables: {
                id: auth.id,
                page: 1
            }
        })
            .then(() => setFetchLoading(false));
    }

    useFocusEffect(useCallback(() => {
        navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            headerRight: null
        });
    }), []);

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
            <ListCourse
                loading={loading || fetchLoading}
                error={error}
                data={data}
                onPressCourse={onPressCourse}
                getPage={getPage}
            />
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
    }
});