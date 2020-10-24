import React from 'react';
import {
    StyleSheet
} from "react-native";

import {
    View,
    Text,
    Icon
} from 'native-base'

export const LessonItem = ({params}) => {
    const {
        id,
        type,
        topic,
        date,
        status
    } = params;

    const iconName = (status == "Passed")? "check": "clock";
    const colorStatus = (status == "Passed")? "red": (status == "Will pass")? "yellow": "green";

    return (
        <View style={styles.container}>
            <View style={styles.left} >
                <Text style={{fontSize:20}}>{id}</Text>
            </View>
            <View style={styles.center} >
                <View style={{alignItems: 'center'}}>
                    <Text>{type}</Text>
                    <Text style={{fontSize: 12}}>{topic}</Text>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'flex-end', flex: 1}}>
                    <Text>{date}</Text>
                </View>
            </View>
            <View style={[styles.right, {backgroundColor: colorStatus}]}>
                <Text style={{fontSize:13}}>10/100</Text>
                <Icon style={{fontSize:50}} type={"EvilIcons"} name={iconName}/>
                <Text style={{fontSize:13}}>{status}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    left: {
        width: 80,
        height: 100,
        backgroundColor: 'powderblue',
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        width: 150,
        height: 100,
        backgroundColor: '#D3D3D3',
        zIndex: -999
    },
    right: {
        width: 80,
        height: 100,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }
});