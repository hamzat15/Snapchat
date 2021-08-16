import { StatusBar } from "expo-status-bar";
import React from "react";
// import { useFonts, } from '@import url https://fonts.googleapis.com/css2?family=Russo+One&display=swap';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TextInput,
    Button,
    Alert,
} from "react-native";

const App = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Inscrivez-vous !</Text>
            <StatusBar style="auto" />
            <UselessTextInput />
            <Button
                title="S'incrire"
                color="black"
                backgroundColor="black"
            />
            <Button
                title="Login"
                onPress={() => 
                navigation.navigate('Login')
                }
                color="black"
                backgroundColor="black"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00C1FF",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 45,
        margin: 12,
        borderWidth: 1,
        width: 200,
        margin: 10,
        padding: 5,
        borderBottomStartRadius: 20,
        backgroundColor: "white",
    },
});

const UselessTextInput = () => {
    const [text, onChangeText] = React.useState("");
    const [text2, onChangeText2] = React.useState(null);
    const [text3, onChangeText3] = React.useState(null);


    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Email"
                keyboardType="email-adress"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText2}
                value={text2}
                placeholder="Password"
                secureTextEntry={true}
                keyboardType="text"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeText3}
                value={text3}
                placeholder="Confirmez le Password"
                secureTextEntry={true}
                keyboardType="text"
            />
        </SafeAreaView>
    );
};

export default App;