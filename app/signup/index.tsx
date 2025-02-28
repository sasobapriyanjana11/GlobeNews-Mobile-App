import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, ImageBackground } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSignUp = () => {
        setErrorMessage(""); // Reset error message
        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Sign-Up successful!', `Welcome, ${user.email}`);
                setIsLoading(false);
                router.replace("/login"); // Navigate to login
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage(error.message);
            });
    };

    return (
        <ImageBackground
            source={require('../../assets/images/getting-started.jpg')} // Update path accordingly
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: true, title: 'Sign Up' }} />

                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Create an account to continue.</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="mail" size={20} color="#9d9d9d" style={styles.icon} />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.textInput}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <MaterialIcons name="lock" size={20} color="#9d9d9d" style={styles.icon} />
                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                            style={styles.textInput}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <MaterialIcons
                                name={isPasswordVisible ? "visibility" : "visibility-off"}
                                size={20}
                                color="#9d9d9d"
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Error Message Display */}
                    {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

                    <TouchableOpacity onPress={handleSignUp} disabled={isLoading} style={styles.loginButton}>
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Sign Up</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/login')}>
                        <Text style={styles.registerText}>
                            Already have an account? <Text style={styles.registerLink}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional overlay effect
    },
    title: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 20,
    },
    inputContainer: {
        width: "100%",
        gap: 15,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency for visibility
        paddingHorizontal: 15,
        borderWidth: 0.5,
        borderColor: "#ddd",
        borderRadius: 8,
    },
    textInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    loginButton: {
        backgroundColor: "#009688",
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
    },
    loginButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
        marginBottom: 10,
    },
    registerText: {
        color: "#fff",
        textAlign: "center",
        marginTop: 15,
    },
    registerLink: {
        color: "#6bf1dd",
        fontWeight: "bold",
    },
});