import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ImageBackground
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, Stack } from "expo-router";
import {Colors} from "@/constants/Colors";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = () => {
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
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Login successful!', `Hello, ${user.email}`);
                setIsLoading(false);
                router.replace("/(tabs)"); // Navigate to dashboard
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage(error.message);
            });
    };

    return (
        <ImageBackground
            source={require('../../assets/images/signIn-news.jpg')}  // Update path accordingly
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: true, title: 'Login' }} />

                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Please login to continue.</Text>

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

                    <TouchableOpacity onPress={handleLogin} disabled={isLoading} style={styles.loginButton}>
                        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.replace('/signup')}>
                        <Text style={styles.registerText}>
                            Don’t have an account? <Text style={styles.registerLink}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ImageBackground>
    );
};

export default LoginScreen;

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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    title: {
        color: Colors.white,
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        color: "#fdfcfc",
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
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight transparency
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
        backgroundColor: Colors.black,
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
        color: "#94efe2",
        fontWeight: "bold",
    },
});