import React, { useState, useRef } from 'react';
import { router } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import colors from "../constants/color";
import Shirt from './ShirtIcon';

const DressButton = ({ style }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={() => router.push("../dress")}
        >
            <View style={styles.iconContainer}>
                <Shirt width={30} height={30} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 45,
        width: 45,
        backgroundColor: colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: colors.gray_bgblur,
        shadowOffset: [{ width: 0, height: 0 }],
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DressButton;