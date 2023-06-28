import { View, Text, SafeAreaView, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

import COLORS from '../../const/colors';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';



const FavoritesScreen = ({ navigation }) => {
    const [isFavoriteData, setIsFavoriteData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
 

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getItemsInStorageData();
        });
        return unsub;
    }, [navigation]);

    const getItemsInStorageData = async () => {
        setIsLoading(true);
        let items = await AsyncStorage.getItem('Favorites');
        items = JSON.parse(items);
        // let favoriteData = [];
        if (items) {
            const favoriteData = items.includes([]);
            setIsFavoriteData(items);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    };

   

    const removeAllFavorites = async () => {
        setIsLoading(true);
        await AsyncStorage.removeItem('Favorites');
        setIsFavoriteData([]);
        setIsLoading(false);
    };

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

            <RectButton
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
                    marginLeft: 340,
                    paddingBottom: 20,
                }}>

                <Icon name="delete" size={24} onPress={removeAllFavorites} />
            </RectButton>

            <FlatList
                data={isFavoriteData}
                keyExtractor={item => item?.id  }
                renderItem={({ item }) => {
                    
                    return (
                        <View>
                            <Text
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                    paddingBottom: 20,
                                    marginLeft: 60
                                }}>
                                chưa có giao diện 
                            </Text>
                        </View>
                    )
                }}
            />
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
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.light,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 30,
        minHeight: '110%',
    },
    searchInputContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryBtn: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,

    },
    categoryBtnName: {
        color: COLORS.dark,
        fontSize: 10,
        marginTop: 5,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    cardDetailsContainer: {
        height: 120,
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 20,
        justifyContent: 'center',
    },
    cardImageContainer: {
        height: 150,
        width: 140,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
});
export default FavoritesScreen;