import React from 'react';
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
import {gql, useMutation, useQuery} from "@apollo/client";
import {ListTaskAnswer} from "../components/ListTaskAnswer";

const GET_TASK = gql`
    query GetTask($id:String!){
        taskById(id:$id){
            _id,
            title,
            description,
            dateStart,
            dateEnd,
            maxMark
        }
    }
`

const ADD_ANSWER = gql`
    mutation AddAnswer($id:ID!, $title:String!){
        addAnswer(taskId:$id, title:$title){
            _id
        }
    }
`

export const TaskScreen = ({route}) => {
    const {loading: loadingQ, data: dataQ} = useQuery(GET_TASK, {
        variables: {
            id: route.params.id
        },
        pollInterval: 1000
    })

    const [addAnswer, {loading: loadingM}] = useMutation(ADD_ANSWER);

    const {id, teacher, title} = route.params;

    if(loadingQ){
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
                        {title}
                    </TextTicker>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 15}}>
                            {"Task"}
                        </Text>
                        <Text>
                            {dataQ.taskById.title}
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
                            {teacher}
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
                        {"Description:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <View>
                    <Text>
                        {dataQ.taskById.description}
                    </Text>
                </View>
            </View>
            <ListTaskAnswer idTask={id}/>
            {loadingM?
                <Spinner/>
            :
                <TouchableOpacity
                style={[styles.viewPart, {alignItems: "center"}]}
                onPress={() => addAnswer({variables: {id: id, title: "2222"}}).catch(e => alert(JSON.stringify(e)))}
            >
                <Text>Add answer</Text>
            </TouchableOpacity>}
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
    },
    comment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 30
    }
});
