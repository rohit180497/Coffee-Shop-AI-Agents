import { Text, View } from 'react-native'
import DeliveryToggle from './DeliveryToggle'
import React from 'react'

const OrdersHeader = () => {
  return (
    <View>
        <DeliveryToggle />

        <Text
        className=" mx-7 mt-7 text-[#242424] text-lg font-[Sora-SemiBold]"
        >
        Delivery Address
        </Text>
        <Text
        className=" mx-7 mt-3 text-[#242424] text-base font-[Sora-SemiBold] mb-2"
        >
        Snell Library
        </Text>
        <Text
        className=" mx-7 text-[#A2A2A2] text-xs font-[Sora-SemiBold] mb-3"
        >
        360 Huntington Ave, Boston, MA 02115
        </Text>

        <View className="mx-12 border-b border-gray-400 my-4 " />
    </View>
  )
}

export default OrdersHeader