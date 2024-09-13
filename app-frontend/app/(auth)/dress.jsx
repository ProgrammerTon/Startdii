import React, { useState, useContext }from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity,
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
import { CharacterContext } from "../profile/charcontext";

const Tab = createMaterialTopTabNavigator();



function ShapeDetails({ onCharSelect, color }) {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{ backgroundColor: colors.white }}>
                <View style={styles.rowcontainer}>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char1')}
                    >
                        <Char1 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char2')}
                    >
                        <Char2 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char3')}
                    >
                        <Char3 color={color} />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.rowcontainer}>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char4')}
                    >
                        <Char4 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char5')}
                    >
                        <Char5 color={color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.eachcontainer}
                        onPress={() => onCharSelect('Char6')}
                    >
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
            <ScrollView style={{backgroundColor:colors.white}}>
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
            <ScrollView style={{backgroundColor:colors.white}}>
                <View>
                    {/* Your settings screen content */}
                    <Text style={{ color: colors.text }}>hat Screen</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



export default function DressTest() {
    const [selectedChar, setSelectedChar] = useState(<Char1 style={styles.image} />);
    const [selectedColor, setSelectedColor] = useState(colors.pink);
    // const { selectedChar, setSelectedChar, selectedColor, setSelectedColor } = useContext(CharacterContext);

    const getCharacterComponent = (char) => {
        switch (char) {
          case 'Char1':
            return <Char1 color={selectedColor} />;
          case 'Char2':
            return <Char2 color={selectedColor} />;
          case 'Char3':
            return <Char3 color={selectedColor} />;
          case 'Char4':
            return <Char4 color={selectedColor} />;
          case 'Char5':
            return <Char5 color={selectedColor} />;
          case 'Char6':
            return <Char6 color={selectedColor} />;
          default:
            return <Char1 color={selectedColor} />;
        }
      };

    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.toptab}> 
                <BackButton></BackButton>
            </View>
            <View style={{justifyContent: "center",alignItems: 'center'}}>
                <View style={styles.main}>
                    {getCharacterComponent(selectedChar)}
                </View>
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
    eachcontainer: {
        //backgroundColor:colors.green,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        height : 114,
        width : 114,
        margin:10,
    },
    image: {
        width: "100%",  // Adjust width as needed
        height: "100%", // Adjust height as needed
        resizeMode: 'contain', // Adjust this as needed (cover, contain, etc.)
    },
    rowcontainer: {
        flex: 1, // Fill the screen
        flexDirection: 'row', // Align children horizontally
    },
    main:{
        top:"20%",
        height:250,
        width:250,
        alignItems: 'center',
        justifyContent:'center',
        //backgroundColor:colors.pink,
        
    },
    colorbutton: {
        borderRadius: 50,
        height: 90,
        width: 90,
      }
    
});