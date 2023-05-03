import { useMediaQuery } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { DataContext } from '../App';
import { fetchFromAPI } from "./api/fetchFromAPI";
import Video from "../Components/Video";
import ChanneLayout from "../Components/ChannelLayout";
import { useParams } from "react-router-dom";

const ChannelVideos = () => {
    const {setIsSelectedForChannelBar,marginValue} = useContext(DataContext);
    const [channelVideos,setChannelVideos] =useState([]);
    const { id } = useParams();
    const query=useMediaQuery('(max-width:700px)');
    const getChannelVideos =()=> {
        try {
            fetchFromAPI(`search?channelId=${id}&part=snippet&maxResults=6`)
            .then((data)=> {
                setChannelVideos([...channelVideos,...data.items]);
                localStorage.setItem(`channel-${id}-videos`,JSON.stringify([...data.items]));
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        setIsSelectedForChannelBar(1);
        const storedChannelVideos =localStorage.getItem(`channel-${id}-videos`);
        if(storedChannelVideos) setChannelVideos(JSON.parse(storedChannelVideos));
        else getChannelVideos();
    },[])
    const videoList = channelVideos?.map(item => (
        <Video videoId={item.id.videoId} channelId={id} dir='rowChannel' key={item.id.videoId}/>
    ))
    return (
        <Fragment>
            <ChanneLayout>
                <div className="px-[50px] pb-[30px] pt-[10px]"
                style={{
                marginLeft:query?'auto':marginValue,
                marginRight:query?'auto':null
                }}> 
                    <div className="btn-group flex items-center gap-2 mb-[15px] px-5">
                        <button className=' text-white rounded-[10px] bg-[#0f0f0f] hover:bg-[#0f0f0fe9] py-[5px] px-[10px] text-[15px] border-none cursor-pointer'>
                            Recently uploaded
                        </button>
                        <button className=' text-black rounded-[10px] bg-[#edecec] py-[5px] px-[10px] text-[15px] border-none cursor-pointer'>
                            Popular
                        </button>
                    </div>
                    <div className="videoList grid place-content-center lg:grid-cols-3 md:grid-cols-2 sm:items-center gap-y-8 gap-x-5 px-5 pb-5">
                            {videoList}
                    </div>
                </div>
            </ChanneLayout>
        </Fragment>
    );
}
export default ChannelVideos;