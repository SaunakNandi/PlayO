import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native'
import React, { useState,useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import Calendar from './Calendar'
import moment from 'moment'

const SlotScreen = () => {
    const route=useRoute()
    const navigation=useNavigation()
    console.log(route?.params?.sports)
    const today=moment().format("YYYY-MM-DD")
    const [selectedSport,setSelectedSport]=useState(route?.params?.sports[0].name)
    const [selectedDate,setSelectedDate]=useState(today)
    const [selectedTime,setSelectedTime]=useState([])
    const [selectedCourt,setSelectedCourt]=useState([])
    const [duration,setDuration]=useState(60)
    const [times, setTimes] = useState([]);
    const [checkedTimes,setCheckedTimes]=useState()
    const time=route?.params?.slot

    const calculateEndTime=(startTime)=>{
        if(typeof startTime!=="string")
        {
            // Check if startTime is defined and is a string
            if (typeof startTime !== 'string') {
                console.error('Invalid startTime:', startTime);
                return;
            }
            console.log('Start time', startTime);
            const match = startTime.match(/(\d+:\d+)([APMapm]+)/);
            if (!match) {
                console.error('Invalid startTime format:', startTime);
                return;
            }
            const time=match[1]
            const modifier=match[2].toUpperCase()
            console.log(time)
            console.log('modifier',modifier)

            let [hours,minutes]=time.split(':')
            hours=parseInt(hours,10)
            minutes=parseInt(minutes,10)

            // handling 24 hours format
            if(modifier=='PM' && hours<12) hours+=12;
            if(modifier=='AM' && hours==12) hours=0;

            const totalMinutes= hours*60 + minutes + duration
            let endHours=Math.floor(totalMinutes/60)
            let endMinutes=totalMinutes%60
            let endModifier=''

            if(endHours>=24)
            {
                endHours-=24;
                endModifier='AM'
            }
            if(endHours>=12)
            {
                endModifier='PM'
                if(endHours>12)
                    endHours-=12;
            }
            if (endHours === 0) {
                endHours = 12;
                endModifier = 'AM';
            }
        
            const formattedEndHours = endHours.toString().padStart(2, '0');
            const formattedEndMinutes = endMinutes.toString().padStart(2, '0');
        
            return `${formattedEndHours}:${formattedEndMinutes} ${endModifier}`;
        }
    }
    const isSlotBooked = (time) => {
        return route?.params?.bookings.some((booking) => {
          // Check if the booking is on the selected date
          if (booking.date !== selectedDate) return false;
      
          // Extract the start and end times from the booking time range
          const [startTime, endTime] = booking.time.split(' - ');
      
          // Get the hour portion of the times to compare
          let chosenHour = parseInt(time.split(':')[0], 10);
          let startHour = parseInt(startTime.split(':')[0], 10);
          let endHour = parseInt(endTime.split(':')[0], 10);
      
          // Convert times to lowercase for consistent AM/PM checks
          const lowerStartTime = startTime.toLowerCase();
          const lowerEndTime = endTime.toLowerCase();
          const lowerChosenTime = time.toLowerCase();
    
          console.log("lower",lowerChosenTime)
          console.log("hihger",lowerEndTime)
      
          // Handle AM/PM for the start time
          if (lowerStartTime.includes('pm') && startHour < 12) startHour += 12;
          if (lowerStartTime.includes('am') && startHour === 12) startHour = 0;
      
          // Handle AM/PM for the end time
          if (lowerEndTime.includes('pm') && endHour < 12) endHour += 12;
          if (lowerEndTime.includes('am') && endHour === 12) endHour = 0;
      
          // Handle AM/PM for the chosen time
          if (lowerChosenTime.includes('pm') && chosenHour < 12) chosenHour += 12;
          if (lowerChosenTime.includes('am') && chosenHour === 12) chosenHour = 0;
      
          return chosenHour >= startHour && chosenHour < endHour;
        });
      };
    
      const courts=route?.params?.sports.filter(item=>item.name==selectedSport)
    const checkTime = () => {
        const currentDateTime = moment(); // Current date and time
        const selectedDateStart = moment(selectedDate).startOf('day'); // Start of the selected date
  
        const time = times.map(item => {
          // Combine the selected date with the current time slot to create a full date-time
          const dateTime = moment(selectedDateStart).set({
            hour: moment(item, 'h:mma').get('hour'),
            minute: moment(item, 'h:mma').get('minute'),
          });
  
          // Determine if the time slot is in the past or future
          const status = currentDateTime.isBefore(dateTime);
          return {time: item, status: status};
        });
  
        setCheckedTimes(time);
    };
    
    const handleTimePress = (time) => {
        if (isSlotBooked(time)) {
          Alert.alert('Slot Already Booked', 'This time slot is already booked.');
        } else {
          setSelectedTime(time);
        }
      };

    const generateTimes=()=>{
        const start = moment(selectedDate).startOf('day').add(6, 'hours'); // start at 6:00 am
        const end = moment(selectedDate).endOf('day');
        const interval = 60; // interval in minutes

        const result = [];
        let current = moment(start);
        while (current <= end) {
            result.push(current.format('h:mma'));
            current.add(interval, 'minutes');
        }
        setTimes(result);
    }
    useEffect(()=>{
        generateTimes()
        checkTime()
    },[])

    const [price]=route?.params?.sports.filter(item=>item?.name==selectedSport).map(item=>item.price) //A single value (the first item of the resulting array)
  return (
    <>
         <SafeAreaView style={{flex: 1,paddingTop: 35}}>
            <ScrollView>
                <View style={{padding: 10,flexDirection: 'row',alignItems: 'center',gap: 10,}}>
                    <Ionicons onPress={() => navigation.goBack()}
                    name="arrow-back-outline" size={25} color="black"/>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>{route?.params?.place}</Text>
                </View>
                <ScrollView contentContainerStyle={{marginLeft:'auto'}}
                showsHorizontalScrollIndicator={false}
                horizontal>
                    {route?.params?.sports?.map((item,index)=>(
                        <View key={index}>
                            {
                                selectedSport?.includes(item?.name)?(
                                    <View style={{borderColor: 'green',margin: 10,padding: 20,width: 80,height: 90,borderWidth: 3,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
                                        <MaterialCommunityIcons
                                            style={{ textAlign: 'center' }}
                                            name={item.icon}
                                            size={24}
                                            color="gray"
                                        />
                                        <Text style={{fontSize: 10,fontWeight: 'bold',width: 80,textTransform: 'uppercase',textAlign: 'center',marginTop: 10,}}>
                                            {item.name}
                                        </Text>
                                    </View>
                                ):(
                                    <Pressable onPress={() => {
                                                setSelectedSport(item.name);
                                                setSelectedCourt([]); }}
                                    style={{borderColor: '#686868',margin: 10,padding: 20,width: 80,height: 90,borderWidth: 1,borderRadius: 5,justifyContent: 'center',alignItems: 'center'}}>
                                        <MaterialCommunityIcons
                                            style={{ textAlign: 'center' }}
                                            name={item.icon}
                                            size={24}
                                            color="gray"
                                        />
                                        <Text style={{fontSize: 10,fontWeight: 'bold',width: 80,textTransform: 'uppercase',textAlign: 'center',marginTop: 10,
                                            }}>
                                            {item.name}
                                        </Text>
                                    </Pressable>
                                    )
                            }
                        </View>
                    ))}
                </ScrollView>
                {selectedSport && (
                    <ScrollView>
                        <Calendar selected={selectedDate} selectedSport={selectedSport} onSelectedDate={setSelectedDate}
                        onSelectedTime={setSelectedTime}/>
                    </ScrollView>
                )}
                <Pressable style={{flexDirection: 'row',alignItems: 'center',gap: 20,width: '100%',margin: 10,}}>

                    {/*  If you are comming through bookscreen you will get start time and end time */}
                    <Pressable style={{borderColor: '#E0E0E0',borderWidth: 1,paddingVertical: 15,paddingHorizontal: 60,flex: 1,}}>
                        <Text style={{fontSize: 13, fontWeight: '400', textAlign: 'center'}}>Time</Text>
                        <Text  style={{fontSize: 16,fontWeight: '400',textAlign: 'center',marginTop: 8}}>
                            {route?.params?.startTime ? route?.params?.startTime : selectedTime.length>0 ? selectedTime:"Choose Time"}
                        </Text>
                    </Pressable>
                    <Pressable style={{borderColor: '#E0E0E0',borderWidth: 1,paddingVertical: 15,paddingHorizontal: 60,flex: 1,}}>
                        <Text style={{fontSize: 13, fontWeight: '400', textAlign: 'center'}}>Time</Text>
                        <Text  style={{fontSize: 16,fontWeight: '400',textAlign: 'center',marginTop: 8}}>
                            {route?.params?.endTime ? route?.params?.endTime : selectedTime.length>0 ? 
                            calculateEndTime(selectedTime // ,duration
                            ):"Choose Time"}
                        </Text>
                    </Pressable>
                </Pressable>
                <Text style={{textAlign: 'center',fontSize: 16,fontWeight: '500',marginTop:12}}>Duration</Text>
                    <Pressable style={{gap: 15,flexDirection: 'row',alignItems: 'center',justifyContent: 'center',marginTop: 10}}>
                        <Pressable onPress={() => setDuration(Math.max(60, duration - 60))}
                            style={{width: 26,height: 26,borderRadius: 13,borderColor: 'gray',borderWidth: 2,alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>
                                -
                            </Text>
                        </Pressable>
                        <Text
                            style={{ textAlign: 'center', fontSize: 16, fontWeight: '500' }}>
                            {duration} min
                        </Text>
                        <Pressable onPress={() => setDuration(duration + 60)}
                            style={{width: 26,height: 26,borderRadius: 13,borderColor: 'gray',borderWidth: 2,alignItems: 'center',justifyContent: 'center'}}>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '600' }}>
                                +
                            </Text>
                        </Pressable>
                    </Pressable>
                    {/* {console.log(checkedTimes)} */}
                    <Text style={{textAlign: 'center',marginVertical: 10,fontSize: 16,fontWeight: '500'}}>Select Slot</Text>
                    {
                        selectedSport && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{amrginHorizontal:10}}>
                                {
                                    checkedTimes?.map((item,i)=>{
                                        const disabled=isSlotBooked(item?.time)
                                        
                                        return (
                                            <View>
                                                {selectedTime.includes(item.time) ? (
                                                    <Pressable
                                                        disabled={item.status === false || disabled}
                                                        onPress={() => {
                                                            console.log("holaa", item?.time)
                                                            setSelectedTime(item.time);
                                                        }}
                                                        style={{margin: 10,borderColor: '#1CAC78',backgroundColor: '#29AB87',borderRadius: 5,borderWidth: 1,padding: 10}}>
                                                        <Text
                                                            style={{
                                                                fontSize: 15,
                                                                fontWeight: 'bold',
                                                                color: 'pink',
                                                            }}>
                                                            {item.time}
                                                        </Text>
                                                    </Pressable>
                                                ) : (
                                                    <Pressable

                                                        disabled={item.status === false}
                                                        onPress={() => handleTimePress(item.time)}
                                                        // onPress={() => setSelectedTime(item.time)}
                                                        style={{margin: 10,
                                                            borderColor:item.status === false || disabled ? 'gray' : '#1CAC78',borderRadius: 5,borderWidth: 1,padding: 10,
                                                        }}>
                                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                            {item.time}
                                                        </Text>
                                                    </Pressable>
                                                )}
                                            </View>
                                        )
                                    })
                                }
                            </ScrollView>
                        )
                    }
                    {console.log(courts)}
                <View style={{ marginHorizontal: 10,  marginBottom:25}}>
                    <View
                        style={{flexDirection: 'row',alignItems: 'center',flexWrap: 'wrap'}}>
                        {courts.map(item =>
                            item.courts.map(court =>
                                    selectedCourt.includes(court.name) ? (
                                        <Pressable
                                            onPress={() => setSelectedCourt(court.name)}
                                            style={{backgroundColor: '#00A86B',borderRadius: 6,padding: 15,width: 160,margin: 10,
                                            }}>
                                            <Text style={{ textAlign: 'center', color: 'white' }}>
                                                {court.name}
                                            </Text>
                                        </Pressable>
                                    ) : (
                                        <Pressable
                                            onPress={() => setSelectedCourt(court.name)}
                                            style={{borderColor: '#00A86B',borderRadius: 6,padding: 15,borderWidth: 1,width: 160,margin: 10}}>
                                            <Text style={{ textAlign: 'center', color: '#00A86B' }}>
                                                {court.name}
                                            </Text>
                                        </Pressable>
                                ),
                            ),
                        )}
                    </View>
                    {
                        selectedCourt.length>0 && (
                            <Text style={{textAlign: 'center',marginTop: 10,marginBottom: 20,fontSize: 15,fontWeight: '500'}}>
                                Court Price : Rs {price}
                            </Text>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
        
        {/* Time  to book the slot */}
        <Pressable style={{backgroundColor: '#32CD32',padding: 15,marginBottom: 30,borderRadius: 3,marginHorizontal: 15}}
        onPress={()=>navigation.navigate('Payment',{
            selectedCourt,
            selectedSport,
            price,
            selectedTime:time,
            selectedDate,
            place:route.params.place,
            gameId:route?.params?.gameId
        })}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Next</Text>
        </Pressable>
    </>
  )
}

export default SlotScreen