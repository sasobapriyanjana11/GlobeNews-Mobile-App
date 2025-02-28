import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import {NewsDataType} from "@/types";
import BreakingNews from "@/components/BreakingNews";


// home screen
type Props = {}

const Page = (props: Props) => {
  const {top:safeTop} = useSafeAreaInsets();
  const [breakingNews,setBreakingNews] = useState <NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getBreakingNews()
  },[]);

  const getBreakingNews=async()=>{
    try{
     const URL=`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=lk&language=en&image=1&removeduplicate=1&size=5`
      const response=await axios.get(URL);

       if (response && response.data) {
        setBreakingNews(response.data.results)
        setIsLoading(false);
       }
    } catch (err:any) {
      console.error(err)
    }
  }

  return (
    <View style={[styles.container,{paddingTop:safeTop}]}>
      <Header/>
      <SearchBar/>
      {isLoading ? (
          <ActivityIndicator size={'large'} />
      ) : (
          <BreakingNews newsList={breakingNews}/>
      )}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})