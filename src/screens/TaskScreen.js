import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    View,
    Text,
    Icon,
    Form,
    Item,
    Input
} from 'native-base'
import FlipCard from "react-native-flip-card";
import TextTicker from "react-native-text-ticker";

export const TaskScreen = () => {
    const params = {
        links: [
            {
                name: "Zoom",
                ref: "https://zoom.com"
            },
            {
                name: "Google meet",
                ref: "https://google-meet.com"
            }
        ],
        comments: [
            {
                sender: "A. Chuprina",
                date: "06.11.2020 17:07",
                message: "Where is your SRS-document?"
            },
            {
                sender: "D. Panasenko",
                date: "07.11.2020 16:23",
                message: "In the report!"
            },
            {
                sender: "A. Chuprina",
                date: "07.11.2020 18:09",
                message: "The code works! The report is well written! The error is in the text, repeat the rules and add mokups to SRS-document."
            }
        ]
    }

    const {
        links,
        comments
    } = params;

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
                        {"Какая то лютая фигня просто для тестирования"}
                    </TextTicker>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 15}}>
                            <Text>
                                {"Task"}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>
                                {"#"}{"4"}
                            </Text>
                        </Text>
                        <Text>
                            {"Laboratory"}
                        </Text>
                    </View>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Identifier: "}
                        </Text>
                        <Text>
                            {"courseState._id"}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Teacher: "}
                        </Text>
                        <Text>
                            {"courseState.teacher"}
                        </Text>
                    </Text>
                    <Text>
                        <Text style={{fontWeight: "bold"}}>
                            {"Date: "}
                        </Text>
                        <Text>
                            {"()"} - {"()"}
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
                        {"Links:"}
                    </Text>
                    <Text style={{fontSize: 20, marginRight: 5}}>
                        {"+"}
                    </Text>
                </TouchableOpacity>
                <View>
                    {links.map((link, index) => (
                        <TouchableOpacity
                            style={{marginVertical: 5}}
                            key={index}
                        >
                            <View style={{ flexDirection: "row"}}>
                                <View style={{width: 100}}>
                                    <Text style={{fontWeight: "bold", fontSize: 13}}>
                                        {link.name}:
                                    </Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 13, color: 'lightgray'}}>
                                        {link.ref}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
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
                        {"courseState.description"}
                    </Text>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View>
                    <Text style={styles.title}>
                        {"Reply:"}
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text>
                            <Text>
                                {"Deadline: "}
                            </Text>
                            <Text>
                                {"OK"}
                            </Text>
                        </Text>
                        <Text>
                            <Text style={{color: "lightgreen"}}>
                                {"Passed: "}
                            </Text>
                            <Text>
                                {"OK"}
                            </Text>
                        </Text>
                    </View>
                    <View>
                        <Text>
                            <Text>
                                {"Grade: "}
                            </Text>
                            <Text style={{fontWeight: 'bold'}}>
                                {"60"}p
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.viewPart, {margin: 0, marginTop: 10, backgroundColor: "#F6F6F6"}]}>
                    <TouchableOpacity
                        style={{width: '100%', alignItems: 'flex-end'}}
                    >
                        <Icon type={"AntDesign"} name={"pluscircle"}/>
                    </TouchableOpacity>
                    <ScrollView
                        style={{height: 200}}
                        nestedScrollEnabled
                    >
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', }}>
                            <TouchableOpacity
                                style={{alignItems: 'center', height: 75, width: 60, margin: 5}}
                            >
                                <Icon type={"MaterialCommunityIcons"} name={"file-pdf"} style={{fontSize: 50}}/>
                                <TextTicker
                                    style={{fontSize: 15}}
                                    loop
                                    bounce={false}
                                    marqueeDelay={1000}
                                    scrollSpeed={250}
                                >
                                    {"file.pdf"}
                                </TextTicker>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{alignItems: 'center', height: 75, width: 60, margin: 5}}
                            >
                                <Icon type={"MaterialCommunityIcons"} name={"file-pdf"} style={{fontSize: 50}}/>
                                <TextTicker
                                    style={{fontSize: 15}}
                                    loop
                                    bounce={false}
                                    marqueeDelay={1000}
                                    scrollSpeed={250}
                                >
                                    {"file.pdf"}
                                </TextTicker>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{alignItems: 'center', height: 75, width: 60, margin: 5}}
                            >
                                <Icon type={"MaterialCommunityIcons"} name={"file-pdf"} style={{fontSize: 50}}/>
                                <TextTicker
                                    style={{fontSize: 15}}
                                    loop
                                    bounce={false}
                                    marqueeDelay={1000}
                                    scrollSpeed={250}
                                >
                                    {"file.pdf"}
                                </TextTicker>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{alignItems: 'center', height: 75, width: 60, margin: 5}}
                            >
                                <Icon type={"MaterialCommunityIcons"} name={"file-pdf"} style={{fontSize: 50}}/>
                                <TextTicker
                                    style={{fontSize: 15}}
                                    loop
                                    bounce={false}
                                    marqueeDelay={1000}
                                    scrollSpeed={250}
                                >
                                    {"file.pdf"}
                                </TextTicker>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View>
                    <Text style={styles.title}>
                        {"Comments:"}
                    </Text>
                </View>
                <Form style={{marginVertical: 10}}>
                    <Item style={{backgroundColor: '#ECECEC'}} rounded>
                        <Input
                            placeholder={"Add new comment..."}
                        />
                    </Item>
                </Form>
                <ScrollView
                    style={{height: 200}}
                    nestedScrollEnabled
                >
                    <View style={{}}>
                        {comments.map((comment, index) => <View key={index} style={[styles.comment ,{backgroundColor: (index % 2)? '#ECECEC': '#FFF'}]}>
                            <View style={{width: 100, justifyContent: 'center', alignItems: 'center'}}>
                                <Text>
                                    {comment.sender}
                                </Text>
                            </View>
                            <View style={{width: 100, justifyContent: 'center'}}>
                                <Text style={{textAlign: 'center', justifyContent: 'center'}}>
                                    {comment.date}
                                </Text>
                            </View>
                            <View style={{width: 125, justifyContent: 'center'}}>
                                <Text style={{wordWrap: 'break-word'}}>
                                    {comment.message}
                                </Text>
                            </View>
                        </View>)}
                    </View>
                </ScrollView>
            </View>
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
