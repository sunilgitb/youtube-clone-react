import { useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { fetchFromAPI } from "./api/fetchFromAPI";
import Video from "../Components/Video";
import ChanneLayout from "../Components/ChannelLayout";
import { useParams } from "react-router-dom";

const ChannelLive = () => {
    const {marginValue,setIsSelectedForChannelBar} = useContext(DataContext);
    const [channelVideosLive,setChannelVideosLive] =useState([]);
    const query=useMediaQuery('(max-width:700px)');
    const { id } = useParams();
    const getChannelVideosLive =()=> {
        try {
            fetchFromAPI(`search?channelId=${id}&part=snippet&maxResults=4`)
            .then((data)=> {
                setChannelVideosLive([...data.items]);
                localStorage.setItem(`channel-${id}-live`,JSON.stringify([...data.items]));
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        setIsSelectedForChannelBar(2);
        const storedChannelLive =localStorage.getItem(`channel-${id}-live`);
        if(storedChannelLive) setChannelVideosLive(JSON.parse(storedChannelLive));
        else getChannelVideosLive();
    },[])
    const videoList = channelVideosLive?.map(item => {
        if(item.snippet.liveBroadcastContent === "live") 
            return <Video videoId={item.id.videoId} channelId={id} dir='rowChannel' key={item.id.videoId}/>
    })
    return ( 
        <ChanneLayout>
            <div className="px-[50px] pb-[30px] pt-[10px]"
                style={{
                marginLeft:query?'auto':marginValue,
                marginRight:query?'auto':null
                }}> 
                    {
                        videoList > 0 ?
                        (
                            <div className="videoList grid place-content-center lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:items-center gap-y-8 gap-x-5 px-5 pb-5">
                                {videoList}
                            </div>
                        )
                        :
                        (
                            <span className='block mx-auto w-max'>
                                This channel has no videos.
                            </span>
                        )
                    }
            </div>
        </ChanneLayout>
    );
}
export default ChannelLive;