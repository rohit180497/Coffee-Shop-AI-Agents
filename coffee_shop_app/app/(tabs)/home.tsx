import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Product, ProductCategory } from '@/types/types'
import { fetchProducts } from '@/services/productService'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import SearchArea from '@/components/SearchArea' ;
import Banner from '@/components/Banner'


const home = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [shownProducts, setshownProducts] = useState<Product[]>([]);
    const [productCategories, setproductCategories] = useState<ProductCategory[]>([]);
    const [selectedCategory, setSelectedCategory ] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const uniqueCategories = Array.from(productCategories).map((category) => ({
            id: category.id,
            selected: selectedCategory === category.id,

        }));

        setproductCategories(uniqueCategories);

        if (selectedCategory === 'All') {
            setshownProducts(products);
        } else {
            const filteredProducts = products.filter((product) => product.category === selectedCategory);
            setshownProducts(filteredProducts)
        }

    },[selectedCategory])

    useEffect(() => {


    },[selectedCategory]);

    useEffect(() => {
        const loadProducts = async() => {
            try {
                const productsData = await fetchProducts();
                const categories = productsData.map((product) => product.category);
                categories.unshift('All');

                const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
                    id: category,
                    selected: selectedCategory === category,
                }));

                setproductCategories(uniqueCategories);
                setProducts(productsData);
                setshownProducts(productsData);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();

    }, [])

    if (loading) return <Text> Loading .....</Text>



    return (
    <GestureHandlerRootView>
        <SafeAreaView
        className='w-full h-full'>
            <FlatList
                horizontal= {false}
                numColumns={2}
                columnWrapperStyle= {{justifyContent: 'space-between',marginLeft:15, marginRight:15 }}
                keyExtractor={(item, index) => index.toString()}
                data = {shownProducts}

                renderItem={({item}) => (
                    <View
                        className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between' 
                    >
                        <TouchableOpacity>
                            <Image 
                                className="w-full h-32 rounded-2xl"
                                source={{uri: item.image_url}}
                            />
                            <Text
                            className='text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2'>
                                {item.name}
                            </Text>

                            <Text
                            className='text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 mt-2'>
                                {item.category}
                            </Text>

                        </TouchableOpacity>
                        <View
                            className='flex-row justify-between ml-1 mt-5 mb-2'
                        >
                            <Text
                            className='text-[#050505] text-2xl font-[Sora-SemiBold]'>

                                ${item.price}
                            </Text>

                            <TouchableOpacity>

                                <View
                                className='mr-2 p-2 -mt-1 bg-app_orange_color rounded-xl'>
                                <AntDesign name="plus" size={18} color="white" />
                                </View>
                            </TouchableOpacity>

                        </View>

                    </View>


                )}  


            ListHeaderComponent={() => (
                <View
                className='flex'
                >
                <SearchArea/>
                <Banner />
                <View
                className='flex items-center'
                >
                    <FlatList
                        className='mt-6 w-[90%] mb-2'
                        data = {productCategories}
                        horizontal= {true}
                        renderItem={({item}) => (
                            <TouchableOpacity
                            onPress = {() => setSelectedCategory(item.id)}
                            >
                                
                                <Text
                                    className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg 
                                        ${item.selected ? 'text-white' : 'text-[#313131]'}
                                        ${item.selected ? 'bg-app_orange_color ' : 'bg-[#EDEDED] '}
                                        `}
                                >
                                    {item.id}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                
                </View>
            )}
            />
             
        </SafeAreaView>
    </GestureHandlerRootView>
    )
}

export default home

