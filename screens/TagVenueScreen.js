import { View, Text, FlatList, Pressable, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { DataContext } from '../DataContext'
const TagVenueScreen = () => {
  const [venues,setVenues]=useState([])
  const navigation=useNavigation()
  const {setTaggedVenue}=useContext(DataContext)
  const fetchVenues=async()=>{
    try {
      const response=await axios.get('http://10.0.2.2:8000/venues')
      setVenues(response.data)
    } catch (error) {
      console.log("Error in TagVenue ",error)
    }
  }
  useEffect(()=>{
    fetchVenues()
  },[])
  // console.log("V ",venues)
  // const [taggedVenue,setTaggedVenue]=useState(null)
  // useEffect(()=>{
  //   if(taggedVenue)
  //   {
  //     navigation.goBack({taggedVenue})
  //   }
  // },[taggedVenue,navigation])

  const handleSelectVenue=(venue)=>{
    setTaggedVenue(venue)
    navigation.navigate("Create",{taggedVenue:venue})
  }
  return (
    <SafeAreaView>
      <View style={{padding:10,backgroundColor:"#294461",paddingBottom:20}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
          <Ionicons name='arrow-back' size={24} color='black' onPress={()=>navigation.goBack()}/>
          <Text style={{fontSize:15,fontWeight:500,color:'white'}}>Tag Venue</Text>
        </View>
      </View>
      <FlatList data={venues} renderItem={({item})=>(
        <Pressable style={{padding: 10,marginVertical: 10,borderColor: '#e0e0e0',borderWidth: 1,marginHorizontal: 10}}
        onPress={()=>handleSelectVenue(item?.name)}>
          <View>
            <View style={{flexDirection: 'row', gap: 10}}>
              <Image source={{uri:item?.image}} style={{width: 90,height: 90,resizeMode: 'cover',borderRadius: 7}}/>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text numberOfLines={1} ellipsizeMode="tail"  // ellipsizeMode prevent overlflow by croping to ...
                style={{fontSize: 15,fontWeight: '500',width:'100%'}}>{item?.name}</Text>
                <Text style={{marginTop: 5, color: 'gray'}}>Near Manyata park</Text>
                <Text style={{marginTop: 8, fontWeight: '500'}}>4.4 (122 ratings)</Text>
              </View>
              <Ionicons name="shield-checkmark-sharp" size={24} color="green" />
            </View>
            <View>
              <Text style={{textAlign:'center',color:'gray'}}>Bookable</Text>
            </View>
          </View>
        </Pressable>
      )}/>
    </SafeAreaView>
  )
}

export default TagVenueScreen