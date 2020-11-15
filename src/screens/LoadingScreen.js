import React from 'react';
import {
    StyleSheet
} from 'react-native';
import {
    View,
    Text
} from 'native-base';

export const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: '#4d4d4d',
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                margin: 5,
                height: 75,
                width: 200,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontWeight: 'bold'}}>
                    <Text style={styles.setText('#fff', 45)}>
                        Doctr
                    </Text>
                    <Text style={styles.setText('#58c2d5', 45)}>
                        i
                    </Text>
                    <Text style={styles.setText('#fff', 45)}>
                        na
                    </Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECECEC',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
    setText: (color, size) => ({
        color: color,
        fontSize: size
    })
})