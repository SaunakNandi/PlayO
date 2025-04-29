import { View, Text, ScrollView, Pressable, Image, TextInput,Alert } from 'react-native'
import React,{useContext, useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from 'react-native-modal'
import axios from 'axios';
import { AuthContext } from '../AuthContext';
const GameSetUpScreens = () => {

    // GameSetUpScreens gets route.params.item value from Game.js and UpComingGames.js 
    const route=useRoute()
    const navigation=useNavigation()
    const {userId}=useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [requests, setRequests] = useState(false);
    const [comment, setComment] = useState('');
    const [players, setPlayers] = useState([]);
    const [venues,setVenues]=useState([])
    const gameId=route?.params?.item?._id
    const userRequested=route?.params?.item.requests.some(
        request=> request.userId==userId
    )
    const [startTime, endTime] = route?.params?.item?.time?.split(' - ').map(time => time.trim());

    async function sendJoinRequest(gameId)
    {
        console.log("Called")
        if(!userId) return
        try {
            const response=await axios.post(`http://10.0.2.2:8000/games/${gameId}/request`,{userId,comment})
            if(response.status==200)
            {
                Alert.alert('Resquest Sent!','Please wait for the host to accept',[
                    {
                        text:'Cancel',
                        onPress:()=>{console.log("Cancel Pressed")},
                        style:'cancel',
                    },
                    {text:'OK',onPress:()=>setModalVisible(false)}
                ])
            }
        } catch (error) {
            console.log("Error ",error)
        }
    }
    async function fetchRequests()
    {
        const gameId = route?.params?.item?._id;
        try {
            const response = await axios.get(
              `http://10.0.2.2:8000/games/${gameId}/requests`,
            );
            setRequests(response.data);
          } catch (error) {
            console.error('Failed to fetch requests:', error);
          }
    };
    const fetchPlayers = async () => {
        try {
          const response = await axios.get(
            `http://10.0.2.2:8000/game/${gameId}/players`,
          );
          setPlayers(response.data);
        } catch (error) {
          console.error('Failed to fetch players:', error);
        }
      };
    useEffect(()=>{
        fetchRequests()
        fetchPlayers()
    },[])
    
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

  const venue=venues?.find((item)=>item?.name==route?.params?.item?.area)
  const [matchFull,setMatchFull]=useState(false)
  const toggleMatchFull=async(gameId)=>{
    try {
        const response=await axios.post("http://10.0.2.2:8000/toggle-match-full",{gameId})
        if(response.status==200)
        {
            Alert.alert("Success","Status updated")
            setMatchFull(!matchFull)
        }
    } catch (error) {
        console.log("Togglematch error",error)
    }
  }
  return (
    <>
        <SafeAreaView style={{flex:1}}>
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
                            <FontAwesome name={matchFull || route?.params?.item?.matchFull ?"toggle-on":'toggle-off'} 
                            size={24} color='white' 
                            onPress={()=>toggleMatchFull(route?.params?.item?._id)}/>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 15, color: 'white', fontWeight: '600'}}>
                            {route?.params?.item?.time} : {route?.params?.item?.date}
                        </Text>
                    </View>
                    <Pressable style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',backgroundColor: '#28c752',paddingHorizontal: 20,paddingVertical: 6,marginTop: 10,gap: 10,width: '95%',borderRadius: 8}}
                    onPress={()=>{
                        navigation.navigate('Slot',{
                            place:route?.params?.item?.area,
                            sports:venue?.sportsAvailable || [],
                            date: route?.params?.item?.date,
                            slot: route?.params?.item?.time,
                            startTime:startTime,
                            endTime:endTime,
                            gameId:route?.params?.item?._id,
                            bookings:venue?.bookings
                        })
                        }}>
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
                    <View style={{marginVertical: 12, flexDirection: 'row', gap: 10}}>
                        <View>
                            <Image source={{uri:route?.params?.item?.adminUrl}}
                            style={{width: 60, height: 60, borderRadius: 30}}/>
                        </View>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                <Text>{route?.params?.item?.adminName}</Text>
                                <View style={{alignSelf: 'flex-start',paddingHorizontal: 10,paddingVertical: 6,backgroundColor: '#E0E0E0',borderRadius: 8}}>
                                    <Text style={{fontSize:14}}>HOST</Text>
                                </View>
                            </View>
                            <View style={{paddingHorizontal: 10,paddingVertical: 5,marginTop: 10,borderRadius: 20,borderColor: 'orange',borderWidth: 1,alignSelf: 'flex-start',}}>
                                <Text>INTERMEDIATE</Text>
                            </View>
                        </View>
                    </View>
                        {
                            route?.params?.item?.isUserAdmin? (
                                <View>
                                    <View style={{height:1,borderWidth:1,borderColor:'#E0E0E0',marginVertical:12}}/>
                                    <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 14}}>
                                        <View style={{width: 60,height: 60,borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 30,justifyContent: 'center',alignItems: 'center'}}>
                                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                            source={{uri: 'https://cdn-icons-png.flaticon.com/128/343/343303.png'}}/>
                                        </View>
                                        <Text style={{fontSize: 15, fontWeight: '500', flex: 1}}>Add Co-Host</Text>
                                        <MaterialCommunityIcons name="chevron-right"size={24}color="black"/>

                                    </Pressable>
                                    <View style={{height:1,borderWidth:1,borderColor:'#E0E0E0',marginVertical:12}}/>
                                    <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                                        <View>
                                            <View style={{width: 60,height: 60,borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 30,justifyContent: 'center',alignItems: 'center'}}>
                                                <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                source={{uri: 'https://cdn-icons-png.flaticon.com/128/1474/1474545.png'}}/>
                                            </View>
                                            <Text style={{marginTop: 8,fontWeight: '500',textAlign: 'center'}}>Add</Text>
                                        </View>
                                        <View>
                                            <Pressable style={{width: 60,height: 60,borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 30,justifyContent: 'center',alignItems: 'center'}}
                                            onPress={(()=>navigation.navigate('Manage',{userId,gameId:route?.params?.item?._id}))}>
                                                <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                                source={{uri: 'https://cdn-icons-png.flaticon.com/128/7928/7928637.png'}}/>
                                            </Pressable>
                                            <Text style={{marginTop: 8,fontWeight: '500',textAlign: 'center'}}>
                                                Manage ({requests?.length})</Text>
                                        </View>
                                        <View>
                                            <Pressable onPress={() =>
                                                      navigation.navigate('Players', {
                                                          players
                                                      })}
                                                style={{justifyContent: 'center',alignItems: 'center'}}>
                                                <View style={{width: 50,height: 50,borderRadius: 25,padding: 10,borderColor: '#E0E0E0',borderWidth: 1,justifyContent: 'center',alignItems: 'center',marginVertical: 12}}>
                                                    <MaterialCommunityIcons
                                                        style={{ textAlign: 'center' }}
                                                        name="chevron-right"
                                                        size={24}
                                                        color="black"
                                                    />
                                                </View>

                                                <Text style={{marginBottom: 12,fontWeight: '600',textAlign: 'center'}}>
                                                    All Players
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={{height:1,borderWidth:1,borderColor:'#E0E0E0',marginVertical:12}}/>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
                                        <View style={{width: 60,height: 60,borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 30,justifyContent: 'center',alignItems: 'center'}}>
                                            <Image style={{width: 30, height: 30, resizeMode: 'contain'}}
                                            source={{
                                                uri: 'https://cdn-icons-png.flaticon.com/128/1511/1511847.png',
                                            }}/>
                                        </View>
                                        <View>
                                            <Text>Not on PlayO? Invite</Text>
                                            <Text style={{marginTop: 6, color: 'gray', width: '80%'}}>
                                                Earn 100 Karma points by referring your friend
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                
                            ):(
                                <View style={{justifyContent: 'center',alignItems: 'center',borderTopColor: '#E0E0E0',borderTopWidth: 1,borderBottomColor: '#E0E0E0',borderBottomWidth: 1,marginBottom: 20,}}>
                                    <Pressable style={{width: 60,height: 60,borderWidth: 1,borderColor: '#E0E0E0',borderRadius: 30,justifyContent: 'center',alignItems: 'center',marginVertical:12}} 
                                    onPress={() =>
                                        navigation.navigate('Players', {
                                            players,
                                        })}>
                                        <MaterialCommunityIcons name="chevron-right"size={24}color="black"/>
                                    </Pressable>
                                    <Text style={{marginBottom: 5, fontWeight: '600'}}>All Players</Text>
                                </View>
                            )
                        }
                </View>
                <View style={{marginHorizontal: 15,backgroundColor: 'white',padding: 12,borderRadius: 6}}>
                    <View>
                        <Text>Queries (0)</Text>
                        <View style={{marginVertical: 12}}>
                            <Text style={{color: 'gray', fontSize: 15, textAlign: 'center'}}>
                            There are no queries yet! Queries sent by players will be
                            shown here
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

        {
            route?.params?.item.isUserAdmin==true?(
                <Pressable style={{backgroundColor: '#07bc0c',marginBottom: 30,padding: 15,marginHorizontal: 10,
                borderRadius: 4}}>
                    <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500',}}>
                        GAME CHAT
                    </Text>
                </Pressable>
            ): userRequested?(
                <Pressable style={{backgroundColor: 'red',marginTop: 'auto',marginBottom: 30,padding: 15,marginHorizontal: 10,borderRadius: 4}}>
                    <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500',}}>
                        CANCEL REQUEST
                    </Text>
                </Pressable>

            ):(
                          <View
                              style={{marginTop: 'auto',flexDirection: 'row',alignItems: 'center',paddingVertical: 12,backgroundColor: '#E8E8E8'}}>
                              <Pressable style={{backgroundColor: 'white',marginTop: 'auto',marginBottom: 30,padding: 15,marginHorizontal: 10,borderRadius: 4,flex: 1,
                                  }}>
                                  <Text style={{textAlign: 'center',fontSize: 15,fontWeight: '500'}}>
                                      SEND QUERY
                                  </Text>
                              </Pressable>
                              <Pressable
                                  onPress={() => setModalVisible(!modalVisible)}
                                  style={{backgroundColor: '#07bc0c',marginTop: 'auto',marginBottom: 30,padding: 15,marginHorizontal: 10,borderRadius: 4,flex: 1}}>
                                  <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500'}}>
                                      JOIN GAME
                                  </Text>
                              </Pressable>
                          </View>
                
            )
        }

       
          <Modal isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          onBackButtonPress={() => setModalVisible(false)}
          swipeDirection={['up', 'down']}
          swipeThreshold={200}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver={false}
          style={{ justifyContent: 'flex-end', margin: 0 }}>
              <View style={{ width: '100%', height: 400, backgroundColor: 'white', padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <Text style={{ fontSize: 15, fontWeight: '500', color: 'gray' }}>
                      Join Game
                  </Text>
                  <Text>{route?.params?.item?.adminName} has been putting efforts to organize this game. Please send the request if you are interested to join</Text>
                  <View  style={{borderColor: '#E0E0E0',borderWidth: 1,padding: 10,borderRadius: 10,height: 200,marginTop: 20,}}>
                    <TextInput placeholder='Send a message to host along with your request!'
                    onValue={comment} onChangeText={setComment}
                    style={{fontFamily: 'Helvetica',fontSize: 15}}/>
                  </View>
                  <Pressable style={{marginTop: 'auto',flexDirection: 'row',alignItems: 'center',gap: 15,backgroundColor: 'green',borderRadius: 5,justifyContent: 'center',padding: 10}}
                  onPress={()=>sendJoinRequest(route?.params?.item?._id)}>
                    <Text style={{color: 'white',textAlign: 'center',fontSize: 15,fontWeight: '500'}}>Send Request</Text>
                  </Pressable>
              </View>
          </Modal>
    </>
  )
}

export default GameSetUpScreens