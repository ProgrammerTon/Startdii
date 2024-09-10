import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import fonts from "../constants/font";
import colors from "../constants/color";
import SignoutIcon from "../components/SignoutIcon";
import SignUp from '../app/(auth)/sign-in'; 

const SignoutButton = ({ onPress, style, navigation }) => {
    // const handleSignout = (event) => {
    //     navigation.replace('sign-in');
    // };
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <View>
                <SignoutIcon/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 45,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: colors.gray_bgblur,
        shadowOffset: [{ width: 0, height: 0 }],
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

export default SignoutButton;

