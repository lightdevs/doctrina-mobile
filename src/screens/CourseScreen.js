import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
    View,
    Text,
    Button,
    Icon
} from 'native-base'
import { MyHeader } from '../components/MyHeader';
import { LessonItem } from '../components/LessonItem'
import { MaterialItem } from '../components/MaterialItem';

export const CourseScreen = () => {
    const params = {
        name: "AofSR",
        id: "avpz-knure-pzpi-18-7",
        mark: 73,
        maxMark: 100,
        teacher: "Chuprina Anastasia",
        dateStart: "01.09.2020",
        dateEnd: "01.01.2021",
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
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        lessons: [
            {
                id: 1,
                type: "Laboratory",
                topic: "SRS-document",
                date: "01.09.2020 7:45",
                status: "Passed"
            },
            {
                id: 2,
                type: "Practical",
                topic: "Mockups",
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                id: 3,
                type: "Practical",
                topic: "Mockups",
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                id: 4,
                type: "Practical",
                topic: "Mockups",
                date: "12.09.2020 9:30",
                status: "Passes"
            },
            {
                id: 5,
                type: "Practical",
                topic: "Mockups",
                date: "12.09.2020 9:30",
                status: "Will pass"
            },
            {
                id: 6,
                type: "Practical",
                topic: "Mockups",
                date: "12.09.2020 9:30",
                status: "Will pass"
            }
        ],
        materials: [
            {
                name: "Lection №1",
                extension: ".docx"
            },
            {
                name: "Lection №1",
                extension: ".docx"
            },
            {
                name: "Lection №1",
                extension: ".docx"
            },
            {
                name: "Lection №1",
                extension: ".docx"
            },
            {
                name: "Lection №1",
                extension: ".docx"
            },
        ]
    }

    const {
        name,
        id,
        mark,
        maxMark,
        teacher,
        dateStart,
        dateEnd,
        links,
        description,
        lessons,
        materials
    } = params;

    const tableHeaders = [
        "Type",
        "Topic",
        "Time",
        "Grade"
    ];

    const widthCells = [
        50,
        100,
        100,
        50
    ];

    const [btnDesc, setBtnDesc] = useState(false);
    const [displayAll, setDisplayAll] = useState(false);

    const nameBtnDisplay = (displayAll)? 'Current': 'All';

    const btnFullDesc = () => {
        if (description.length >= 90){
            return (
                <Button onPress={() => {
                    setBtnDesc(!btnDesc);
                }} style={styles.button} transparent>
                    <Icon type={"AntDesign"} name={(btnDesc)?"caretup": "caretdown"}/>
                </Button>
            )
        }
    }

    const btnDisplayLesson = () => {
        if(lessons.length > 1){
            return (
                <Button
                    onPress={() => setDisplayAll(!displayAll)}
                    style={styles.button}
                    transparent
                >
                    <Text>{nameBtnDisplay}</Text>
                </Button>
            )
        }
    }

    const displayLesson = () => {
        if(displayAll){
            return (
                <View style={{height: 330}}>
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        alwaysBounceVertical={false}
                    >
                        {
                            lessons.map((lesson) => (<LessonItem key={lesson.id} params={lesson}/>))
                        }
                    </ScrollView>
                </View>
            )
        }
        else{
            const currentLesson = lessons.filter(lesson => lesson.status === "Passes")
            return (
                <LessonItem params={currentLesson[0]}/>
            )
        }
    }

    return (
        <ScrollView style={{backgroundColor: '#b3ffff'}}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
                <View>
                    <View style={[styles.viewPart]} >
                        <Text>
                            <Text style={{fontWeight:"bold", fontSize:25}}>Course: </Text>
                            <Text style={{color: "blue", fontSize:25}}>{name}</Text>
                        </Text>
                        <Text>
                            <Text style={{fontWeight:"bold"}}>Identifier: </Text>
                            <Text>{id}</Text>
                        </Text>
                    </View>
                    <View style={[styles.viewPart]} >
                        <Text>
                            <Text style={{fontWeight:"bold"}}>Teacher: </Text>
                            <Text>{teacher}</Text>
                        </Text>
                        <Text>
                            <Text style={{fontWeight:"bold"}}>Date: </Text>
                            <Text>{dateStart}-{dateEnd}</Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.viewPart, { flex: 1, marginLeft: 0, alignItems: 'center', justifyContent: 'center' }]}>
                    <View style={styles.mark}>
                        <Text style={{fontSize: 25}}>{mark}</Text>
                    </View>
                    <View style={styles.maxMark}>
                        <Text style={{fontSize: 25}}>{maxMark}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.viewPart}>
                <Text style={styles.title}>Link: </Text>
                    {links.map((link, index) => (
                        <View key={index} style={{marginLeft: 15, marginBottom: 10}}>
                            <View style={{marginBottom: 10, flex: 1, flexDirection: "row" }}>
                                <Text style={{fontWeight: "bold"}}>{link.name}: </Text>
                                <View style={{flex: 1, alignItems: "center"}}>
                                    <Text>{link.ref}</Text>
                                </View>
                            </View>
                            {(links.length - index != 1)? <View style={{borderBottomWidth: 0.5, width: '90%'}}/>: <View/>}
                        </View>
                    ))}
            </View>
            <View style={styles.viewPart}>
                <Text style={styles.title}>Description:</Text>
                <Text>
                    { btnDesc? description: description.substring(0, description.indexOf(".", 89) + 1 ) }
                </Text>
                {btnFullDesc()}
            </View>
            <View style={styles.viewPart}>
                <Text style={styles.title}>Lessons:</Text>
                <View style={{alignItems: 'center'}}>
                    {displayLesson()}
                    {btnDisplayLesson()}
                </View>
            </View>
            <View style={styles.viewPart}>
                <Text style={styles.title}>Materials:</Text>
                <View style={{height: 400}}>
                    <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                        <View style={styles.scrollMaterial}>
                            {
                                materials.map((material, index) => (
                                    <MaterialItem key={index} params={material}/>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ScrollView>)
}

const styles = StyleSheet.create({
    viewPart: {
        backgroundColor: '#fff',
        padding: 12,
        margin: 5,
        borderRadius: 5,
        marginTop: 0
    },
    title: {
        marginBottom: 10,
        fontWeight: "bold"
    },
    mark: {
        backgroundColor: "lightblue",
        height: 50,
        width: 100,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maxMark: {
        backgroundColor: "lightgreen",
        height: 50,
        width: 100,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: "100%",
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollTable: {
        marginRight: 10,
        marginLeft: 10
    },
    tableHead: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },
    borderTable: {
        borderWidth: 0.3,
        borderColor: "black"
    },
    tableContent: {
        height: 40,
        backgroundColor: '#fcf6f6'
    },
    scrollMaterial: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between"
    }
});