import React, {useContext, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Form, Input, Item, Text, View, Spinner} from "native-base";
import {ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {AuthContext} from "../context/auth/authContext";
import dateFormat from "dateformat";

const GET_ANSWER_COMMENTS = gql`
    query GetAnswerComments($id:String!){
        commentsByAnswer(id: $id){
            text,
            person,
            timeAdded
        }
    }
`

const ADD_COMMENT = gql`
    mutation AddComment($id: String!, $text: String!){
        addComment(parentInstance: $id, text: $text){
            _id
        }
    }
`

export const ListAnswerComment = ({idAnswer}) => {
    const { auth } = useContext(AuthContext);

    const [field, setField] = useState("");

    const {loading: loadingQ, data: dataQ, refetch} = useQuery(GET_ANSWER_COMMENTS, {
        variables: {
            id: idAnswer
        },
        pollInterval: 500
    });

    const [addComment, {loading: loadingM}] = useMutation(ADD_COMMENT, {
        onCompleted: () => refetch()
    });

    return (
        <>
            <Form style={{marginVertical: 10}}>
                <Item style={{backgroundColor: '#ECECEC'}} rounded>
                    <Input
                        placeholder={"Add new comment..."}
                        value={field}
                        onChangeText={(value) => setField(value)}
                    />
                </Item>
            </Form>
            {!loadingM && <TouchableOpacity
                style={{alignItems: "center", backgroundColor: "lightblue", padding: 10, borderRadius: 20, marginTop: -5}}
                onPress={() => addComment({
                    variables: {
                        id: idAnswer,
                        text: field
                    }
                }).then(() => setField(""))}
            >
                <Text>Send</Text>
            </TouchableOpacity>}
        <ScrollView
            style={{height: 200}}
            nestedScrollEnabled
        >
            {loadingQ?
                <Spinner/>
            :
                <View>
                {dataQ.commentsByAnswer.map((comment, index) => <View
                    key={index}
                    style={[styles.comment ,{backgroundColor: (index % 2)? '#ECECEC': '#FFF'}]}
                >
                    <View style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>
                            {auth.id == comment.person? "I": "Teacher"}
                        </Text>
                    </View>
                    <View style={{width: 100, justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                            {dateFormat(new Date(comment.timeAdded), "dd.mm.yyyy HH:MM")}
                        </Text>
                    </View>
                    <View style={{width: 125, justifyContent: 'center'}}>
                        <Text>
                            {comment.text}
                        </Text>
                    </View>
                </View>)}
            </View>}
        </ScrollView></>)
}

const styles = StyleSheet.create({
    comment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        borderRadius: 30
    }
});