import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useNavigation} from '@react-navigation/native';
const Game = ({item}) => {
    const navigation=useNavigation()
    console.log("item",item)
  return (
    <Pressable style={{marginVertical: 10,marginHorizontal: 14,padding: 14,backgroundColor: 'white',borderRadius: 10}}
        onPress={()=>navigation.navigate('Game',{item})}>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={{color:'gray',fontWeight:'bold'}}>{item.sport}</Text>
              <Feather name="bookmark" size={24} color="black"/>
          </View>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 56, height: 56, borderRadius: 28}} source={{uri: item?.adminUrl}}/>
                    <View style={{flexDirection: 'row',alignItems: 'center',marginLeft: -7}}>
                        {
                            item?.players?.filter(x=>x?.name!=item?.adminName).map((player)=>(
                            <Image source={{uri:player?.imageUrl}} style={{width: 44,height: 44,borderRadius: 22,
                                marginLeft: -7}}/>
                        ))}
                    </View>
                </View>
                <View style={{marginLeft: 10, flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>• {item?.players.length}/{item?.totalPlayers} Going</Text>
                </View>
                <View style={{paddingHorizontal: 10,paddingVertical: 6,backgroundColor: '#fffbde',borderRadius: 8,borderColor: '#EEDC82',borderWidth: 1}}>
                    <Text style={{fontWeight: '500'}}>Only {item?.totalPlayers - item?.players.length} Slots left</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                <View>
                    <Text style={{marginTop: 10, color: 'gray', fontSize: 15}}>{item?.adminName} | 321 Karma | On Fire</Text>
                    <Text style={{marginTop: 10, fontSize: 14, fontWeight: '500'}}>{item?.date}, {item?.time}</Text>
                </View>
            </View>
            {
                item?.matchFull && (
                    <Image style={{width: 100, height: 70, resizeMode: 'contain'}}
                    source={{uri: 'https://playo.co/_next/image?url=https%3A%2F%2Fplayo-website.gumlet.io%2Fplayo-website-v3%2Fmatch_full.png&w=256&q=75',
                    }}/>
                )
            }
          </View>
          <View style={{marginTop: 10,flexDirection: 'row',alignItems: 'center',gap: 7,}}>
            <SimpleLineIcons name="location-pin" size={20} color="black" />
            <Text style={{fontSize: 15, flex: 1}} numberOfLines={1} ellipsizeMode="tail">{item?.area}</Text>
          </View>
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',}}>
            <View style={{backgroundColor: '#E0E0E0',paddingHorizontal: 10,paddingVertical: 6,borderRadius: 7,marginTop: 12,alignSelf: 'flex-start', // This line ensures the width is based on the content
                }}>
                <Text style={{fontSize: 13, fontWeight: '400'}}>
                Intermediate to Advanced
                </Text>
            </View>
          </View>
    </Pressable>
  )
}

export default Game

const styles = StyleSheet.create({})