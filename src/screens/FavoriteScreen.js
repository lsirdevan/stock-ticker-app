import {Text, View, Button, FlatList, TouchableOpacity, StyleSheet, SafeAreaView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

export default function FavoriteScreen({ navigation }) {
    const favorites = useSelector(state => state.FavoriteSlice.favorites);

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail Stack', {
            stock: item,
            title: item['1. symbol'],
        })}>
            <Item title={item['1. symbol']} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView >
            {favorites.length !== 0 ? (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={item => item['1. symbol']}
                />
            ) : (
                <View style={styles.item}>
                    <Text style={styles.title}>No Favorites have been added...</Text>
                </View>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        padding: 12,
        marginVertical: 2,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 16,
    },
});


