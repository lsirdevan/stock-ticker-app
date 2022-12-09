import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { ALPHA_VANTAGE_API_KEY } from '@env';
import { useSelector, useDispatch } from 'react-redux'
import { addFavorite, removeFavorite} from "../redux/FavoriteSlice";

export default function DetailScreen({ route, navigation }) {
    const { stock } = route.params;

    const favorites = useSelector(state => state.FavoriteSlice.favorites);
    const dispatch = useDispatch();

    const [companyData, setCompanyData] = useState({});
    const [favorited, setFavorited] = useState(false);

    const favoritePress = (type) => {
        dispatch(type == 'add' ? addFavorite(stock) : removeFavorite(stock));
        setFavorited(!favorited);
        // Debated using goBack after the user clicks Favorite but decided against it as forcing that transition seems like bad UX.
        //navigation.goBack();
    }

    useEffect(() => {
        axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stock['1. symbol']}&apikey=${ALPHA_VANTAGE_API_KEY}`)
            .then(res => {
                setCompanyData(res.data);
            });
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{paddingRight: 12}}>
                    {favorites?.find(e => e['1. symbol'] === stock['1. symbol']) ?
                        <Icon onPress={() => favoritePress('remove')} name="heart" size={28} color={'#007AFF'}/>
                    :
                        <Icon onPress={() => favoritePress('add')} name="heart-o" size={28} color={'#007AFF'}/>}
                </View>
            ),
        });
    }, [navigation, favorited]);

    return (
        <>
            {companyData ? (
                <View>
                    <Text>{companyData.Description}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Industry: </Text>
                        <Text>{companyData.Industry}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Sector: </Text>
                        <Text>{companyData.Sector}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Exchange: </Text>
                        <Text>{companyData.Exchange}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>Currency: </Text>
                        <Text>{companyData.Currency}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>52 Week Low: </Text>
                        <Text>${companyData['52WeekLow']}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: 'bold'}}>52 Week High: </Text>
                        <Text>${companyData['52WeekHigh']}</Text>
                    </View>
                </View>
            ): (
                <View>
                    <Text>Loading...</Text>
                </View>
            )}
        </>
    )
}
