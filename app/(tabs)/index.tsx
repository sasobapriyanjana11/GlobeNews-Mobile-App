import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import axios from "axios";
import {NewsDataType} from "@/types";
import BreakingNews from "@/components/BreakingNews";
import Categories from "@/components/Categories";
import NewsList from "@/components/NewsList";



// home screen
type Props = {}

const Page = (props: Props) => {
  const {top:safeTop} = useSafeAreaInsets();
  const [breakingNews,setBreakingNews] = useState <NewsDataType[]>([]);
  const [news,setNews] = useState <NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getBreakingNews();
    getNews();
  },[]);

  const getBreakingNews=async()=>{
    try{
     const URL=`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`
      const response=await axios.get(URL);

       if (response && response.data) {
        setBreakingNews(response.data.results)
        setIsLoading(false);
       }
    } catch (err:any) {
      console.error(err)
    }
  }
    const getNews=async()=>{
        try{
            const URL=`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10`
            const response=await axios.get(URL);

            if (response && response.data) {
                setNews(response.data.results)
                setIsLoading(false);
            }
        } catch (err:any) {
            console.error(err)
        }
    }
  const onCatChanged=(category:string)=>{
      console.log("category",category)
  }

  return (
    <ScrollView style={[styles.container,{paddingTop:safeTop}]}>
      <Header/>
      <SearchBar/>
      {isLoading ? (
          <ActivityIndicator size={'large'} />
      ) : (
          <BreakingNews newsList={breakingNews}/>
      )}
        <Categories onCategoryChange={onCatChanged} />
        <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})