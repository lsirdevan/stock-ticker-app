import { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios";
import { ALPHA_VANTAGE_API_KEY } from '@env';

export default function DetailScreen({ route, navigation }) {
    const { stock } = route.params;

    const [companyData, setCompanyData] = useState({});
    const [favorited, setFavorited] = useState(false);

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
                    {favorited ?
                        <Icon onPress={() => console.log('test')} name="heart" size={28} color={'#007AFF'}/>
                    :
                        <Icon onPress={() => console.log('test')} name="heart-o" size={28} color={'#007AFF'}/>}
                </View>
            ),
        });
    }, [navigation]);

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
