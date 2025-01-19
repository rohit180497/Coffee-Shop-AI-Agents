import { Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef} from 'react'
import PageHeader from '@/components/PageHeader'
import { MessageInterface } from '@/types/types'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'


const ChatRoom = () => {

  const [messages, setMessages] = useState<MessageInterface[]>([])
  const textRef = useRef('')
  const inputRef = useRef<TextInput>(null)
  const handleSendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return;
    try 
    {
      let InputMessages = [...messages, {content: message, role: 'user'}]

      setMessages(InputMessages)
      textRef.current = ''
    } 
    catch (error) 
    {
      console.log(error)
    }

  }

  return (
    <GestureHandlerRootView>
      <PageHeader title='CafeBot' showHeaderRight={false} bgColor='F9F9F9F9'/>
      <View
        className='flex-1 justify-between bg-neutral-100 overflow-visible'
      >
        <View
          className='flex-1'
        >

        </View>

        <View
          className='flex-row mx-2 justify-between border p-2 bg-white border-neutral-300 rounded-full pl-4 mb-4'
        >
          <TextInput
            ref={inputRef}
            onChangeText={value => textRef.current= value}
            placeholder='Type a message...'
            style= {{fontSize: hp(1.8)}}
            className='flex-1 mr-2'
          />

          <TouchableOpacity
            className='bg-neutral-200 p-2 mr-[1px] rounded-full'
          >
            <Feather name= 'send' size= {hp(3)} color='#737373'/>
          </TouchableOpacity>
            
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default ChatRoom

