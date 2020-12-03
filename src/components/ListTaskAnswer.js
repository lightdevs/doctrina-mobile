import React from "react";
import {Text, View, Spinner} from "native-base";
import {ListAnswerFile} from "./ListAnswerFile";
import {StyleSheet} from "react-native";
import {gql, useQuery} from "@apollo/client";
import {ListAnswerComment} from "./ListAnswerComment";

const GET_TASK_ANSWERS = gql`
    query GetTaskAnswers($id:String!){
        myAnswersByTask(id: $id){
            _id,
            mark,
            timeAdded
        }
    }
`

export const ListTaskAnswer = ({idTask}) => {
    const {loading, error, data} = useQuery(GET_TASK_ANSWERS, {
        variables: {
            id: idTask
        },
        pollInterval: 1000
    })

    error && alert(JSON.stringify(error));

    if(loading){
        return <Spinner/>
    }

    return (
        <>
            {data && data.myAnswersByTask.map((answer, index) => (<View key={answer._id}>
                <View style={styles.viewPart}>
                <Text style={styles.title}>
                    {"Answer#"}{index + 1}
                </Text>
            </View>
            <View style={styles.viewPart}>
                <View style={{flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <Text style={styles.title}>
                        {"Reply:"}
                    </Text>
                    <Text>
                        <Text>
                            {"Grade: "}
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>
                            {answer.mark ? `${answer.mark}p`: "???"}
                        </Text>
                    </Text>
                </View>
                <ListAnswerFile idAnswer={answer._id}/>
            </View>
            <View style={styles.viewPart}>
                <View>
                    <Text style={styles.title}>
                        {"Comments:"}
                    </Text>
                </View>
                <ListAnswerComment idAnswer={answer._id}/>
            </View>
                    </View>))}
        </>
    )
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