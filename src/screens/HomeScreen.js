import {Text, View, StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button
                    onPress={() => navigation.navigate('Search')}
                    style={styles.buttonStyle}
                    title="Search for Companies"
                    icon={
                        <Icon
                            name="search"
                            size={15}
                            color="white"
                            style={styles.iconStyle}
                        />
                    }
                />
            </View>
            <View>
                <Button
                    onPress={() => navigation.navigate('Favorites')}
                    style={styles.buttonStyle}
                    title="View Favorites"
                    icon={
                        <Icon
                            name="heart"
                            size={15}
                            color="white"
                            style={styles.iconStyle}
                        />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        margin: 15,
    },
    buttonStyle: {
        width: 300
    },
    iconStyle: {
        paddingRight: 10
    }
});
