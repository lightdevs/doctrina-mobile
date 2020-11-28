import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {
    Text,
    View,
    Spinner
} from "native-base";
import {
    Alert,
    Linking,
    TouchableOpacity
} from "react-native";

const GET_COURSE_LINKS = gql`
    query GetCourseLinks($id: String!){
        linksByCourse(id: $id){
            description
            link
        }
    }
`

export const ListCourseLink = ({params, context}) => {
    const { show } = context;

    const {loading, data} = useQuery(GET_COURSE_LINKS, {
        variables: {
            id: params.id
        }
    });

    const pressLink = async (link) => {
        const supported = await Linking.canOpenURL(link);

        if(supported){
            await Linking.openURL(link);
        } else {
            Alert.alert("Breaking url", "Sorry, but I can not open this url");
        }
    }

    if(loading){
        return <Spinner/>
    }

    return (
        <>
            { show.link && <View>
                {data && data.linksByCourse.map((link, index) => (
                    <TouchableOpacity
                        style={{marginVertical: 5}}
                        key={index}
                        onPress={() => pressLink(link.link)}
                    >
                        <View style={{ flexDirection: "row"}}>
                            <View style={{width: 100}}>
                                <Text style={{fontWeight: "bold", fontSize: 13}}>{link.description}: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 13, color: 'lightgray'}}>{link.link}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>}
        </>
    )
}