import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import moment from 'moment'

const Dates = ({date,setSelectedTime,onSelectedDate,selected}) => {
    console.log(setSelectedTime)
    console.log("dates ",moment().format('YYYY-MM-DD'))
    const day=moment(date).format('YYYY-MM-DD')===moment().format('YYYY-MM-DD')?"Today":moment(date).format("ddd")
    const dayNumber=moment(date).format('D')
    const fullDate=moment(date).format('YYYY-MM-DD')
  return (
    <TouchableOpacity style={[style.card,selected === fullDate && { backgroundColor: "#07bc0c" }]}
    onPress={()=>{
        setSelectedTime([])
        onSelectedDate(fullDate)
    }}>
      <Text style={[style.big,selected==fullDate && {color:"white"}]}>{day}</Text>
      <View style={{height:10}}/>
      <Text style={[style.medium,selected==fullDate && {color:"white",fontWeight:'bold',fontSize:24}]}>{dayNumber}</Text>
    </TouchableOpacity>
  )
}

export default Dates

const style = StyleSheet.create({
    card: {
        backgroundColor: "#e0e0e0",
    
        borderRadius: 10,
        borderColor: "#ddd",
        padding: 10,
        marginVertical: 10,
        alignItems: "center",
        height: 90,
        width: 80,
        marginHorizontal: 5,
      },
      big: {
        fontWeight: "bold",
        fontSize: 20,
      },
      medium: {
        fontSize: 24,
        fontWeight: "bold",
      },
      
})