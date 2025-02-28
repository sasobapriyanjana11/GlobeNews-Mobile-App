import {View, Text, StyleSheet, ActivityIndicator, ActivityIndicatorProps} from "react-native";
import React from 'react'

type Props={}
const Loading=(props:React.JSX.intrinsicAttributes&
    React.JSX.intrinsicClassAttributes<ActivityIndicator>&Readonly<ActivityIndicatorProps>)=>{
    return(
        <View style={styles.container}>
            <ActivityIndicator {...props}/>
        </View>
    )

}
export default Loading;
const styles=StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    }
})
