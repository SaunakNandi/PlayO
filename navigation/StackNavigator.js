import { StyleSheet} from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import PlayScreen from '../screens/PlayScreen'
import BookScreen from '../screens/BookScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { NavigationContainer } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import VenueInfoScreen from '../screens/VenueInfoScreen'
const StackNavigator = () => {
    const Stack=createNativeStackNavigator()
    const Tab=createBottomTabNavigator()
    function BottomTabs(){
        return(
            <Tab.Navigator>
                <Tab.Screen name='HOME' component={HomeScreen}
                options={{
                    tabBarActiveTintColor:'green',
                    tabBarIcon:({focused})=>focused? (
                        <Icon name='home-outline' size={24} color='green'/>
                    ):(
                        <Icon name='home-outline' size={24} color='#989898'/>
                    )
                }}/>
                <Tab.Screen name='PLAY' component={PlayScreen} options={{
                    headerShown:false,
                    tabBarActiveTintColor:'green',
                    tabBarIcon:({focused})=>focused? (
                        <AntDesign name='addusergroup' size={24} color='green'/>
                    ):(
                        <AntDesign name='addusergroup' size={24} color='#989898'/>
                    )
                }}/>
                <Tab.Screen name='BOOK' component={BookScreen} options={{
                    headerShown:false,
                    tabBarActiveTintColor:'green',
                    tabBarIcon:({focused})=>focused? (
                        <SimpleLineIcons name='book-open' size={24} color='green'/>
                    ):(
                        <SimpleLineIcons name='book-open' size={24} color='#989898'/>
                    )
                }}/>
                <Tab.Screen name="PROFILE" component={ProfileScreen} options={{
                    headerShown:false,
                    tabBarActiveTintColor:'green',
                    tabBarIcon:({focused})=>focused? (
                        <Icon name='person-outline' size={24} color='green'/>
                    ):(
                        <Icon name='person-outline' size={24} color='#989898'/>
                    )
                }}/>
            </Tab.Navigator>
        )
    }
    const AuthStack=()=>{
        return(
            <Stack.Navigator></Stack.Navigator>
        )
    }
    function MainStack(){
        return (
            <Stack.Navigator>
                <Stack.Screen name='Main' component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name='Venue' component={VenueInfoScreen} options={{headerShown:false}}/>
            </Stack.Navigator>
        )
    }
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({
    
})