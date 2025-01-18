import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProductList from '@/components/CartProductList'
import { Product } from '@/types/types'
import { useCart } from '@/components/CartContext'
import { fetchProducts } from '@/services/productService'

const order = () => {
  const {cartItems, SetQuantityCart, emptyCart} = useCart()
  const [product, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const loadProducts = async() => {
      try {
        const productsData =await fetchProducts();

        setProducts(productsData)

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    loadProducts()
  },[])

  return (
    <GestureHandlerRootView
      className='w-full h-full bg-[#F9F9F9]'
    >
      <PageHeader title='Order' showHeaderRight={false} bgColor='F9F9F9F9'/>
      <View
        className='h-full flex-col justify-between'
      >
        <View
          className='h-[75]%'
        >
          <ProductList products={product} quantities={cartItems} setQuantities={SetQuantityCart} totalPrice={totalPrice}/>
        </View>

      </View>
    </GestureHandlerRootView>
  )
}

export default order

