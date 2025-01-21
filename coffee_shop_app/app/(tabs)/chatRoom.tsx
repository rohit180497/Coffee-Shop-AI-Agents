import { Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef} from 'react'
import PageHeader from '@/components/PageHeader'
import { MessageInterface } from '@/types/types'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import {heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Feather } from '@expo/vector-icons'
import MessageList from '@/components/MessageList'
import { callChatBotAPI } from '@/services/chatBotService'
import { useCart } from "@/components/CartContext";


const ChatRoom = () => {

  const [messages, setMessages] = useState<MessageInterface[]>([
    {
      role: 'assistant',
      content: "Welcome to Merry's Way Cafe! ☕ Let’s make your coffee moment special. How can I assist you today?",
    },
  ]); 
  // const [messages, setMessages] = useState<MessageInterface[]>([]) 
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const textRef = useRef('')
  const inputRef = useRef<TextInput>(null)
  const {addToCart, emptyCart} = useCart();

  useEffect(() => {
  }, [messages]);


  const handleSendMessage = async () => {
    let message = textRef.current.trim()
    if (!message) return;
    try 
    {
      // Add the user message to the list of messages
      let inputMessages = [...messages, {content: message, role: 'user'}]
      setMessages(inputMessages)

      textRef.current = ''
      if(inputRef) inputRef?.current?.clear();

      // Calling the chatbot API here
      setIsTyping(true)
      // await new Promise(resolve => setTimeout(resolve, 5000))
      let responseMessage = await callChatBotAPI(inputMessages)
      setIsTyping(false)
      setMessages([...inputMessages, responseMessage])
      if (responseMessage) {
        if (responseMessage,memory) {
          if (responseMessage.memory.order) {
            emptyCart();
            responseMessage,memory.order.forEach((item:any) => {
            addToCart(item.item, item.quantity)
          });
          }
        }
      }
      
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
          <MessageList
            messages={messages}
            isTyping = {isTyping}
          />

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
            onPress={handleSendMessage}
          >
            <Feather name= 'send' size= {hp(3)} color='#737373'/>
          </TouchableOpacity>
            
        </View>
      </View>
    </GestureHandlerRootView>
  )
}

export default ChatRoom

