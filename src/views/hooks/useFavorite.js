import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';

export default function useFavorite(isFocused) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const favoritesBase = useRef([])
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favoritesString = await AsyncStorage.getItem('favorites');
                if (favoritesString) {
                    const favoritesArray = JSON.parse(favoritesString);
                    favoritesBase.current = favoritesArray
                    setFavorites(favoritesArray);
                } else if (favoritesString == null) {
                    setFavorites([]);
                }
            } catch (error) {
                console.log('Error loading favorites:', error);
            } finally {
                setLoading(false);
            }
        };
        if (isFocused) {
            setLoading(true);
            loadFavorites();
        }
    }, [isFocused]);

    const removeFavorite = async (orchid) => {
        const updatedFavorites = favorites.filter((item) => item.id !== orchid.id);
        setFavorites(updatedFavorites);
        try {
            const favoritesString = JSON.stringify(updatedFavorites);
            await AsyncStorage.setItem('favorites', favoritesString);
        } catch (error) {
            console.log('Error saving favorites:', error);
        }
    };
    const removeAllFavorites = async () => {
        try {
            await AsyncStorage.removeItem('favorites');
            setFavorites([]);
            favoritesBase.current = []
        } catch (error) {
            console.log('Error removing favorites:', error);
        }
    };

    const addToFavorites = async (orchid) => {
        if (!favorites.find((item) => item.id === orchid.id)) {
            const updatedFavorites = [...favorites, orchid];
            setFavorites(updatedFavorites);
            try {
                const favoritesString = JSON.stringify(updatedFavorites);
                await AsyncStorage.setItem('favorites', favoritesString);
            } catch (error) {
                console.log('Error saving favorites:', error);
            }
        } else {
            const updatedFavorites = favorites.filter((item) => item.id !== orchid.id);
            setFavorites(updatedFavorites);
            try {
                const favoritesString = JSON.stringify(updatedFavorites);
                await AsyncStorage.setItem('favorites', favoritesString);
            } catch (error) {
                console.log('Error saving favorites:', error);
            }
        }
    };
    return {
        favorites,
        loading,
        favoritesBase,
        setFavorites,
        removeFavorite,
        removeAllFavorites,
        addToFavorites
    }
}