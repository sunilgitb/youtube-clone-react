import { Link, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import VideoSkelton from "./VideoSkelton";
import { processDuration } from "../utils/constants";
import numeral from "numeral";
import { fetchFromAPI } from "../pages/api/fetchFromAPI";
import moment from "moment";
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";

const PlaylistVideo = ({position,videoId,channelId}) => {
    const {setSelectedVideo,setSelectedChannel} =useContext(DataContext);
    const [hide,setHide] =useState(true);
    const [VideoData,setVideoData] =useState(null);
    const [channelData,setChannelData] = useState(null);
    const history =useNavigate()
    const handleClickVideo = ()=> {
        setSelectedVideo(VideoData);
        setSelectedChannel(channelData);
        history(`/watch/${videoId}`)
    }
    const handleClickChannel = ()=> {
        setSelectedChannel(channelData);
        history(`/channel/${channelId}/videos`)
    }
    useEffect(()=> {
        fetchFromAPI(`videos?part=snippet,statistics,contentDetails&id=${videoId}&maxResults=6`)
        .then((data)=> {
            setVideoData(data.items[0]);
        });
        fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}&maxResults=6`)
        .then((data) => {
            setChannelData(data.items[0]);
        })
    },[])
    if(!VideoData || !channelData) return <VideoSkelton />;
    const {snippet: {channelTitle, liveBroadcastContent , publishedAt,localized:{title}, thumbnails:{ medium: {url:videoUrl} } }, statistics: { viewCount }}= VideoData;
    return ( 
        <div 
        className="!no-underline container max-[768px]:mx-auto px-2 grid grid-cols-12 cursor-pointer bg-white transition-[1s] py-[10px] rounded-[7px] hover:bg-blue-50"
        onMouseOver={()=>setHide(false)}
        onMouseLeave={()=>setHide(true)}
        onClick={handleClickVideo}
        >
            <div className='col-span-3 max-[450px]:col-span-5 flex items-center gap-2'>
                <span className='text-[#606060] text-[14px]'>{position}</span>
                <div className='relative mr-[10px]'>
                    <img className='rounded-[10px] w-full' src={videoUrl}  alt="" />
                    {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                </div>
            </div>
            <div className='flex flex-col col-span-9 max-[450px]:col-span-7'>
                <div className='container px-2 grid grid-cols-12 h-full w-full'>
                    <div className='col-span-10'>
                        {/* Video Title  */}
                        <Link className='!no-underline' onClick={handleClickVideo}>
                            <p className='text-black text-[14px] w-[300px] max-[500px]:w-full font-medium mb-[3px] h-[40px] whitespace-normal text-ellipsis overflow-hidden'>
                                {title}
                            </p>
                        </Link>
                        <div className='flex items-center gap-[4px] max-[520px]:gap-0 text-[12px] text-[#606060]'>
                            {/* Channel title */}
                            <Tooltip title={channelTitle} placement="top">
                                <Link className='!no-underline' onClick={handleClickChannel}>
                                    <p className="transition-[0.5s] text-[#606060] hover:text-black">
                                        {channelTitle}
                                    </p>
                                </Link>
                            </Tooltip>
                            <span className='text-[14px] max-[520px]:hidden'>•</span>
                            <span className="w-max max-[520px]:hidden">
                                {numeral(viewCount).format('0.a')} views
                            </span>
                            <span className='text-[14px] max-[520px]:hidden'>•</span>
                            <span className="w-max max-[520px]:hidden">
                                {moment(publishedAt).fromNow()}
                            </span>
                        </div>
                    </div>
                    <div className='col-span-2 flex items-center justify-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div> 
    );
}
export default PlaylistVideo;