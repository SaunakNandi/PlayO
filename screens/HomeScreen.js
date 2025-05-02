import { Text, ScrollView, View, Image, Pressable, ImageBackground } from 'react-native'
import React, { useLayoutEffect,useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../AuthContext'
import axios from 'axios'
const HomeScreen = () => {
  const navigation=useNavigation()
  const [user,setUser]=useState()
  const {userId,setToken,setUserId}=useContext(AuthContext)
  console.log(userId)
  console.log(user)
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle:"",
      headerLeft:()=>{
        return(
          <View>
            <Text style={{marginLeft:15}}>Barrackpore</Text>
          </View>
        )
      },
      headerRight:()=>{
        return(
          <View style={{flexDirection:"row",alignItems:'center',gap:10,marginRight:15}}>
            <Icon name='chatbox-outline' size={24} color='green'/>
            <Icon name='notifications-outline' size={24} color='green'/>
            <Pressable onPress={clearAuthToken}>
                {console.log("Image ",user?.image)}
              <Image source={{uri:user?.user?.image}}
              style={{width:30,height:30,borderRadius:15}}/>
            </Pressable>
          </View>
        )
      }
    })
  },[user])
  const data = [
    {
      id: '10',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/Tennis%20Spotlight.png',
      text: 'Learn Tennis',
      description: 'Know more',
    },
    {
      id: '11',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_08.png',
      text: 'Up Your Game',
      description: 'Find a coach',
    },
    {
      id: '12',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_03.png',
      text: 'Hacks to win',
      description: 'Yes, Please!',
    },
    {
      id: '13',
      image:
        'https://playov2.gumlet.io/v3_homescreen/marketing_journey/playo_spotlight_02.png',
      text: 'Spotify Playolist',
      description: 'Show more',
    },
  ];

  const clearAuthToken=async()=>{
    try{
      await AsyncStorage.removeItem("token")
      setToken("")
      setUserId("")
      navigation.replace("Start")
    }
    catch(error){
      console.log("Error",error)
    }
  }

  async function fetchUser()
  {
    try {
      const response=await axios.get(`http://10.0.2.2:8000/user/${userId}`)
      console.log(response)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  useEffect(() => {
    if(userId)
      fetchUser()
  }, [userId])

  return (
    <ScrollView style={{flex:1,backgroundColor:"#F8F8F8"}}>
      {/* default value of justifyContent is flex-start */}
      <View style={{padding:13,backgroundColor:'white',margin:15,borderRadius:12,flexDirection:'row',
        alignItems:'center',gap:12, elevation:5}}>
        <View>
          <Image style={{width:40,height:40,borderRadius:25}}
          source={{uri:'https://cdn-icons-png.flaticon.com/128/785/785116.png'}}/>
        </View>
        <View>
          <View style={{flexDirection:'row',alignItems:'center',gap:4}}>
            <Text>Set Your Weekly Fit Goals</Text>
            <Image style={{width:20,height:20,borderRadius:10}}
            source={{uri:'https://cdn-icons-png.flaticon.com/128/426/426833.png'}}/>
          </View>
          <Text style={{marginTop:8,color:'gray'}}>Keep Yourself Fit</Text>
        </View>
      </View>
      <View style={{padding:13,backgroundColor:'white',marginVertical:6,marginHorizontal:13,borderRadius:12}}>
        <View style={{paddingHorizontal: 10,paddingVertical: 4,backgroundColor: '#E0E0E0',borderRadius: 4,width: 200,marginVertical: 5}}>
          <Text style={{color:"#484848",fontSize:13}}>Gear up for your game</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16}}>Badminton Activity</Text>
          <Pressable 
          style={{padding: 10,backgroundColor: 'white',borderRadius: 7,elevation:5,width: 80}}>
            <Text style={{textAlign: 'center'}}>View</Text>
          </Pressable>
        </View>
        <Text style={{marginTop:4,color:'gray'}}>You have no Games Today</Text>
        <Pressable style={{marginVertical:15,marginLeft:'auto',marginRight:'auto'}} 
        onPress={()=>navigation.navigate("PLAY",{initialOption:"Calendar"})}>
          <Text style={{fontSize: 15,fontWeight: '600',textDecorationLine: 'underline'}}>View My Calender</Text>
        </Pressable>
      </View>

      <View style={{padding:13,flexDirection: 'row',alignItems:'center',gap:20}}>
        <Pressable style={{flex: 1}} onPress={()=>{navigation.navigate('PLAY')}}>
          <View>
            <Image 
             style={{width: 180,height: 140,borderTopRightRadius: 10,borderTopLeftRadius: 10}}
            source={{uri:'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800'}}/>
          </View>
          <Pressable style={{backgroundColor:'white',padding:12,width:180,borderRadius:10}}>
            <View>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Play</Text>
              <Text style={{fontSize: 15, color: 'gray', marginTop: 7}}>Find players and join them</Text>
            </View>
          </Pressable>
        </Pressable>
        <View style={{flex: 1}}>
          <View style={{borderRadius: 10}}>
            <Image style={{width: 180,height: 140,borderTopRightRadius: 10,borderTopLeftRadius: 10}}
            source={{uri:'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=800'}}/>
          </View>
          <View style={{backgroundColor:'white',padding:12,width:180,borderRadius:10}}>
            <View>
              <Text style={{fontSize: 15, fontWeight: '500'}}>Book</Text>
              <Text style={{fontSize: 15, color: 'gray', marginTop: 7}}>Book you slots in venues nearby</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{padding:13}}>
        <View style={{padding: 10,backgroundColor: 'white',borderRadius: 10,flexDirection: 'row',gap: 10}}>
          <View style={{
            width: 50, height: 50, borderRadius: 10, flexDirection: 'row',gap: 10, backgroundColor: '#29AB87',
            justifyContent: 'center',alignItems: 'center', padding: 10}}>
            <AntDesign name='addusergroup' size={24} color='green' />
          </View>
          <View>
            <Text style={{fontWeight:'bold'}}>Groups</Text>
            <Text style={{marginTop: 10, color: 'gray'}}>Connect, Compete and Discuss</Text>
          </View>
        </View>
        <View style={{padding: 10,backgroundColor: 'white',borderRadius: 10,flexDirection: 'row', gap: 10, marginTop:10}}>
          <View style={{
            width: 50, height: 50, borderRadius: 10, flexDirection: 'row',gap: 10, backgroundColor: 'yellow',
            justifyContent: 'center',alignItems: 'center', padding: 10}}>
            <Icon name='tennisball-outline' size={24} color='black' />
          </View>
          <View>
            <Text style={{fontWeight:'bold'}}>Game Time Activities</Text>
            <Text style={{marginTop: 10, color: 'gray'}}>355 Playo hosted games</Text>
          </View>
        </View>
      </View>
      <View style={{padding: 13}}>
        <View style={{padding: 10, backgroundColor: 'white', borderRadius: 10}}>
          <Text style={{fontSize: 16, fontWeight: '700',textAlign:'center'}}>Spotlight</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data?.map((item,i)=>(
              // Used when you need to place content inside an image (e.g., text over an image).
              <ImageBackground style={{width: 220,height: 280,resizeMode: 'contain',marginRight: 10,marginVertical: 15,}}
              source={{uri:`${item.image}`}} key={item.id}/>
            ))}
          </ScrollView>
        </View>
      </View>
      <View>
        <View style={{marginLeft:'auto',marginRight:'auto'}}>
          <Image
              style={{width: 120, height: 70, resizeMode: 'contain'}}
              source={{
                uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
              }}
            />
        </View>
        <Text style={{color:'gray',textAlign:'center'}}>Your Sports Community App</Text>
      </View>
    </ScrollView>
  )
}

export default HomeScreen