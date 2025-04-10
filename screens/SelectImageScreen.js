import { Image, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../RegistrationUtils'

const SelectImageScreen = () => {
  const [image,setImage]=useState()
  const navigation=useNavigation()
  const images = [
    {
      id: '0',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683469.png',
    },
    {
      id: '1',
      image: 'https://cdn-icons-png.flaticon.com/128/16683/16683439.png',
    },
    {
      id: '2',
      image: 'https://cdn-icons-png.flaticon.com/128/4202/4202835.png',
    },
    {
      id: '3',
      image: 'https://cdn-icons-png.flaticon.com/128/3079/3079652.png',
    },
  ];

  useEffect(()=>{
    getRegistrationProgress('Image').then(progressData=>{
      if(progressData)
        setImage(progressData.image || '')
    })
  },[])
  const saveImage=()=>{
    if(image.trim()!=='')
      saveRegistrationProgress('Image',{image})
    navigation.navigate("PreFinal")
  }
  return (
    <>
      <SafeAreaView>
        <View>
          <Ionicons name='arrow-back' size={24} color='black' onPress={()=>navigation.goBack()}/>
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 15}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Complete your profile</Text>
          <Text style={{marginTop: 10, color: 'gray'}}>What you will like you mates to call you?</Text>
        </View>
        <View style={{marginVertical: 25}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri:image? image:images[0]?.image}} 
            style={{width: 100,height: 100,borderRadius: 50,borderColor: 'green',borderWidth: 2,resizeMode: 'cover',
            }}/>
          </View>
          <View style={{flexDirection:'row',alignItems:'center',marginVertical:25,justifyContent:'center'}}>
            {
              images.map((item,i)=>(
                <Pressable style={{margin: 10, gap: 10}}
                key={i} onPress={()=>setImage(item?.image)}>
                  <Image style={{width: 70,height: 70,borderWidth: 2,borderRadius: 35,borderColor:image == item?.image ? 'green' : 'transparent',resizeMode: 'contain',
                    }}
                    source={{uri:item?.image}}/>
                </Pressable>
              ))
            }
          </View>
          <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>OR</Text>
          <View style={{marginHorizontal: 20, marginVertical: 20}}>
            <Text>Enter Image Link</Text>
            <TextInput value={image} onChangeText={setImage} 
            style={{padding:10,borderColor:'#D0D0D0',borderWidth: 1,borderRadius: 10,marginTop: 10}}/>
          </View>
        </View>
      </SafeAreaView>
      <Pressable  style={{backgroundColor: '#07bc0c',marginTop: 'auto',marginBottom: 30,padding: 12,marginHorizontal: 10,borderRadius: 4}} onPress={saveImage}>
        <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500'}}>Next</Text>
      </Pressable>
    </>
  )
}

export default SelectImageScreen

const styles = StyleSheet.create({})