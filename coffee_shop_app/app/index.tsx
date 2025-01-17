import React from "react";
import { Text, View, SafeAreaView, ImageBackground } from "react-native";
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";
import "nativewind";
import { router } from "expo-router";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        className= "w-full h-full"
        >
        <ImageBackground
          className= "w-full h-full item-center"
          source= {require("../assets/images/index_bg_image.png")}
        >
        <View className="flex h-[60%]" />
        <View
          className="flex w-[80%]"
        />
        <Text className="text-white text-3xl text-center font-[Sora-SemiBold] "> 
          Fall in Love With Coffee in Blissful Delight!
        </Text>
        <Text className= "pt-6 text-[#A2A2A2] text-s text-center font-[Sora-Regular] mx-7 leading-6"
        >
         Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </Text>

        <TouchableOpacity
          className="bg-[#C67C4E] mt-8 p-5 w-43 h-15 rounded-lg items-center"
          onPress={() => {router.push("/(tabs)/home");}}
        >
          <Text
            className="text-xl text-white font-[Sora-Semibold]"
          >
            Get Started
          </Text>
        </TouchableOpacity>



        </ImageBackground>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
