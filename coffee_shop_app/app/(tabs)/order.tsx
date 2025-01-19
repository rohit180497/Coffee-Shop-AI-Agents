import { Text, TouchableOpacity, View, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProductList from '@/components/CartProductList'
import { Product } from '@/types/types'
import { useCart } from '@/components/CartContext'
import { fetchProducts } from '@/services/productService'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Toast from 'react-native-root-toast';
import { router } from 'expo-router'

const order = () => {
  const {cartItems, SetQuantityCart, emptyCart} = useCart()
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotal = (products: Product[], quantities: {[key: string]: number}) => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.name] || 0
      return total + product.price * quantity;
    }, 0)
  }

  useEffect(() => {
    const total = calculateTotal(products, cartItems)
    setTotalPrice(total)
  }, [cartItems, products])


  useEffect(() => {
    const loadProducts = async() => {
      try {
        const productsData =await fetchProducts();

        setProducts(productsData)

        const total = calculateTotal(productsData, cartItems)
        setTotalPrice(total)

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    loadProducts()
  },[])


  const orderNow= () => {
    emptyCart();
    Toast.show("Order is Placed Successfully!",
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM
      }
    )

    router.push('/thankyou')
  }

  return (
    <GestureHandlerRootView
      className='w-full h-full bg-[#F9F9F9]'
    >
      
      <PageHeader title='Order' showHeaderRight={false} bgColor='#F9F9F9'/>
      
      <View
        className='h-full flex-col justify-between'
      >
        <View
          className='h-[70]%'
        >
          <ProductList products={products} quantities={cartItems} setQuantities={SetQuantityCart} totalPrice={totalPrice}/>
        </View>

        <View
          className='bg-white rounded-tl-3xl rounded-tr-3xl px-7 pt-3 pb-6'
        >
          <View
            className='flex-row justify-between items-center'
          >
            <View
              className='flex-row items-center'
            >
              <Ionicons name='wallet-outline' size={24} color= "#C67C4E"/>
              <View
                className='flex-row items-center'
              >
                <Text
                className='text-[#242424] text-base font-[Sora-SemiBold] pb-1 ml-3'
                >Cash/Wallet</Text>
                <Text
                  className='text-app_orange_color text-sm font-[Sora-SemiBold] ml-3 text-xl'
                >
                  $ {totalPrice== 0 ? 0: totalPrice + 1}
                </Text>
            </View>

          </View>
            <MaterialIcons name='keyboard-arrow-down' size={24} color="black"/>            
        </View>

          <TouchableOpacity 
                className={`${totalPrice=== 0 ? 'bg-[#EDEDED]' : 'bg-app_orange_color' }  2-full rounded-2xl items-center justify-center mt-6 py-3`}
                disabled={totalPrice === 0}
                onPress={orderNow}
              >
                <Text className="text-xl color-white font-[Sora-Regular]">Order</Text> 
          </TouchableOpacity>

      </View>

      </View>
    </GestureHandlerRootView>
  )
}

export default order

