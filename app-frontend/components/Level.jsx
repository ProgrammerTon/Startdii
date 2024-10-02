import { View, Text, StyleSheet } from "react-native";
import fonts from "../constants/font";
import colors from "../constants/color";
import Star from "../components/Star";

const Level = ({
    level,
    percent,
    otherStyles,
}) => {

    return (
        <View style={[styles.container, otherStyles]}>
            <View style={[styles.textstarContainer, otherStyles]}>
                <Text style={[fonts.EngBold22, styles.levelText]}>{level}</Text>
                <Star></Star>
            </View>
            <View style={[styles.inputContainer, otherStyles]}>
                <View style={[styles.ProcessContainer, { width: percent }]}>
                    <Text style={[fonts.EngSemiBold14, styles.percentText]}>{percent}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: '1%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textstarContainer: {
        // position: 'absolute',
        zIndex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
    },
    inputContainer: {
        backgroundColor: colors.white,
        borderRadius: 50,
        shadowColor: colors.gray_bgblur,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        height: 35,
        paddingVertical: '0.5%',
        paddingHorizontal: '1%',
        top: '17%',
        right: '10%',
    },
    ProcessContainer: {
        backgroundColor: colors.red,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: '85%',
    },
    levelText: {
        color: colors.black,
        top: '6%',
        zIndex: 1,
        top: '53%',
    },
    percentText: {
        color: colors.white,
    },
});

export default Level;