import React from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Linking, Alert} from "react-native";
import {Icon, View, Text} from "native-base";
import TextTicker from "react-native-text-ticker";
import {gql, useMutation, useQuery} from "@apollo/client";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import {nameServer} from "../config";

const GET_ANSWER_FILES = gql`
    query GetAnswerFiles($id:String!){
        filesOfAnswer(id: $id){
            _id,
            title
        }
    }
`

const UPLOAD_ANSWER_FILE = gql`
    mutation($file:Upload!, $id: String!){
        uploadAnswerMaterial(file: $file, answerId: $id)
    }
`

export const ListAnswerFile = ({idAnswer}) => {
    const {loading: loadingQ, error, data: dataQ, refetch} = useQuery(GET_ANSWER_FILES, {
        variables: {
            id: idAnswer
        }
    });

    const [uploadAnswerFile, {loading: loadingM}] = useMutation(UPLOAD_ANSWER_FILE, {
        onCompleted: () => {
            refetch()
        }
    });

    const chooseDocument = () => {
        DocumentPicker.getDocumentAsync().
            then(result => {
                if(result.type !== 'cancel'){
                    const file = new ReactNativeFile({
                        uri: result.uri,
                        name: result.name,
                        type: "image/png"
                    });
                    uploadAnswerFile({variables:{file, id: idAnswer}}).catch(e => alert(JSON.stringify(e)))
                }
        })
    }

    const pressLink = async (link) => {
        const supported = await Linking.canOpenURL(link);

        if(supported){
            await Linking.openURL(link);
        } else {
            Alert.alert("Breaking url", "Sorry, but I can not open this url");
        }
    }

    const generateLink = (fileId) => {
        return `${nameServer}/download?id=${fileId}`
    }

    if(error){
        return <Text>{JSON.stringify(error)}</Text>
    }

    return (
        <View style={[styles.viewPart, {margin: 0, marginTop: 10, backgroundColor: "#F6F6F6"}]}>
            {!loadingM && <TouchableOpacity
                style={{width: '100%', alignItems: 'flex-end'}}
                onPress={() => chooseDocument()}
            >
                <Icon type={"AntDesign"} name={"pluscircle"}/>
            </TouchableOpacity>}
            <ScrollView
                style={{height: 200}}
                nestedScrollEnabled
            >
                {!loadingQ && <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {dataQ.filesOfAnswer.map((file) => <TouchableOpacity
                        style={{alignItems: 'center', height: 75, width: 60, margin: 5}}
                        onPress={() => pressLink(generateLink(file._id))}
                        key={file._id}
                    >
                        <Icon type={"MaterialCommunityIcons"} name={"file"} style={{fontSize: 50}}/>
                        <TextTicker
                            style={{fontSize: 15}}
                            loop
                            bounce={false}
                            marqueeDelay={1000}
                            scrollSpeed={250}
                        >
                            {file.title}
                        </TextTicker>
                    </TouchableOpacity>)}
                </View>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPart: {
        backgroundColor: '#fff',
        padding: 12,
        margin: 10,
        borderRadius: 5,
        marginTop: 0
    }
});