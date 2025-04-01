import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'

const StartScreen = () => {
  const mapView=useRef(null)
  const users = [
    {
      image:
        'https://images.pexels.com/photos/7208625/pexels-photo-7208625.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '1',
      latitude: '13.1295',
      longitude: '79.5977',
      name: 'sujan',
      description: 'Hey!',
    },
    {
      image:
        'https://images.pexels.com/photos/2913125/pexels-photo-2913125.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '2',
      latitude: '13.155',
      longitude: '77.6070',
      name: 'suhas',
      description: "let's play",
    },
    {
      image:
        'https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '3',
      latitude: '13.0977',
      longitude: '77.5839',
      name: 'ashish',
      description: "I'm always",
    },
    {
      image:
        'https://images.pexels.com/photos/4307678/pexels-photo-4307678.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '4',
      latitude: '13.0490',
      longitude: '77.5936',
      name: 'abhi',
      description: 'At 8pm?',
    },
    {
      image:
        'https://images.pexels.com/photos/1379031/pexels-photo-1379031.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '5',
      latitude: '13.0623',
      longitude: '77.5871',
      name: 'akash',
      description: 'Hey!',
    },
    {
      image:
        'https://images.pexels.com/photos/3264235/pexels-photo-3264235.jpeg?auto=compress&cs=tinysrgb&w=800',
      id: '6',
      latitude: '13.0354',
      longitude: '77.5988',
      name: 'Preetham',
      description: 'What up?',
    },
  ];
  const BANGALORE_COORDS={
    latitude: 12.9916987,
    longitude: 77.5945627,
  }
  const  generateCircularPoints=(center,radius,numPoints)=>{
    const points=[]
    const angleStep=(2*Math.PI)/numPoints
    for(let i=0;i<numPoints;i++)
    {
      const angle=i*angleStep
      const latitude=center.latitude + (radius/111) * Math.cos(angle)
      const longitude=center.longitude + (radius/(111 * Math.cos(center.latitude))) * Math.sin(angle)
      points.push({latitude,longitude})
    }
    return points
  }
  const numPoints=6
  const radius=5
  const circularPoints=generateCircularPoints(BANGALORE_COORDS,radius,numPoints)

  useEffect(()=>{
    mapView.current.fitToCoordinates(circularPoints,{
      edgePadding:{
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      }
    })
  },[])
  return (
    <SafeAreaView >
      <MapView ref={mapView} style={{width:'100%',height:400}}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        {
          circularPoints?.map((point,index)=>{
            const user=users[index%users.length] // cycle thorugh users if more points than the user
            console.log('user',user)
            return (
              <Marker key={index} coordinate={point}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri:user?.image}} style={{width: 50,height: 50,resizeMode: 'cover',borderRadius: 5}}/>
                </View>
              </Marker>
            )
          })
        }
      </MapView>
    </SafeAreaView>
  )
}

export default StartScreen

const styles = StyleSheet.create({})