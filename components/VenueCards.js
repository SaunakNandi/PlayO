import { Pressable, StyleSheet, Image, View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'

const VenueCards = ({item}) => {
    const navigation=useNavigation()
  return (
    <View style={{margin: 15}}>
      <Pressable style={{backgroundColor: 'white',borderRadius: 5,borderTopLeftRadius: 10,borderTopRightRadius: 10,
        }}
        onPress={()=>navigation.navigate('Venue',{
            name:item.name,
            image:item.newImage,
            sportsAvailable:item.sportsAvailable,
            rating:item.rating,
            timings:item.timings,
            address:item.address,
            location:item.location,
            bookings:item.bookings
        })}>
        <View>
            <Image style={{ width: '100%',height: 200,borderTopLeftRadius: 10,borderTopRightRadius: 10}} 
            source={{uri:item?.image}}/>
        </View>
        <View style={{paddingVertical: 12, paddingHorizontal: 10}}>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',
            }}>
                <Text style={{fontSize: 15, fontWeight: '500'}}>{item?.name.length>40? item?.name?.substring(0,40) + "...":item?.name}</Text>
                <View style={{flexDirection: 'row',alignItems: 'center',gap: 6,backgroundColor: 'green',padding: 6,borderRadius: 6,}}>
                    <AntDesign name='star' size={24} color='white'/>
                    <Text style={{color:"white",fontWeight:"bold"}}>{item?.rating}</Text>
                </View>
            </View>
            <Text style={{color: 'gray'}}>{item?.address.length>40? item?.address?.substring(0,40)+'...':item?.address}</Text>
            <View style={{height: 20,borderWidth: 0.6,borderColor: '#E0E0E0',marginVertical: 10}}>
              <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                  <Text>Upto 10%off</Text>
                  <Text style={{fontWeight: '500'}}>INR 250 Onwards</Text>
              </View>
            </View>
        </View>
      </Pressable>
    </View>
  )
}

export default VenueCards

const styles = StyleSheet.create({})