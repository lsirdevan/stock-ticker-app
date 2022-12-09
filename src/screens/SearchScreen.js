import {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, FlatList, View, TouchableOpacity} from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { ALPHA_VANTAGE_API_KEY } from '@env';
import axios from "axios";

export default function SearchScreen({ route, navigation }) {
    const [searchText, updateSearchText] = useState('');
    const [stockDetail, updateStockDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const findStockName = () => {
        /* I wanted to make a request for every text change to show the user the results as they type, however
         * there is a rate limit on alphavantage at 5 calls per minute or 500 calls a day so that won't work!
         */
        updateSearchText(text);
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${text}&apikey=${ALPHA_VANTAGE_API_KEY}`)
            .then(res => {
                updateStockDetail(res.data.bestMatches);
            });
    }

    const onSearch = () => {
        setLoading(true);
        axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchText}&apikey=${ALPHA_VANTAGE_API_KEY}`)
            .then(res => {
                updateStockDetail(res.data.bestMatches);
                setLoading(false);
            });
    }

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
            <SearchBar
                placeholder="Search..."
                onChangeText={(value) => updateSearchText(value)}
                value={searchText}
                showCancel
                platform={'ios'}
            />
            <Button
                title="Search"
                onPress={onSearch}
                type={'outline'}
                raised
                loading={loading}
            />
            <FlatList
                data={stockDetail}
                renderItem={renderItem}
                keyExtractor={item => item['1. symbol']}
            />
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
