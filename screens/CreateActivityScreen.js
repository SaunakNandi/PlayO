import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'
import moment from 'moment'
import { AuthContext } from '../AuthContext'
import axios from 'axios'
import { DataContext } from '../DataContext'
const CreateActivityScreen = () => {
    // const [timeInterval,setTimeInterval]=useState("")
    const [selected,setSelected]=useState(["Public"])
    const [modalVisible,setModalVisible]=useState(false)
    const navigation=useNavigation()
    const {userId}=useContext(AuthContext)
    const {sport,area,date,timeInterval,taggedVenue,setTimeInterval,setSport,setArea,setDate,noOfPlayers,setnoOfPlayers}=useContext(DataContext) // context API
    // Viewconsole.log(timeInterval,taggedVenue)
    const generateDates=()=>{
        const dates=[]
        for(let i=0;i<9;i++)
        {
            const date=moment().add(i,"days")
            let displayDate
            if(i==0)
                displayDate="Today"
            else if(i==1)
                displayDate="Tomorrow"
            else if(i==2)
                displayDate="Day After"
            else
                displayDate=date.format("Do MMMM")

            dates.push({
                id:i.toString(),
                displayDate,
                dayOfWeek:date.format("ddd"),
                actualDate:date.format("Do MMMM")
            })
        }
        return dates
    }
    const dates=generateDates()
    // console.log("dates ",dates)
    
    function selectDate(date)
    {   
        setModalVisible(false)
        setDate(date)
    }

    async function createGame()
    {
        const admin=userId
        const time=timeInterval
        const gameData={
            sport,
            area:taggedVenue,
            date,
            time,
            admin,
            totalPlayers:noOfPlayers
        }
        console.log(gameData)
        try {
            const response=await axios.post("http://10.0.2.2:8000/creategame",gameData)
            console.log(response)
            if(response.status==200)
            {
                //  Alert message 
                Alert.alert('Success!','Game created successfully',[
                    {
                        text:'Cancel',
                        onPress:()=>{console.log("Cancel Pressed")},
                        style:'cancel',
                    },
                    {text:'OK',onPress:()=>navigation.navigate('Main',{screen:'PLAY'})}
                ])
                setSport("")
                setArea("")
                setDate("")
                setTimeInterval("")
                setnoOfPlayers(0)
            }
        } catch (error) {
            console.log("create  game ",error)
        }
    }
  return (
    <>
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <ScrollView>
                <Ionicons name='arrow-back' size={24} color='black' onPress={()=>navigation.goBack()}
                        style={{marginHorizontal:10}}/>
                <View style={{padding:10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>Create Activity</Text>
                    <View style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
                    marginVertical: 2}}>
                        <MaterialCommunityIcons color='gray' size={24} name='whistle'/>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 17, fontWeight: '500'}}>Sport</Text>
                            <TextInput value={sport} onChangeText={setSport} style={{marginTop: 2, fontSize: 15}}
                            placeholder='Eg. - Badminton / Football / Vollyball'
                            placeholderTextColor='gray'/>
                        </View>
                        <AntDesign name='arrowright' size={24} color='gray'/>            
                    </View>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
                    <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
                    marginVertical: 2}} 
                    onPress={()=>navigation.navigate('TagVenue')}>
                        <Entypo color='gray' size={24} name='location'/>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 17, fontWeight: '500'}}>Area</Text>
                            <TextInput value={area?area:taggedVenue}
                            onChangeText={setArea} style={{marginTop: 2, fontSize: 15,color:'black'}}
                            placeholder='Locality or venue name' placeholderTextColor='gray'/>
                        </View>
                        <AntDesign name='arrowright' size={24} color='gray'/>            
                    </Pressable>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
                    <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
                    marginVertical: 2}}
                    onPress={()=>setModalVisible(true)}>
                        <Feather name='calendar' size={24} color='gray'/>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 17, fontWeight: '500'}}>Date</Text>
                            <TextInput style={{marginTop: 2, fontSize: 15,color:'black'}}
                            editable={false}
                            placeholder={date?date:'Pick a day'} placeholderTextColor={date? 'black':'gray'}/>
                        </View>
                        <AntDesign name='arrowright' size={24} color='gray'/>            
                    </Pressable>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
                    <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
                    marginVertical: 2}}
                    onPress={()=>navigation.navigate("Time")}>
                        <AntDesign name='clockcircleo' size={24} color='gray'/>
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 17, fontWeight: '500'}}>Time</Text>
                            <TextInput style={{marginTop: 2, fontSize: 15}} editable={false} 
                            placeholder={timeInterval?timeInterval:'Pick exact time'}
                            placeholderTextColor={timeInterval? 'black':'gray'}/>
                        </View>
                        <AntDesign name='arrowright' size={24} color='gray'/>
                    </Pressable>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
                    
                    <View style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 7,marginVertical: 6}}>
                        <Feather name='activity' size={24} color={'gray'}/>
                        <View style={{marginTop:10}}>
                            <Text style={{marginBottom: 10, fontSize: 15, fontWeight: '500'}}>Activity Access</Text>
                            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Pressable onPress={()=>setSelected("Public")}
                                style={selected.includes("Public")?{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                    backgroundColor: '#07bc0c',
                                    width: 140,
                                    justifyContent: 'center',
                                    borderRadius: 3,
                                    padding: 10,
                                }:{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                    backgroundColor: 'whitesmoke',
                                    width: 140,
                                    justifyContent: 'center',
                                    borderRadius: 3,
                                    padding: 10}}>
                                    <Ionicons name='earth' size={24} color={selected.includes('Public')?'white':'black'}/>
                                    <Text style={selected.includes('Public')?
                                        {color:'white',fontWeight:'bold',fontSize:15}:
                                        {color: 'black', fontWeight: 'bold', fontSize: 15}}>Public</Text>
                                </Pressable>
                                <Pressable onPress={()=>setSelected("Invite Only")}
                                style={selected.includes("Invite Only")?{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                    backgroundColor: '#07bc0c',
                                    width: 140,
                                    justifyContent: 'center',
                                    borderRadius: 3,
                                    padding: 10,
                                }:{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 8,
                                    backgroundColor: 'whitesmoke',
                                    width: 140,
                                    justifyContent: 'center',
                                    borderRadius: 3,
                                    padding: 10,
                                }}>
                                    <AntDesign name='lock1' size={24} color={selected.includes('Invite Only')?'white':'black'}/>
                                    <Text style={selected.includes('Invite Only')?
                                        {color:'white',fontWeight:'bold',fontSize:15}:
                                        {color: 'black', fontWeight: 'bold', fontSize: 15}}>Invite Only</Text>
                                </Pressable>
                            </Pressable>
                        </View>
                    </View>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1,marginTop:7}}/>
                    <Text style={{marginTop: 20, fontSize: 16}}>Total Players</Text>
                    <View style={{padding: 10,backgroundColor: '#F0F0F0',marginTop: 10,borderRadius: 6}}>
                        <View style={{marginVertical: 5}}>
                            <TextInput value={noOfPlayers} onChangeText={setnoOfPlayers}
                            style={{padding: 10,backgroundColor: 'white',borderColor: '#D0D0D0',borderWidth: 1}}
                            placeholder="Total Players (including you)"/>
                        </View>
                    </View>
                    <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1,marginTop:15}}/>
                    <Text style={{marginTop: 20, fontSize: 16}}>Add Instructions</Text>
                    <View style={{padding: 10,backgroundColor: '#F0F0F0',marginTop: 10,borderRadius: 6,}}>
                        <View style={{marginVertical: 5,flexDirection: 'row',alignItems: 'center',gap: 8}}>
                            <Ionicons name='bag-check' size={24} color='red' />
                            <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>Bring your own equipments</Text>
                            <FontAwesome name='check-square' size={24} color='green' />
                        </View>
                        <View style={{marginVertical: 5,flexDirection: 'row',alignItems: 'center',gap: 8}}>
                            <MaterialCommunityIcons name='directions-fork' size={24} color={'#FEBE10'} />
                            <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>Cost shared</Text>
                            <FontAwesome name='check-square' size={24} color='green' />
                        </View>
                        <View style={{marginVertical: 5,flexDirection: 'row',alignItems: 'center',gap: 8}}>
                            <FontAwesome5 name='syringe' size={24} color='green' />
                            <Text style={{flex: 1, fontStyle: 15, fontWeight: '500'}}>Covid vaccinated players preffered</Text>
                            <FontAwesome name='check-square' size={24} color='green' />
                        </View>
                        <TextInput style={{padding: 10,backgroundColor: 'white',borderColor: '#D0D0D0',borderWidth: 1,marginVertical:8,borderRadius:6}} placeholder="Add Additional Instructions"/>
                    </View>
                    <View style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,marginVertical: 10}}>
                        <AntDesign name='setting' size={24} color='black'/> 
                        <View style={{flex:1}}>
                            <Text style={{fontSize: 17, fontWeight: '500'}}>Advanced setting</Text>
                        </View>   
                        <AntDesign name='arrowright' size={24} color='gray'/> 

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

        <Pressable onPress={()=>createGame()}
        style={{backgroundColor: '#07bc0c',marginTop: 'auto',marginBottom: 30,padding: 12,marginHorizontal: 10,
        borderRadius: 4}}>
            <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500'}}>
            Create Activity
            </Text>
        </Pressable>
        <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)} // ✅ dismiss when touch outside
        onBackButtonPress={() => setModalVisible(false)} // ✅ hardware back button
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        animationIn="slideInUp"     // 💥 Slide from bottom
        animationOut="slideOutDown"
        animationOutTiming={900}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        >
        <View style={{ width: '100%', height: 320, backgroundColor: 'white', borderTopLeftRadius: 15, borderTopRightRadius: 15, padding: 16 }}>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                Choose date/ time to rehost
            </Text>
            <View style={{flexDirection: 'row',alignItems: 'center',gap: 15,flexWrap: 'wrap',marginVertical: 20,
            justifyContent: 'space-between'}}>
            {dates?.map((item, i) => (
                <Pressable key={i}
                style={{padding: 10,borderRadius: 10,borderColor: '#E0E0E0',borderWidth: 1,width: '30%',justifyContent: 'center',alignItems: 'center'}}
                onPress={() => selectDate(item?.actualDate)}>
                    <Text>{item?.displayDate}</Text>
                    <Text style={{ color: 'gray', marginTop: 8 }}>{item?.dayOfWeek}</Text>
                </Pressable>
            ))}
            </View>
        </View>
    </Modal>
    </>
  )
}

export default CreateActivityScreen

const styles = StyleSheet.create({})