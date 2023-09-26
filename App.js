import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";

export default function App() {
    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text>Initialized...</Text>
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        alignItems: "center",
        justifyContent: "center",
    },
});
