import {StyleSheet, View, Text, Image, Touchable, TouchableOpacity} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Colors} from "@/constants/Colors";

type Props = {}

const Header = (props: Props) => {

    return (
        <View style={styles.container} >
            <View style={styles.userInfo}>
                <Image source ={{uri: 'https://xsgames.co/randomusers/avatar.php?g=female'
                }} style={styles.userImg}/>
                <View style={{gap: 3}}>
                    <Text style={styles.welcomeText}>Welcome !</Text>
                    <Text style={styles.userName}> User</Text>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{}}>
                <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
export default Header
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 30,
        marginTop: 10,
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    welcomeText: {
        fontSize:12,
        color : Colors.darkGrey,
        marginTop:10
    },
    userName: {
        fontSize:14,
        fontWeight:'700',
        color : Colors.black
    }
})
