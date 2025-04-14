import { StyleSheet, Text, View, Image, Pressable, ScrollView, FlatList } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Game from '../components/Game'
import { AuthContext } from '../AuthContext'
import UpComingGames from './UpComingGames'

const PlayScreen = () => {
  const [option,setOption]=useState('My Sports')
  const [sport,setSport]=useState('Badminton')
  const [games,setGames]=useState([])
  const [upcomingGames,setUpComingGames]=useState()
  const {userId}=useContext(AuthContext)
  const navigation=useNavigation()
  const fetchGames=async()=>{
    try {
      const response=await axios.get('http://10.0.2.2:8000/games')
      setGames(response.data)
    } catch (error) {
      console.log('Error',error)
    }
  }
  const fetchUpcomingGames=async()=>{
    try {
      console.log(userId)
      const response=await axios.get(`http://10.0.2.2:8000/upcoming?userId=${userId}`)
      setUpComingGames(response.data)
    } catch (error) {
      console.log('Error',error)
    }
  }
  useEffect(()=>{
    fetchGames()
  },[])
  useEffect(()=>{
    if(userId)
      fetchUpcomingGames()
  },[userId])
  // console.log("games ",games)
  // console.log("upcoming games ",upcomingGames)
  return (
    <SafeAreaView>
      <View style={{padding:12,backgroundColor:'#223536'}}>
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Text style={{fontSize: 16, fontWeight: '500', color: 'white'}}>Nawabganj</Text>
            <MaterialIcons name='keyboard-arrow-down' size={24} color='green'/>
          </View>
          <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Icon name='chatbox-outline' size={24} color='green'/>
            <Icon name='notifications-outline' size={24} color='green'/>
            <View>
              <Image source={{uri:'https://yt3.ggpht.com/yti/ANjgQV_IuzfYRTz8J1diWnjpzJotstJ2_SEDFWJi-I6Wf3uK6dk=s88-c-k-c0x00ffffff-no-rj'}}
              style={{width:30,height:30,borderRadius:15}}/>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center',gap: 12,marginVertical: 14}}>
          <Pressable onPress={()=>setOption("Calendar")}>
            <Text style={{fontWeight:'500',fontSize:15, color:option=='Calendar'? '#12e04c':'white'}}>Calendar</Text>
          </Pressable>
          <Pressable onPress={()=>setOption("My Sports")}>
            <Text style={{fontWeight:'500',fontSize:15, color:option=='My Sports'? '#12e04c':'white'}}>My Sports</Text>
          </Pressable>
          <Pressable onPress={()=>setOption("Other Sports")}>
            <Text style={{fontWeight:'500',fontSize:15, color:option=='Other Sports'? '#12e04c':'white'}}>Other Sports</Text>
          </Pressable>
        </View>
        <View style={{marginVertical: 7}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable style={{padding:10,borderColor:'white',marginRight:9,borderRadius:8,
              borderWidth:sport=='Badminton'? 0:1,
              backgroundColor:sport=='Badminton'?'#1dbf22':'transparent'}}
              onPress={()=>setSport("Badminton")}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>Badminton</Text>
            </Pressable>
            <Pressable style={{padding:10,borderColor:'white',marginRight:9,borderRadius:8,
              borderWidth:sport=='Basket Ball'? 0:1,
              backgroundColor:sport=='Basket Ball'?'#1dbf22':'transparent'}}
              onPress={()=>setSport("Basket Ball")}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>Basket Ball</Text>
            </Pressable>
            <Pressable style={{padding:10,borderColor:'white',marginRight:9,borderRadius:8,
              borderWidth:sport=='Volley Ball'? 0:1,
              backgroundColor:sport=='Volley Ball'?'#1dbf22':'transparent'}}
              onPress={()=>setSport("Volley Ball")}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>Volley Ball</Text>
            </Pressable >
            <Pressable style={{padding:10,borderColor:'white',marginRight:9,borderRadius:8,
              borderWidth:sport=='Footsal'? 0:1,
              backgroundColor:sport=='Footsal'?'#1dbf22':'transparent'}}
              onPress={()=>setSport("Footsal")}>
              <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>Footsal</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 12,
          backgroundColor: 'white',
        }}>
        <Pressable onPress={()=>navigation.navigate("Create")}>
          <Text style={{fontWeight: 'bold'}}>Create Game</Text>
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Filter</Text>
          </Pressable>
          <Pressable>
            <Text style={{fontWeight: 'bold'}}>Sort</Text>
          </Pressable>
        </View>
      </View>
      {
        option=="My Sports" && (
          <FlatList
          renderItem={({item}) => <Game item={item} />}
          data={games}
          contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
        )
      }
      {
        option=="Calendar" && (
          <FlatList
          renderItem={({item}) => <UpComingGames item={item} />}
          data={upcomingGames}
          contentContainerStyle={{ paddingBottom: 200 }}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
        />
        )
      }
    </SafeAreaView>
  )
}

export default PlayScreen

const styles = StyleSheet.create({})