import { View, Text, Pressable, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
const ManageRequestScreen = () => {
  const [options,setOptions]=useState('Requests')
  const [players,setPlayers]=useState([])
  const [requests,setRequests]=useState([])
  const route=useRoute()
  // const userId=route?.params?.userId
  const gameId=route?.params?.gameId

  const fetchRequest=async()=>{
    try {
      const response=await axios.get(`http://10.0.2.2:8000/games/${gameId}/requests`)
      setRequests(response.data)
    } catch (error) {
      console.log("Error fetching ",error)
    }
  }
  console.log('requests ',requests)

  const acceptRequest=async(userId)=>{
    try {
      const user={gameId,userId}
      const response=await axios.post('http://10.0.2.2:8000/accept',user)
      if(response.status==200)
      {
        Alert.alert("Success","Request Accepted")
        await fetchRequest()
        await fetchPlayers()
      }
      
    } catch (error) {
      console.log('Error',error)
    }
  }

  async function fetchPlayers() {
    try {
      const response=await axios.get(`http://10.0.2.2:8000/game/${gameId}/players`)
      setPlayers(response.data)
    } catch (error) {
      console.log("Error",error)
    }
  }
  useEffect(()=>{
    fetchPlayers()
    fetchRequest()
  },[])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 12, backgroundColor: '#223536'}}>
          <View style={{flexDirection: 'row',alignItems: 'center',gap: 5,justifyContent: 'space-between'}}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <AntDesign name="plussquareo" size={24} color="black" />
          </View>
          <View
            style={{marginTop: 15,flexDirection: 'row',alignItems: 'center',gap: 5,justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>Manage</Text>
            <View>
              <Text style={{ color: 'white', fontSize: 17 }}>Match Full</Text>
            </View>
          </View>
          <View style={{marginTop: 10,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',gap: 15}}>
            <Pressable onPress={()=>setOptions('Requests')}>
              <Text style={{fontWeight:'500',color:options=='Requests'?'#1dd132':'white'}}>Requests ({requests.length})</Text>
            </Pressable>
            <Pressable onPress={()=>setOptions('Invited')}>
              <Text style={{fontWeight:'500',color:options=='Invited'?'#1dd132':'white'}}>Invited (0)</Text>
            </Pressable>
            <Pressable onPress={()=>setOptions('Playing')}>
              <Text style={{fontWeight:'500',color:options=='Playing'?'#1dd132':'white'}}>Playing ({players.length})</Text>
            </Pressable>
            <Pressable onPress={()=>setOptions('Retired')}>
              <Text style={{fontWeight:'500',color:options=='Retired'?'#1dd132':'white'}}>Retired (0)</Text>
            </Pressable>
          </View>
        </View>
        <View style={{marginTop: 10, marginHorizontal: 15}}>
          <View>
            {options=='Requests' && (
              <View>
                {
                  requests?.map((item,index)=>(
                    <Pressable style={{padding: 10,backgroundColor: 'white',marginVertical: 10,
                    borderRadius: 6}} key={index}>
                      <View style={{flexDirection: 'row',alignItems: 'center',gap: 13}}>
                        <Image style={{width: 50, height: 50, borderRadius: 25}} source={{uri:item?.image}}/>
                        <View style={{flex:1}}>
                          <View style={{fontWeight: '600'}}>
                            <Text>{item?.firstName} {item?.lastName}</Text>
                          </View>
                          <View style={{paddingHorizontal: 10,paddingVertical: 3,marginTop: 10,borderRadius: 20,borderColor: 'orange',borderWidth: 1,alignSelf: 'flex-start'}}>
                            <Text style={{fontSize: 13}}>INTERMEDIATE</Text>
                          </View>
                        </View>
                        <View>
                          <Image style={{width: 110, height: 60, resizeMode: 'contain'}} 
                          source={{uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50'}}/>
                        </View>
                      </View>
                      <Text style={{marginTop:8}}>{item?.comment}</Text>

                      <View style={{height: 1,borderColor: '#E0E0E0',borderWidth: 0.7,marginVertical: 15}}/>

                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <View>
                          <View style={{paddingHorizontal: 10,paddingVertical: 4,backgroundColor: '#E0E0E0',borderRadius: 5,alignSelf: 'flex-start'}}>
                            <Text>0 No Shows</Text>
                          </View>
                          <Text style={{marginTop: 10,fontWeight: 'bold',textDecorationLine: 'underline'}}>
                            See Reputation
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center',gap: 12}}>
                          <Pressable style={{padding: 10,borderRadius: 6,borderColor: '#E0E0E0',
                            borderWidth: 1,width: 100}}>
                            <Text style={{textAlign: 'center'}}>Reject</Text>
                          </Pressable>
                          <Pressable style={{padding: 10,borderRadius: 6,backgroundColor: '#26bd37',width: 100}}
                          onPress={()=>acceptRequest(item?.userId)}>
                            <Text style={{textAlign: 'center'}}>Accept</Text>
                          </Pressable>
                        </View>
                      </View>
                    </Pressable>
                  ))
                }
              </View>
            )}
          </View>
        </View>
        <View style={{marginTop: 10, marginHorizontal: 15}}>
          <View>
            {options=="Playing" && (
              <View>
                {
                  players?.map((item,index)=>(
                    // This should direct to player profile
                    <Pressable key={index} style={{marginVertical: 10,flexDirection: 'row',alignItems: 'center',gap: 10}}>
                      <View>
                        <Image style={{width:60,height:60,borderRadius:30}} source={{uri:item?.image}}/>
                      </View>
                      <View>
                        <Text>{item?.firstName} {item?.lastName}</Text>
                        <View
                        style={{paddingHorizontal: 10,paddingVertical: 5,marginTop: 10,borderRadius: 20,borderColor: 'orange',borderWidth: 1,alignSelf: 'flex-start',
                        }}>
                        <Text style={{fontSize: 13, fontWeight: '400'}}>
                          INTERMEDIATE
                        </Text>
                      </View>

                      </View>
                    </Pressable>
                  ))
                }
              </View>

            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ManageRequestScreen