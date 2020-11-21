import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Text, View, Spinner} from "native-base";
import {Alert, Linking, TouchableOpacity} from "react-native";

const GET_COURSE_MATERIALS = gql`
    query GetCourseMaterials($id: String!){
        filesByCourse(courseId: $id){
            _id
            title
            description
        }
    }
`

export const ListCourseMaterial = ({params, context}) => {
    const { show } = context;

    const {loading, data} = useQuery(GET_COURSE_MATERIALS, {
        variables: {
            id: params.id
        }
    })

    const pressLink = async (link) => {
        const supported = await Linking.canOpenURL(link);

        if(supported){
            await Linking.openURL(link);
        } else {
            Alert.alert("Breaking url", "Sorry, but I can not open this url");
        }
    }

    const generateLink = (fileId) => {
        return `http://192.168.0.106:5000/download?id=${fileId}`
    }

    if(loading){
        return <Spinner/>
    }

    return (
        <>
            {show.material && <View>
                {data.filesByCourse.map((material, index) => (
                    <TouchableOpacity
                        style={{marginVertical: 5}}
                        key={index}
                        onPress={() => pressLink(generateLink(material._id))}
                    >
                        <View style={{flexDirection: "row"}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: "bold", fontSize: 13}}>{material.title}</Text>
                            </View>
                            <View style={{width: 150}}>
                                <Text style={{fontSize: 13, color: 'lightgray'}}>{material.description}</Text>
                            </View>
                            <View>
                                <Text style={{fontSize: 13}}>{material.mimeType}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>}
        </>
    )
}