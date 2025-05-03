import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthContext } from '../AuthContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import axios from 'axios'

const PaymentScreen = () => {
  const navigation=useNavigation()
  const route=useRoute()
  const {userId}=useContext(AuthContext)
  const total=(parseFloat(route?.params?.price) || 0) + 8.8

  const courtNumber=route.params.selectedCourt
  const date=route.params?.selectedDate
  const time=route.params.selectedTime
  const name=route.params.place
  const game=route.params.gameId
  
  console.log(courtNumber)

  // booking the slot and updating the Game schema
  const bookSlot=async()=>{
    try {
      const response=await axios.post('http://10.0.2.2:8000/book',{courtNumber,date,time,name,game,userId})
      if(response.status==200)
        navigation.replace("Main")
      else
        alert(`Booking failed ${response.data.message}`)
    } catch (error) {
      console.log("Error at payment",error)
    }
  }
  return (
    <>
      <ScrollView style={{marginTop:50}}>
        <View style={{padding:10}}>
          <Text style={{ fontSize: 23, fontWeight: "500", color: "green" }}>
              {route.params.selectedSport}
          </Text>
          <View
            style={{
              borderColor: "#E0E0E0",
              borderWidth: 1,
              padding: 10,
              marginTop: 10,
              borderRadius: 6,
              shadowColor: "#171717",
              shadowOffset: { width: -1, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}>
              <View>
                <View style={{marginVertical: 3,flexDirection: "row",alignItems: "center",gap: 7}}>
                  <MaterialCommunityIcons color='gray' size={24} name='fireplace-off'/>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>{route.params.selectedCourt}</Text>
                </View>
                <View style={{marginVertical: 3,flexDirection: "row",alignItems: "center",gap: 7,}}>
                  <Feather name="calendar" size={24} color="black"/>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>{route.params.selectedDate}</Text>
                </View>
                <View style={{marginVertical: 3,flexDirection: "row",alignItems: "center",gap: 7}}>
                  <Feather name="clock" size={20} color="black" />
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>{route.params.selectedTime}</Text>
                </View>
                <View style={{marginVertical: 3,flexDirection: "row",alignItems: "center",gap: 7}}>
                  <MaterialCommunityIcons
                    name="currency-rupee"
                    size={20}
                    color="black"/>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    INR {route.params.price}
                  </Text>
                </View>
              </View>
          </View>
          <View style={{marginTop: 15,marginHorizontal: 15 }}>
            <View style={{flexDirection: "row",alignItems: "center",gap: 7,justifyContent: "space-between",marginBottom:5}}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Text>Court Price</Text>
                <EvilIcons name="question" size={24} color="black" />
              </View>
              <Text>INR {route?.params?.price}</Text>
            </View>
            <View style={{flexDirection: "row",alignItems: "center",gap: 7,justifyContent: "space-between"}}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Text>Convenience Fee</Text>
                <EvilIcons name="question" size={24} color="black" />
              </View>
              <Text>INR 10</Text>
            </View>
          </View>
          <Text style={{height: 1,borderColor: "#E0E0E0",borderWidth: 3,marginTop: 20}}/>

          <View style={{marginHorizontal: 15,marginTop: 10,flexDirection: "row",alignItems: "center",
          justifyContent: "space-between",
          }}>
            <Text>Total amount</Text>
            <Text>{total}</Text>
          </View>
          <View style={{marginHorizontal: 15,marginTop: 10,flexDirection: "row",alignItems: "center",
          justifyContent: "space-between",
          }}>
            <Text>Total amount</Text>
            <Text>To be paid at venue</Text>
          </View>
          <Text style={{height: 1,borderColor: "#E0E0E0",borderWidth: 3,marginTop: 20}}/>
          <View style={{ marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>
          <Image
            style={{ width: 100, height: 80, resizeMode: "contain" }}
            source={{
              uri: "https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v2%2FLogo%2Bwith%2BTrademark_Filled.png%3Fq%3D20%26format%3Dauto&w=3840&q=75",
            }}
          />
        </View>
        </View>
      </ScrollView>

      <Pressable onPress={bookSlot}
        style={{backgroundColor: "#32CD32",padding: 15,marginBottom: 30,borderRadius: 6,marginHorizontal: 15,flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>INR {total}</Text>
        <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>Book venue</Text>
      </Pressable>
    </>
  )
}

export default PaymentScreen