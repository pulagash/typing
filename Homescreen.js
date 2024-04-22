// HomeScreen.js
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.buttonText1}>Welcome to Typing Speed Checker</Text>
            <TouchableOpacity style={styles.endButton} onPress={() => navigation.navigate("TypingSpeedApp")}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    buttonText: {
        fontSize: 20,
        color: "#ffffff",
    },
    buttonText1: {
        fontSize: 20,
        color: "black",
    },
    endButton: {
        backgroundColor: "#3498db",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
})

export default HomeScreen
