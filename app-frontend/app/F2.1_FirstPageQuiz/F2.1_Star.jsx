import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StarRating = () => {
    return (
        <View >
            <Text style={styles.starStyle}>
                ★  {/* Solid and empty stars */}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    starStyle: {
        marginTop : -2 ,
        color: '#f5e740',
        fontSize: 24, // Adjust size as needed
    },
});

export default StarRating;
