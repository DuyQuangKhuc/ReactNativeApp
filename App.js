import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon, { Icons } from "./src/const/Icons"
import DetailsScreen from './src/views/screens/DetailsScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import FavoritesScreen from './src/views/screens/FavoritesScreen';
import colors from './src/const/colors';
import * as Animatable from 'react-native-animatable';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './src/views/navigators/CustomDrawer';

import { useContext } from 'react';
import { NavigationContext } from './src/views/navigators/NavigationContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Feather, icon: 'home', component: HomeScreen },
  { route: 'Favorites', label: 'Favorites', type: Icons.Feather, icon: 'heart', component: FavoritesScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }


const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Icon type={item.type} name={item.icon} color={focused ? colors.white : colors.primary} />
        </View>
        <Animatable.Text
          ref={textRef}
          style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

function DrawerNavigator() {
  const { selectedTab, setSelectedTab } = useContext(NavigationContext);

  return (
    <Drawer.Navigator
      initialRouteName={selectedTab}
      drawerContent={props => <CustomDrawer {...props}  />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.white,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}
    >
      {TabArr.map((item, index) => (
        <Drawer.Screen
          key={`drawer-${index}`}
          name={`drawer-${item.route}`}
          component={MyTabs}
          options={{
            title: item.label,
            drawerIcon: ({ focused, color, size }) => (
              <Icon name={item.icon} size={18} color={color} />
            ),
            
            onPress: () => {
              setSelectedTab(item.route);
            },
            activeTintColor: colors.white,
            activeBackgroundColor: colors.primary,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

function MyTabs() {
  const { selectedTab, setSelectedTab } = useContext(NavigationContext);
  return (
    <Tab.Navigator
      initialRouteName ={selectedTab}
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        
      }}
      
    >
      {TabArr.map((item, index) => {
        return (
          <Tab.Screen key={`tab-${index}`} name={`tab-${item.route}`} component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            }}
          />
        )
      })}
    </Tab.Navigator>
  );
}

const App = () => {

  const [selectedTab, setSelectedTab] = useState('Home');

  return (
    <NavigationContext.Provider value={{ selectedTab, setSelectedTab }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>

  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: colors.primary,
  }
})
