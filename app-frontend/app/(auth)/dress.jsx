import React, { useState, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
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
import HNone from '../../components/hat/hat_none';
import HBanana from '../../components/hat/hat_banana';
import HCap from '../../components/hat/hat_cap';
import HCowboy from '../../components/hat/hat_cowboy';
import HCrown from '../../components/hat/hat_crown';
import HDeer from '../../components/hat/hat_deer';
import HFlower from '../../components/hat/hat_flower';
import HMagic from '../../components/hat/hat_magic';
import HPlant from "../../components/hat/hat_plant";
import HPlaster from "../../components/hat/hat_plaster";
import HShark from "../../components/hat/hat_shark";
import HXmas from "../../components/hat/hat_xmas";
import { CharacterContext } from "../profile/charcontext";


const Tab = createMaterialTopTabNavigator();

function ShapeDetails({ onCharSelect, color }) {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char1")}
          >
            <Char1 color={color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char2")}
          >
            <Char2 color={color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char3")}
          >
            <Char3 color={color} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowcontainer}>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char4")}
          >
            <Char4 color={color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char5")}
          >
            <Char5 color={color} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.eachcontainer}
            onPress={() => onCharSelect("Char6")}
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
                        <TouchableOpacity onPress={() => onColorSelect(colors.green)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.green }]} />
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
                        <TouchableOpacity onPress={() => onColorSelect(colors.pink)}>
                            <View style={[styles.colorbutton, { backgroundColor: colors.pink }]} />
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

function HatDetails({ onHatSelect }) {
    return (
        <SafeAreaView style={styles.bg}>
            <ScrollView style={{backgroundColor:colors.white}}>
                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HNone')}>
                        <HNone />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HBanana')}>
                        <HBanana />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HCap')}>
                        <HCap />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HCowboy')}>
                        <HCowboy />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HCrown')}>
                        <HCrown />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HDeer')}>
                        <HDeer />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HFlower')}>
                        <HFlower />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HMagic')}>
                        <HMagic />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HPlant')}>
                        <HPlant />
                    </TouchableOpacity>
                </View>

                <View style={styles.rowcontainer}>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HPlaster')}>
                        <HPlaster />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HShark')}>
                        <HShark />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eachcontainer} onPress={() => onHatSelect('HXmas')}>
                        <HXmas />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}




export default function DressTest() {
    const [selectedHat, setSelectedHat] = useState('HNone');
    const { selectedChar, setSelectedChar, selectedColor, setSelectedColor } = useContext(CharacterContext);

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

    const getHatComponent = (hat) => {
        switch (hat) {
            case 'HBanana':
                return <HBanana />;
            case 'HCap':
                return <HCap />;
            case 'HCowboy':
                return <HCowboy />;
            case 'HCrown':
                return <HCrown />;
            case 'HDeer':
                return <HDeer />;
            case 'HFlower':
                return <HFlower />;
            case 'HMagic':
                return <HMagic />;
            case 'HPlant':
                return <HPlant />;
            case 'HPlaster':
                return <HPlaster />;
            case 'HShark':
                return <HShark />;
            case 'HXmas':
                return <HXmas />;
        }
    };

    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.toptab}> 
                <BackButton></BackButton>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.characterContainer}>
                    {/* Render Hat and Character Together */}
                    {getCharacterComponent(selectedChar)}
                    {getHatComponent(selectedHat) && (
                        <View style={styles.hatContainer}>
                            {getHatComponent(selectedHat)}
                        </View>
                    )}
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
                    <Tab.Screen name="Hat">
                        {() => <HatDetails onHatSelect={setSelectedHat} />}
                    </Tab.Screen>
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
    char: {
        width: "100%",  // Adjust width as needed
        height: "100%", // Adjust height as needed
        resizeMode: 'contain', // Adjust this as needed (cover, contain, etc.)
    },
    rowcontainer: {
        flex: 1, // Fill the screen
        flexDirection: 'row', // Align children horizontally
    },
    colorbutton: {
        borderRadius: 50,
        height: 90,
        width: 90,
    },
    mainContainer: {
        top:"7%",
        alignItems: 'center',
        flex: 1,
    },
    characterContainer: {
        height: 250,
        width: 250,
        position: 'relative', // Ensures the child elements (hat) can be positioned absolutely inside this container
    },
    hatContainer: {
        //backgroundColor:colors.green,
        height:"56%",
        width:"56%",
        top:"-104%",
        left:"22.5%"
    },
        
    
    
    
});
