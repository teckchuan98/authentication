import React, { useEffect, useState } from "react";
import {Text, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, View} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "expo-router";
import {auth} from '../firebase';
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";

const router = useRouter();

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // run once at the beginning
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            if (user){
                console.log('Home');
            }
        })
        return unsubscribe;
    }, [])

    // auth.signOut() to sign the user out
    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log(user.email);
        })
        .catch(err=>alert(err.message));
    }

    const handleSignIn = () => { 
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in " + user.email);
        })
        .catch(err=>alert(err.emssage));
    }

    return (
        /* Safe area view works with IOS 11 and above  */
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.wrapper}>
                <TextInput 
                    style={styles.inputStyle} 
                    placeholder="Email" 
                    placeholderTextColor="#808080"
                    onChangeText={(text)=>{setEmail(text)}} ></TextInput>
                {/* <FontAwesomeIcon icon={faEnvelope}/> */}
                <TextInput 
                    style={styles.inputStyle} 
                    placeholder="Password" 
                    placeholderTextColor="#808080"
                    secureTextEntry 
                    onChangeText={(text)=>{setPassword(text)}} ></TextInput>
                {/* <FontAwesomeIcon icon={faKey}/> */}
            </View>
            <View style={styles.wrapper}>
                <TouchableOpacity style={styles.buttonStyle} onPress={handleSignIn}>
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={handleSignUp}>
                    <Text>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{router.push("/mobileAuth")}}>
                    <Text>Test Mobile Auth</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    safeAreaViewStyle:{
        flex:1,
        backgroundColor:"#DDD9D9",
        alignItems: "center",
        justifyContent: "center"
    },
    wrapper:{
        padding: 5
    },
    inputStyle:{
        width:302,
        height:45,
        borderRadius:50,
        borderWidth:1,
        textAlign: "center",
        margin:5
    },
    buttonStyle:{
        width:302,
        height:45,
        borderRadius:50,
        padding: 10,
        alignItems:"center",
        margin:5,
        backgroundColor: "#ADD8E6"
    },

})


export default Home;