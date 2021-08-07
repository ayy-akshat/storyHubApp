import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import alertBasedOnOS from './alertBasedOnOS';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = { emailInput: "", passwordInput: "" };
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.header}>
                    <Text style={styles.headerTxt}>
                        Story Hub
                    </Text>
                </View>
                <TextInput
                    placeholder="Enter email"
                    value={this.state.emailInput}
                    keyboardType="email-address"
                    style={styles.loginInput}
                    onChangeText={text => {
                        this.setState({emailInput: text});
                    }}
                    />
                <TextInput
                    placeholder="Enter password"
                    value={this.state.passwordInput}
                    secureTextEntry={true}
                    style={styles.loginInput}
                    onChangeText={text => {
                        this.setState({passwordInput: text});
                    }}
                />
                <TouchableOpacity onPress={this.attemptLogIn} style={styles.loginBtn}>
                    <Text>
                        Log in
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }

    attemptLogIn = async () => {
        if (!(this.state.emailInput && this.state.passwordInput)) {
            alertBasedOnOS("Please enter something.");
            return;
        }

        try {
            const response = await firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passwordInput);
            if (response) {
                this.props.navigation.navigate("MainApp");
            }
        }
        catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/user-not-found":
                    alertBasedOnOS("This user does not exist.");
                    this.setState({ emailInput: "", passwordInput: "" });
                    break;

                case "auth/invalid-email":
                    alertBasedOnOS("Invalid email.");
                    this.setState({ emailInput: "", passwordInput: "" });
                    break;
                
                case "auth/wrong-password":
                    alertBasedOnOS("Invalid password.");
                    this.setState({ passwordInput: "" });
                    break;

                default:
                    alertBasedOnOS("An error happened.");
                    this.setState({ emailInput: "", passwordInput: "" });
                    break;
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#cdcdcd",
        marginTop: -100
    },
    header: {
        height: 100,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#bcbcbc",
        marginBottom: 20,
    },
    headerTxt: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    loginInput: {
        width: 200,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        margin: 5,
        paddingHorizontal: 5,
        backgroundColor: '#ededed'
    },
    loginBtn: {
        width: 100,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#bbbbbb",
    }
});