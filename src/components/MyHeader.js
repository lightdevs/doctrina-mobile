import React, {useEffect} from 'react';
import { StyleSheet } from 'react-native';
import {
    Body,
    Button,
    Header,
    Icon,
    Left,
    Title
} from 'native-base';

export const MyHeader = ({title, isSideBar}) => {
    return (
        <Header style={styles.header}>
            <Left>
                <Button transparent>
                    <Icon name={(isSideBar)? "menu": "arrow-back"}/>
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
        </Header>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#28282f'
    }
});