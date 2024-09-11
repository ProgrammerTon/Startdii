import React, { useState } from "react";
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../../constants/color";
import fonts from "../../constants/font";

import BackButton from "../../components/BackButton";
import Char1 from '../../components/charactor/Charactor01'; 
import Char2 from '../../components/charactor/Charactor02'; 
import Char3 from '../../components/charactor/Charactor03'; 
import Char4 from '../../components/charactor/Charactor04'; 
import Char5 from '../../components/charactor/Charactor05'; 
import Char6 from '../../components/charactor/Charactor06'; 

const Tab = createMaterialTopTabNavigator();

function ShapeDetails({ onCharSelect, color }) {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{ backgroundColor: colors.white }}>
                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char1 color={color} />)}>
                        <Char1 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char2 color={color} />)}>
                        <Char2 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char3 color={color} />)}>
                        <Char3 color={color} />
                    </TouchableOpacity>
                </View>
                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char4 color={color} />)}>
                        <Char4 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char5 color={color} />)}>
                        <Char5 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onCharSelect(<Char6 color={color} />)}>
                        <Char6 color={color} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function ColourDetails({ onColorSelect }) {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor: colors.white}}>
                <View style={styles.rowcontainer}>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.pink)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.pink }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.blue)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.blue }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.red)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.red }]} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.rowcontainer}>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.green)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.green }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.yellow)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.yellow }]} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.eachcontainer}>
                        <TouchableOpacity onPress={() => onColorSelect(colors.purple)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.purple }]} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function HatDetails() {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor: colors.white}}>
                <View>
                    <Text style={{ color: colors.text }}>Hat Screen</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



export default function DressTest() {
    const [selectedChar, setSelectedChar] = useState(<Char1 color={colors.pink} />);
    const [selectedColor, setSelectedColor] = useState(colors.pink);

    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.toptab}> 
                <BackButton />
            </View>
            <View style={{justifyContent: "center", alignItems: 'center'}}>
                <View style={[styles.main, { backgroundColor: selectedColor }]}>
                    {selectedChar}
                </View>
            </View>
            
            <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: colors.red,
                        tabBarIndicatorStyle: { backgroundColor: colors.red },
                        tabBarLabelStyle: { fontFamily: fonts.EngMedium16 },
                        tabBarStyle: { backgroundColor: colors.white },
                    }}
                >
                    <Tab.Screen name="Shape">
                        {() => <ShapeDetails onCharSelect={setSelectedChar} color={selectedColor} />}
                    </Tab.Screen>
                    <Tab.Screen name="Colour">
                        {() => <ColourDetails onColorSelect={setSelectedColor} />}
                    </Tab.Screen>
                    <Tab.Screen name="Hat" component={HatDetails} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: colors.gray_bg,
    },
    toptab: {
        backgroundColor: colors.pink,
        textAlign: 'center',
        height: '10.625%',
    },
    tabContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: "45.125%",
    },
    eachcontainer: {
        backgroundColor: colors.green,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height: 114,
        width: 114,
        margin: 10,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    rowcontainer: {
        flex: 1,
        flexDirection: 'row',
    },
    main: {
        top: "45%",
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    colorbutton: {
        borderRadius: 50,
        height: 100,
        width: 100,
    }
});
