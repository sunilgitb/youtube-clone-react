import { useMediaQuery } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Video from '../Components/Video';
import { fetchFromAPI } from './api/fetchFromAPI';
import { useContext } from "react";
import { DataContext } from '../App';

export default function Home() {
  const {setIsSelectedForSideBar,filterWord,marginValue,setDataAPI,dataAPI} = useContext(DataContext);
  const [nextPageToken, setNextPageToken] =useState('');
  const getPageVideos =()=> {
    try {
      fetchFromAPI(`search?q=${filterWord}&part=snippet&maxResults=9&pageToken=${nextPageToken}`)
      .then((data)=> {
        setDataAPI([...data.items]);
        localStorage.setItem(`home-${filterWord}`,JSON.stringify([...data.items]));
        setNextPageToken(data.nextPageToken);
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  const getMorePageVideos =()=> {
    try {
      fetchFromAPI(`search?q=${filterWord}&part=snippet&maxResults=3&pageToken=${nextPageToken}`)
      .then((data)=> {
        setDataAPI([...dataAPI,...data.items]);
        localStorage.setItem(`home-${filterWord}`,JSON.stringify([...dataAPI,...data.items]));
        setNextPageToken(data.nextPageToken);
      });
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(()=> {
    setDataAPI([]);
    setNextPageToken('');
    setIsSelectedForSideBar(1);
    const storedVideos =localStorage.getItem(`home-${filterWord}`);
    if(storedVideos) setDataAPI(JSON.parse(storedVideos));
    else getPageVideos();
  },[filterWord])


  const query=useMediaQuery('(max-width:700px)');
  let videoList = Array.isArray(dataAPI)?
  dataAPI.map(item => (
      <Video videoId={item.id.videoId} channelId={item.snippet.channelId} dir='row' key={item.id.videoId}/>
    )):null;
  const handleOnScroll=()=> {
    getMorePageVideos();
  }
  useBottomScrollListener(handleOnScroll);  
  return (
    <Fragment>
        <div 
        className="home mt-[130px]"
        style={{
          marginLeft:query?'auto':marginValue,
          marginRight:query?'auto':null
        }}>
          <div className="videoList grid place-content-center bg-white grid-cols-3 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:items-center gap-y-8 gap-x-5 px-5 pb-5">
              {videoList}
          </div>
        </div>
    </Fragment>
    
  )
}
