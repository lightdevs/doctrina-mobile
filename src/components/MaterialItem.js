import React from 'react';
import {
    Icon,
    Text,
    View,
    Button
} from 'native-base';
import { StyleSheet } from "react-native";

export const MaterialItem = ({params}) => {
    const {
        name,
        extension
    } = params;

    return (
        <View style={styles.container}>
            <View style={styles.containerOne}>
                <Icon type={"FontAwesome"} name={"file"}/>
                <Text style={{fontSize: 12}}>{extension}</Text>
                <Text style={{textAlign: 'center', marginTop: 3, fontSize: 14}}>{name}</Text>
            </View>
            <View style={styles.containerTwo}>
                <Button style={[styles.btnMaterial, {backgroundColor: 'yellow', borderBottomLeftRadius: 20}]}>
                    <Icon style={{fontSize: 20}} type={"FontAwesome"} name={"play"}/>
                </Button>
                <Button style={[styles.btnMaterial, {backgroundColor: 'blue'}]}>
                    <Icon style={{fontSize: 20}} type={"FontAwesome"} name={"share-alt"}/>
                </Button>
                <Button style={[styles.btnMaterial, {backgroundColor: 'green', borderBottomRightRadius: 20}]}>
                    <Icon style={{fontSize: 20}} type={"FontAwesome"} name={"download"}/>
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        height: 200,
        width: '45%',
    },
    containerOne: {
        height: 120,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5
    },
    containerTwo: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 80,
        zIndex: -999,
        marginTop: -16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 0.5
    },
    btnMaterial: {
        width: '33.3%',
        height: '100%',
        justifyContent: 'center'
    }
});