import {
    View,
    Text,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Alert,
} from "react-native";
import React from "react";
import { useState, useContext } from "react";
import { ScrollView } from "react-native";
import AuthService from "../../services/AuthService";
import { router } from "expo-router";
import { useCharContext, CharacterContext } from "./charcontext";
import fonts from "../../constants/font";
import colors from "../../constants/color";
import GoalProcess from "../../components/GoalProcess";
import SignoutButton from "../../components/SignoutButton";
import PencilIcon from "../../components/PencilIcon";
import Level from "../../components/Level";
import Char1 from '../../components/charactor/Charactor01'; 
import Char2 from '../../components/charactor/Charactor02'; 
import Char3 from '../../components/charactor/Charactor03'; 
import Char4 from '../../components/charactor/Charactor04'; 
import Char5 from '../../components/charactor/Charactor05'; 
import Char6 from '../../components/charactor/Charactor06'; 

export default function ProfileTest() {
    const { selectedChar } = useCharContext();
    console.log(selectedChar, 'ooo');

    const getCharacterComponent = React.useMemo(() => {
        console.log(selectedChar, "ffff")
        switch (selectedChar) {
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
    }, [selectedChar, selectedColor]);

    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.toptab}>
                <TouchableOpacity style={styles.usernameContainer}>
                    <Text style={[fonts.EngBold22, styles.username]}>Juaz Juazzz</Text>
                    <View style={styles.pencilContainer}>
                        <PencilIcon />
                    </View>
                </TouchableOpacity>
                <View style={styles.signoutContainer}>
                    <SignoutButton />
                </View>
            </View>
            <ScrollView>
                <View style={styles.levelContainer}>
                    <Level
                        level="1"
                        percent="50%" />
                </View>
                <View style={styles.charContainer}>
                    {getCharacterComponent}
                </View>
                <View>
                    <GoalProcess
                        title="ทำครบ 3 Quiz"
                        percent="80%" />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    bg: {
        height: '100%',
        backgroundColor: colors.gray_bg,
    },
    toptab: {
        backgroundColor: colors.pink,
        textAlign: 'center',
        height: '10.625%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        position: 'relative',
    },
    usernameContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    username: {
        color: colors.black,
        fontSize: 24,
    },
    signoutContainer: {
        position: 'absolute',
        right: 20,
    },
    pencilContainer: {
        bottom: -2,
        marginLeft: 6,
    },
    levelContainer: {
        alignItems: 'center',
        left: '3%',
        bottom: '10%',
    },
    charContainer: {
        alignItems: 'center',
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
}