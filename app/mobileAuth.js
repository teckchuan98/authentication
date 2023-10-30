import react, { useState, useRef} from "react";
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from 'firebase/compat/app';
import {firebaseConfig} from '../firebase';
import {getAuth, ReCaptchaVerifier} from "firebase/compat/auth"



const MobileAuthPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const handleSendCode = async () => {
        console.log('SEND CODE');
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
            console.log(verificationId);
            setVerificationId(verificationId);
            setPhoneNumber('');
        } catch (err) {
            alert(err.message);
        }
      };


    const sendVerification = () => {
        console.log(phoneNumber);
        console.log('First Step');
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
        
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId, 
            code
        );
        firebase.auth.signInWithCredential(credential)
            .then(()=> {
                setCode('');
            })
            .catch((err)=>alert(err.message));
        console.log("Phone Login Successful");
    }
    return (
        <View style = {styles.container}>
            <FirebaseRecaptchaVerifierModal 
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style = {styles.otpText}>
                Login using OTP
            </Text>
            <TextInput 
                placeholder="Phone Number" 
                onChangeText={setPhoneNumber} 
                keyboardType="phone-pad"
                stlye={styles.textTest}/>
            <TouchableOpacity style={styles.sendVerification} onPress={handleSendCode}>
                <Text style = {styles.buttonText}>
                    Send Verification
                </Text>
            </TouchableOpacity>
            <TextInput 
                placeholder="Confirm Code"
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.textInput}
                />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                <Text style = {styles.buttonText}>
                    Confirm Verification
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000",
        alignItems:"center",
        justifyContent:"center"
    },
    textTest:{

    },
    textInput:{
        paddingTop:40,
        paddingBottom:20,
        paddingHorizontal:20,
        fontSize:24,
        borderBottomColor:"#fff",
        borderBottomWidth:2,
        marginBottom:20,
        textAlign:"center",
    },
    sendVerification:{
        padding:20,
        backgroundColor:"#3498db",
        borderRadius:10,
    },
    sendCode:{
        padding:20,
        backgroundColor:"#9b59b6",
        borderRadius:10,
    },
    buttonText:{
        textAlign:"center",
        color:"#fff",
        fontWeight:"bold"
    },
    otpText:{
        fontSize:24,
        fontWeight:'bold',
        color:'#fff',
        margin:20
    }

})

export default MobileAuthPage;