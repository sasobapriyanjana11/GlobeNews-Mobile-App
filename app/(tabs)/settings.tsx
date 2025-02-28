import { StyleSheet, Switch, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, Stack } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

// Define Colors
const Colors = {
  light: {
    background: '#FFFFFF',
    text: '#000000',
    lightGrey: '#D3D3D3',
    white: '#F9F9F9',
    black: '#333333',
    tint: '#007AFF',
  },
  dark: {
    background: '#121212',
    text: '#FFFFFF',
    lightGrey: '#888888',
    white: '#1E1E1E',
    black: '#E0E0E0',
    tint: '#0A84FF',
  },
};

const Page = () => {
  const systemColorScheme = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(systemColorScheme === 'dark');

  // Load dark mode preference from AsyncStorage
  useEffect(() => {
    const loadDarkMode = async () => {
      const savedMode = await AsyncStorage.getItem('darkMode');
      if (savedMode !== null) {
        setIsEnabled(JSON.parse(savedMode));
      }
    };
    loadDarkMode();
  }, []);

  // Toggle function for dark mode and persist preference
  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
  };

  // Dynamic styles based on dark mode
  const dynamicStyles = isEnabled ? darkStyles : lightStyles;

  // Handle button presses
  const handleButtonPress = (screen: string) => {
    router.push(`/${screen.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
      <>
        <Stack.Screen
            options={{
              headerShown: true,
              title: 'Settings',
              headerStyle: {
                backgroundColor: isEnabled ? Colors.dark.background : Colors.light.background,
              },
              headerTintColor: isEnabled ? Colors.dark.text : Colors.light.text,
            }}
        />
        <View style={[styles.container, dynamicStyles.container]}>
          {/* About */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('About')}
              activeOpacity={0.7}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>About</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Send Feedback */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Send Feedback')}
              activeOpacity={0.7}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Send Feedback</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Privacy Policy')}
              activeOpacity={0.7}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Privacy Policy</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Terms of Use */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => handleButtonPress('Terms of Use')}
              activeOpacity={0.7}
          >
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Terms of Use</Text>
            <MaterialIcons
                name="arrow-forward-ios"
                size={16}
                color={isEnabled ? Colors.dark.lightGrey : Colors.light.lightGrey}
            />
          </TouchableOpacity>

          {/* Dark Mode Toggle */}
          <TouchableOpacity style={[styles.itemBtn, dynamicStyles.itemBtn]} activeOpacity={0.7}>
            <Text style={[styles.itemBtnText, dynamicStyles.itemBtnText]}>Dark Mode</Text>
            <Switch
                trackColor={{ false: '#767577', true: Colors.light.tint }}
                thumbColor={isEnabled ? Colors.light.tint : '#ffffff'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{ transform: [{ scale: 0.8 }], marginBottom: -5, marginRight: -5 }}
            />
          </TouchableOpacity>

          {/* Log Out */}
          <TouchableOpacity
              style={[styles.itemBtn, dynamicStyles.itemBtn]}
              onPress={() => {
                handleButtonPress('Log out');
                router.replace('/login');
              }}
              activeOpacity={0.7}
          >
            <Text style={[styles.itemBtnText, { color: 'red' }]}>Log out</Text>
            <MaterialIcons name="logout" size={16} color="red" />
          </TouchableOpacity>
        </View>
      </>
  );
};

export default Page;

// Base styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

// Light mode styles
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  itemBtn: {
    backgroundColor: Colors.light.white,
    borderBottomColor: Colors.light.lightGrey,
  },
  itemBtnText: {
    color: Colors.light.black,
  },
});

// Dark mode styles
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  itemBtn: {
    backgroundColor: Colors.dark.white,
    borderBottomColor: Colors.dark.lightGrey,
  },
  itemBtnText: {
    color: Colors.dark.black,
  },
});
