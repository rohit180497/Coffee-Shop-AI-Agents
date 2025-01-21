import { Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { TouchableOpacity,GestureHandlerRootView } from 'react-native-gesture-handler'
import {router} from "expo-router";

const ThankyouPage = () => {
  return (
    <GestureHandlerRootView>
        <View className='w-full h-full items-center justify-center '>
          {/* Firecracker Animation */}
          <LottieView
            source={require('@/assets/images/firecrackers.json')} // Replace with your animation JSON path
            autoPlay
            loop={true}
            style={{ width: 300, height: 300 }}
          />
        <Text className='text-2xl font-[Sora-SemiBold] text-center mx-10'>Thank You for Your Order! 😊 Your brew-tiful moment is on its way!</Text>

        <TouchableOpacity 
                className='bg-app_orange_color 2-full rounded-2xl items-center justify-center mt-6 py-3 px-4 font-[Sora-SemiBold]'
                onPress={() => router.push("/(tabs)/home")}
              >
                <Text className="text-xl color-white font-[Sora-Regular]">Return to Home Page</Text> 
          </TouchableOpacity> 
        </View>
    </GestureHandlerRootView>
  )
}

export default ThankyouPage