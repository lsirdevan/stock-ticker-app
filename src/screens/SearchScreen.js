import { useCallback, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, View, TouchableOpacity } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { ALPHA_VANTAGE_API_KEY } from '@env';
import { useSelector, useDispatch } from "react-redux";
import { debounce } from 'lodash';
import { api } from '../redux/api';
import { resetMatches } from "../redux/QuerySlice";
import FlatListItem from "../components/FlatListItem";

export default function SearchScreen({ route, navigation }) {
    const [searchText, updateSearchText] = useState('');
    const dispatch = useDispatch();

    const { bestMatches } = useSelector(state => state.searchResults);

    const onSearch = (value) => {
        dispatch(value ? api.endpoints.searchBySymbol.initiate({
            function: 'SYMBOL_SEARCH',
            keywords: value,
            apikey: ALPHA_VANTAGE_API_KEY
        }) : resetMatches()) ;
    }

    const debounceChangeHandler = useCallback(debounce(onSearch, 500), []);

    return (
        <SafeAreaView >
            <SearchBar
                placeholder="Search..."
                onChangeText={(value) => {
                    updateSearchText(value);
                    debounceChangeHandler(value);
                }}
                value={searchText}
                showCancel
                platform={'ios'}
            />
            <FlatList
                data={bestMatches}
                renderItem={({ item }) => (
                    <FlatListItem
                        navigate={() => navigation.navigate('Detail Stack', {
                            stock: item,
                            title: item['1. symbol'],
                        })}
                        title={item['1. symbol']}
                    />
                )}
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
