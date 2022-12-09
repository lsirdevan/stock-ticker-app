import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function FlatListItem(props) {
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <TouchableOpacity onPress={() => props.navigate()}>
            <Item title={props.title} />
        </TouchableOpacity>
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
