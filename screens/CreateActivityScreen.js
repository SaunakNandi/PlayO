import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
const CreateActivityScreen = () => {
    const [sport,setSport]=useState("")
    const [area,setArea]=useState("")
    const [date,setDate]=useState("")
    const [timeInterval,setTimeInterval]=useState("")
    const [selected,setSelected]=useState(["Public"])
    const [noOfPlayers,setnoOfPlayers]=useState(0)
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <ScrollView>
        <View style={{marginHorizontal: 10}}>
            <Ionicons name='arrow-back' size={24} color='black' onPress={()=>navigation.goBack()}/>
        </View>
        <View style={{padding:10}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Create Activity</Text>
            <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
            marginVertical: 2}}>
                <MaterialCommunityIcons color='gray' size={24} name='whistle'/>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 17, fontWeight: '500'}}>Sport</Text>
                    <TextInput value={sport} onChangeText={setSport} style={{marginTop: 2, fontSize: 15}}
                    placeholder='Eg. - Badminton / Football / Vollyball'
                    placeholderTextColor='gray'/>
                </View>
                <AntDesign name='arrowright' size={24} color='gray'/>            
                </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
            <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
            marginVertical: 2}}>
                <Entypo color='gray' size={24} name='location'/>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 17, fontWeight: '500'}}>Area</Text>
                    <TextInput value={area} onChangeText={setArea} style={{marginTop: 2, fontSize: 15,color:'black'}}
                    placeholder='Locality or venue name'
                    placeholderTextColor='gray'/>
                </View>
                <AntDesign name='arrowright' size={24} color='gray'/>            
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
            <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
            marginVertical: 2}}>
                <Feather name='calendar' size={24} color='gray'/>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 17, fontWeight: '500'}}>Date</Text>
                    <TextInput style={{marginTop: 2, fontSize: 15,color:'black'}}
                    editable={false}
                    placeholder={date?date:'Pick a day'}
                    placeholderTextColor={date? 'black':'gray'}/>
                </View>
                <AntDesign name='arrowright' size={24} color='gray'/>            
            </Pressable>
            <Text style={{borderColor: '#E0E0E0', borderWidth: 0.7, height: 1}}/>
            <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,marginTop: 15,
            marginVertical: 2}}>
                <AntDesign name='clockcircleo' size={24} color='gray'/>
                <View style={{flex:1}}>
                    <Text style={{fontSize: 17, fontWeight: '500'}}>Time</Text>
                    <TextInput style={{marginTop: 2, fontSize: 15}}
                    editable={false}
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
                            padding: 10,
                        }}>
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
                    <View>
                        <TextInput value={noOfPlayers} onChangeText={setnoOfPlayers}
                        style={{padding: 10,backgroundColor: 'white',borderColor: '#D0D0D0',borderWidth: 1}}
                          placeholder="Total Players (including you)"/>
                    </View>
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
  )
}

export default CreateActivityScreen

const styles = StyleSheet.create({})