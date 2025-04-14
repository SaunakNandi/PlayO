import { View, Text, Pressable, Button, StyleSheet } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { DataContext } from '../DataContext'
const SelectTimeScreen = () => {
    const navigation=useNavigation()
    // const [time,setTime]=useState("")
    const [startTime,setStartTime]=useState("")
    // const [endTime,setEndTime]=useState("")
    const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
    const {setTimeInterval}=useContext(DataContext)
    
    const times = [
        {
          id: '0',
          type: 'morning',
          timings: '12 am - 9 am',
          icon: <Ionicons name="partly-sunny-outline" size={24} color="black" />,
        },
        {
          id: '1',
          type: 'Day',
          timings: '9 am - 4 pm',
          icon: <Feather name="sun" size={24} color="black" />,
        },
        {
          id: '2',
          type: 'evening',
          timings: '4pm - 9 pm',
          icon: <Feather name="sunset" size={24} color="black" />,
        },
        {
          id: '3',
          type: 'night',
          timings: '9pm - 11 pm',
          icon: <Ionicons name="cloudy-night-outline" size={24} color="black" />,
        },
      ];
    function showStartTimePicker(){
        setIsStartTimePickerVisible(true)
    }
    function showEndTimePicker(){
        setIsEndTimePickerVisible(true)
    }
    function hideStartTimePicker(){
        setIsStartTimePickerVisible(false)
    }
    const handleConfirmStartTime=(time)=>{
        setStartTime(time)
        hideStartTimePicker()
    }
    const hideEndTimePicker=()=>{
        setIsEndTimePickerVisible(false)
    }
    const formatTime = (time) => {
        if (!time) return 'Select Time';
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };
    const handleConfirmEndTime=(time)=>{
      // We are returning to previous page so no need of this operation
        // setEndTime(time)
        // hideEndTimePicker()

        // console.log(time.getHours()+" "+time.getMinutes() ,startTime.getHours()+" "+time.getMinutes())
        // if(time.getHours()<startTime.getHours()) return
        // else if(time.getHours()==startTime.getHours() && time.getMinutes<=startTime.getMinutes()) return
        
        // Navigate back to CreateActivityScreen
        if(startTime)
        {
            const formattedStartTime=formatTime(startTime)
            const formattedEndTime=formatTime(time)
            const timeInterval=`${formattedStartTime} - ${formattedEndTime}`
            setTimeInterval(timeInterval)
            navigation.navigate("Create",{timeInterval})
        }
    }
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            title:'Select Suitable Time',
            headerTitleStyles:{
                fontSize:20,
                fontWeight:'bold'
            }
        })
    })
      
  return (
    <View>
        <Pressable style={{flexDirection: 'row',alignItems: 'center',flexWrap: 'wrap',marginLeft: 'auto',marginRight: 'auto'}}>
            {
                times?.map((item)=>(
                    <Pressable style={{backgroundColor: 'white',margin: 20,width: 160,height: 120,borderRadius: 5,alignItems: 'center',justifyContent: 'center',gap: 15,elevation: 1,borderRadius: 3}}>
                        {item.icon}
                        <Text>{item?.type}</Text>
                        <Text>{item?.timings}</Text>
                    </Pressable>
                ))
            }
        </Pressable>
        <View style={styles.container}>
            <View style={styles.timeContainer}>
                <Text style={styles.label}>Start Time: </Text>
                <Button title={formatTime(startTime)} onPress={showStartTimePicker}/>
                <DateTimePickerModal isVisible={isStartTimePickerVisible} mode="time"
                onConfirm={handleConfirmStartTime} onCancel={hideStartTimePicker} is24Hour={false}/>
            </View>
            <View style={styles.timeContainer}>
                <Text style={styles.label}>End Time: </Text>
                <Button title={"Select Time"} onPress={showEndTimePicker} disabled={!startTime}/>
                <DateTimePickerModal isVisible={isEndTimePickerVisible} mode="time"
                onConfirm={handleConfirmEndTime} onCancel={hideEndTimePicker} is24Hour={false}/>
            </View>
        </View>
    </View>
  )
}

export default SelectTimeScreen

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    timeContainer: {
      marginBottom: 16,
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    summaryContainer: {
      marginTop: 32,
      alignItems: 'center',
    },
    summaryText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });