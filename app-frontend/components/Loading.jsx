import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loading() {
    return (
        <View style={styles.container}>
            <LottieView
                source={require('../assets/loading.json')}
                autoPlay
                loop={true}
                resizeMode='cover'
            // onAnimationFinish={}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
});
