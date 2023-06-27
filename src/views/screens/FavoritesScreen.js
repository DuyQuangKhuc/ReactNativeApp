import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native'
import React from 'react'
import COLORS from '../../const/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FavoritesScreen = ({ navigation }) => {
    

    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
            <View style={style.header}>
                {/* Drawer */}
                <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />

                <Text style={{ color: COLORS.primary, fontWeight: 'bold', fontSize: 16 }}>
                    Elysian Favorites
                </Text>
                <Image
                    source={require('../../../assets/person.jpg')}
                    style={{ height: 30, width: 30, borderRadius: 25 }}
                />
            </View>
           
            
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
});
export default FavoritesScreen