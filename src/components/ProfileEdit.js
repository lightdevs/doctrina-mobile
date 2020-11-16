import React, { useState, useContext } from 'react';

import {
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import {
    View,
    Text,
    Form,
    Item,
    Input,
    Textarea
} from 'native-base';
import {ProfileContext} from "../context/data/profile/profileContext";

export const ProfileEdit = () => {
    const { fields, setFields } = useContext(ProfileContext);

    return(
        <>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Avatar:"}
                    </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        style={{width: 200}}
                        onPress={null}
                    >
                        <Image
                            style={{height: 200, width: 200}}
                            resizeMode={"contain"}
                            source={{uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ad36332-03b9-4804-aad7-acc8455a1109/d48alga-49085c28-64dc-4c5b-834f-a014130bddd3.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNGFkMzYzMzItMDNiOS00ODA0LWFhZDctYWNjODQ1NWExMTA5XC9kNDhhbGdhLTQ5MDg1YzI4LTY0ZGMtNGM1Yi04MzRmLWEwMTQxMzBiZGRkMy5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.fgDrJScXYuMki_ee5-Qx8g554MMjdRZr1yvyqRlB5K8'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Information:"}
                    </Text>
                </View>
                <Form>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Name"}
                            value={fields.name}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    name: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Surname"}
                            value={fields.surname}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    surname: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"E-mail"}
                            value={fields.email}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    email: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Country"}
                            value={fields.country}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    country: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"City"}
                            value={fields.city}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    city: value
                            })}
                        />
                    </Item>
                </Form>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"Education:"}
                    </Text>
                </View>
                <Form>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Educational institution"}
                            value={fields.institution}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    institution: value
                            })}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Course of institution"}
                        />
                    </Item>
                    <Item style={styles.content} rounded>
                        <Input
                            placeholder={"Group / Form"}
                        />
                    </Item>
                </Form>
            </View>
            <View style={styles.viewPart}>
                <View style={{marginBottom: 5}}>
                    <Text style={styles.title}>
                        {"About me:"}
                    </Text>
                </View>
                <Form>
                    <Item style={[styles.content, {borderRadius: 10}]} rounded>
                        <Textarea
                            placeholder={"Description"}
                            value={fields.description}
                            onChangeText={(value) => setFields({
                                    ...fields,
                                    description: value
                            })}
                            rowSpan={5}
                        />
                    </Item>
                </Form>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    viewPart: {
        backgroundColor: '#fff',
        padding: 12,
        margin: 10,
        borderRadius: 5,
        marginTop: 0
    },
    content: {
        marginVertical: 2
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    }
});