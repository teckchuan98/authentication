import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {
    return (
        <View>
            <Text>
                Register
            </Text>
            <TextInput placeholder="Enter Mobile Number">
                
            </TextInput>
            <TouchableOpacity onPress={()=>{}}>
                <Text>Send  Verification Request</Text>
            </TouchableOpacity>
        </View>
        
    )
}

export default Register;