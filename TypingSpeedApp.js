import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
const TypingSpeedApp = () => {
    
    const sampleText = "Techmobiles"
    const [text, setText] = useState("")
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)
    const [typingSpeed, setTypingSpeed] = useState(0)
    const [isTyping, setIsTyping] = useState(false)
    const [timer, setTimer] = useState(60)
    const [errors, setErrors] = useState(0)

    useEffect(() => {
        let timerInterval

        if (isTyping) {
            timerInterval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        clearInterval(timerInterval)
                        handleEndTyping()
                        return 60
                    }
                    return prevTimer - 1
                })
            }, 1000)
        }

        return () => {
            clearInterval(timerInterval)
        }
    }, [isTyping])

    useEffect(() => {
        if (startTime && endTime && text.trim().length > 0) {
            const timeDiffInSeconds = (endTime - startTime) / 1000
            const wordsPerMinute = (text.split(" ").length / timeDiffInSeconds) * 60
            setTypingSpeed(wordsPerMinute.toFixed(2))
        }
    }, [endTime])

    const handleStartTyping = () => {
        setText("")
        setStartTime(new Date().getTime())
        setIsTyping(true)
        setErrors(0)
    }

    const handleEndTyping = () => {
        setEndTime(new Date().getTime())
        setIsTyping(false)
        setTimer(60)
        if (text.trim().length > 0) {
            calculateErrors()
        }
    }

    const calculateErrors = () => {
        const sampleLetters = sampleText.split("")
        const enteredLetters = text.split("")
        let errorCount = 0

        const maxLength = Math.max(sampleLetters.length, enteredLetters.length)
        for (let i = 0; i < maxLength; i++) {
            if (sampleLetters[i] !== enteredLetters[i] || !sampleLetters[i] || !enteredLetters[i]) {
                errorCount++
            }
        }

        setErrors(errorCount)
    }

    const handleReset = () => {
        setText("")
        setStartTime(0)
        setEndTime(0)
        setTypingSpeed(0)
        setIsTyping(false)
        setTimer(60)
        setErrors(0)
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Typing Speed Monitor</Text>
            <Text style={styles.timer}>Timer:- {timer}s</Text>
            <Text style={styles.sampleText}>{sampleText}</Text>
            <TextInput
                style={styles.input}
                multiline
                placeholder="Type here..."
                value={text}
                onChangeText={(value) => setText(value)}
                editable={isTyping}
            />
            <View style={styles.buttonsContainer}>
                {isTyping ? (
                    <TouchableOpacity style={styles.endButton} onPress={handleEndTyping}>
                        <Text style={styles.buttonText}>End Typing</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.startButton} onPress={handleStartTyping}>
                        <Text style={styles.buttonText}>Start Typing</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
            {endTime > 0 && (
                <View style={styles.result}>
                    <Text style={styles.resultText}>
                        Typing Speed: {typingSpeed}
                        words per minute
                    </Text>
                    <Text style={styles.resultText}>Error Count: {errors}</Text>
                </View>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 16,
        justifyContent: "center",
    },
    timer: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 16,
        marginLeft: 10,
        marginRight: 130,
        borderRadius: 20,
    },
    sampleText: {
        marginBottom: 16,
        fontStyle: "italic",
        textAlign: "center",
        color: "#555",
        backgroundColor: "lightgreen",
        borderRadius: 20,
        padding: 30,
        fontWeight: "bold",
    },
    input: {
        height: 100,
        borderColor: "#3498db",
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
        fontSize: 16,
        color: "#333",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    startButton: {
        flex: 1,
        backgroundColor: "#2ecc71",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
    },
    endButton: {
        flex: 1,
        backgroundColor: "#e74c3c",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 8,
    },
    resetButton: {
        flex: 1,
        backgroundColor: "#3498db",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    result: {
        marginTop: 16,
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
    },
    resultText: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: "bold",
    },
})
export default TypingSpeedApp
