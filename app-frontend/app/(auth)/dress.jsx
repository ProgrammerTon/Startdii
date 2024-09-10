import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import BackButton from "../../components/BackButton";
import Char1 from '../../components/charactor/Charactor01'; 
import Char2 from '../../components/charactor/Charactor02'; 
import Char3 from '../../components/charactor/Charactor03'; 
import Char4 from '../../components/charactor/Charactor04'; 
import Char5 from '../../components/charactor/Charactor05'; 
import Char6 from '../../components/charactor/Charactor06'; 


const Tab = createMaterialTopTabNavigator();


function ShapeDetails() {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor:colors.white}}>
                
                <View style={styles.parentContainer}>
                    <View style={styles.shapecontainer}>
                        <Char1 style={styles.image}></Char1>
                    </View>
                    <View style={styles.shapecontainer}>
                        <Char2 style={styles.image}></Char2>
                    </View>
                    <View style={styles.shapecontainer}>
                        <Char3 style={styles.image}></Char3>
                    </View>
                </View>
                <View style={styles.parentContainer}>
                    <View style={styles.shapecontainer}>
                        <Char4 style={styles.image}></Char4>
                    </View>
                    <View style={styles.shapecontainer}>
                        <Char5 style={styles.image}></Char5>
                    </View>
                    <View style={styles.shapecontainer}>
                        <Char6 style={styles.image}></Char6>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}

function ColourDetails() {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor:colors.white}}>
                <View>
                <View style={styles.container}>
            <CircularButton onPress={handlePress} title="Press Me" />
        </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function HatDetails() {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor:colors.white}}>
                <View>
                    {/* Your settings screen content */}
                    <Text style={{ color: colors.text }}>hat Screen</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function CircularButton({ onPress, title }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default function DressTest() {
    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.toptab}> 
                <BackButton></BackButton>
            </View>
            <View style={styles.main}>
                <Char1 style={styles.image}></Char1>
            </View>
            <View style={styles.tabContainer}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: colors.red,
                        tabBarIndicatorStyle: { backgroundColor: colors.red },
                        tabBarLabelStyle: { fonts: fonts.EngMedium16},
                        tabBarStyle: { backgroundColor: colors.white },
                    }}
                >
                    <Tab.Screen name="Shape" component={ShapeDetails} />
                    <Tab.Screen name="Colour" component={ColourDetails} />
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
        // display: 'inline-block',
        backgroundColor: colors.pink,
        textAlign: 'center',
        height : '10.625%'
    },
    tabContainer: {
        flex: 1,
        position: 'absolute', // ทำให้สามารถใช้ตำแหน่งสัมพัทธ์
        bottom: 0, // ชิดขอบล่าง
        left: 0, // อาจต้องใช้สำหรับให้เริ่มที่มุมซ้าย
        right: 0, // ให้ครอบคลุมความกว้างทั้งหมด
        height: "45.125%",
    },
    shapecontainer: {
        backgroundColor:colors.green,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height : 114,
        width : 114,
    },
    image: {
        width: 114,  // Adjust width as needed
        height: 114, // Adjust height as needed
        resizeMode: 'contain', // Adjust this as needed (cover, contain, etc.)
    },
    parentContainer: {
        flex: 1, // Fill the screen
        top:"5%",
        flexDirection: 'row', // Align children horizontally
    },
    main:{
        top:"9%",
        left:"20%",
        height:200,
        width:200,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:colors.pink
    },
    button: {
        width: 100,         // Set the width of the button
        height: 100,        // Set the height of the button (same as width to keep it circular)
        borderRadius: 50,   // Half of the width/height to make it circular
        backgroundColor: '#007BFF', // Button background color
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,       // Shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
        shadowOpacity: 0.1, // Shadow opacity for iOS
        shadowRadius: 2,    // Shadow radius for iOS
    },
    buttonText: {
        color: '#fff',      // Text color
        fontSize: 16,       // Text size
        fontWeight: 'bold', // Text weight
    },
    
});