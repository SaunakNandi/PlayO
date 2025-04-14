import { View, Text, ScrollView, Pressable, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const GameSetUpScreens = () => {

    const route=useRoute()
    // console.log(route?.params?.item)
    const navigation=useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 10,backgroundColor: '#294461',paddingBottom: 20}}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',}}>
                <Ionicons name='arrow-back' size={24} color='white' onPress={()=>navigation.goBack()}/>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Entypo name='share' size={24} color='white' />
                    <Entypo name='dots-three-vertical' size={24} color='white' />
                </View>
            </View>
            <View style={{marginTop: 20,flexDirection: 'row',alignItems: 'center',gap: 14,}}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>{route?.params?.item?.sport}</Text>
                <View style={{padding: 7,backgroundColor: 'white',borderRadius: 7}}>
                    <Text >Regular</Text>
                </View>
                <View style={{marginLeft: 'auto',flexDirection: 'row',alignItems: 'center',gap: 6}}>
                    <Text style={{fontSize: 15, fontWeight: '500', color: 'white'}}>Match Full</Text>
                    <FontAwesome name='toggle-off' size={24} color='white' onPress={()=>{}}/>
                </View>
            </View>
            <View style={{marginTop: 10}}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: '600'}}>
                    {route?.params?.item?.time} : {route?.params?.item?.date}
                </Text>
            </View>
            <Pressable style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',backgroundColor: '#28c752',paddingHorizontal: 20,paddingVertical: 6,marginTop: 10,gap: 10,width: '95%',borderRadius: 8}}>
                <Entypo name='location' size={24} color='white' />
                <View>
                    <Text style={{color: 'white'}} numberOfLines={3}>{route?.params?.item?.area}</Text>
                </View>
            </Pressable>
        </View>
        <View style={{marginVertical: 20,marginHorizontal: 15,backgroundColor: 'white',padding: 10,flexDirection: 'row',
            gap: 10}}>
            <MaterialCommunityIcons name="directions-fork"size={24}color="#adcf17"/>
            <View>
                <Text style={{fontSize: 15}}>Add Expense</Text>
                <View style={{marginTop: 6,flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Text style={{width: '80%', color: 'gray'}}>Start adding your expenses to split cost among players</Text>
                    <Entypo name="chevron-small-right" size={24} color="gray" />
                </View>
            </View>
        </View>
        <View style={{marginHorizontal: 15}}>
            <Image source={{
                uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
              }} style={{width:'100%',height:200,borderRadius:10,resizeMode:'cover'}}/>
        </View>
        <View style={{marginVertical: 20,marginHorizontal: 15,backgroundColor: 'white',padding: 12}}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',}}>
                <Text style={{fontSize: 16, fontWeight: '600'}}>Players (2)</Text>
                <Ionicons name="earth" size={24} color="gray" />
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginTop: 20,}}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>❤️ You are not covered 🙂</Text>
                <Text style={{fontWeight: '500'}}>Learn More</Text>
            </View>
            <View style={{marginTop:12}}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text>{route?.params?.item?.adminName}</Text>
                    <View style={{alignSelf: 'flex-start',paddingHorizontal: 10,paddingVertical: 6,backgroundColor: '#E0E0E0',borderRadius: 8}}>
                    <Text style={{fontSize:14}}>HOST</Text>
                  </View>
                </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default GameSetUpScreens