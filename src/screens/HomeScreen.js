import { useState } from 'react';
import { StyleSheet, TextInput, SafeAreaView, Button, Text, TouchableOpacity } from 'react-native';
import { ALPHA_VANTAGE_API_KEY } from '@env';

export default function HomeScreen({ navigation }) {
    const [stock, onChangeText] = useState(null);
    const [stockDetail, onUpdateStockDetail] = useState('');

    const findStockName = async (stock, callback) => {
        console.log(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=${ALPHA_VANTAGE_API_KEY}`);
            const json = await response.json();
            callback(JSON.stringify(json.bestMatches[0]));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} value={stock} onChangeText={onChangeText} />
            <Button title="Look Up Stock" onPress={() => findStockName(stock, onUpdateStockDetail)} />
            <TouchableOpacity onPress={() => navigation.navigate('Detail Stack')}>
                <Text>{stockDetail}</Text>
            </TouchableOpacity>
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
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
});
