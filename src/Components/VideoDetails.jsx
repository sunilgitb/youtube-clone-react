import { Link, Tooltip } from '@mui/material';
import { Fragment, useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube'
import { fetchFromAPI } from '../pages/api/fetchFromAPI';
import numeral from 'numeral';
import moment from 'moment'
import { DataContext } from '../App';
import { useParams } from 'react-router-dom';

const VideoDetails = () => {
    const {selectedVideo,selectedChannel} =useContext(DataContext);
    const [toggle,setToggle] = useState(false);
    const [videoInfo,setVideoInfo]=useState({});
    const [channelInfo,setChannelInfo]=useState({});
    const { id } = useParams();
    const getVideoPageData =()=> {
        if(selectedVideo) {
            const {snippet: { description, channelTitle, liveBroadcastContent , publishedAt,localized:{title}, thumbnails:{ medium: {url:videoUrl} } }, statistics: { viewCount,likeCount }}= selectedVideo;
            setVideoInfo({description,channelTitle,liveBroadcastContent,publishedAt,title,videoUrl,viewCount,likeCount})
            const {snippet: { thumbnails:{ default:{ url:channelUrl }}} ,statistics:{subscriberCount} } =selectedChannel;
            setChannelInfo({channelUrl,subscriberCount})
        }
        else {
            fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then((data)=> {
                if(data) {
                    const {snippet: { description, channelTitle,channelId,liveBroadcastContent , publishedAt,localized:{title}, thumbnails:{ medium: {url:videoUrl} } }, statistics: { viewCount,likeCount }}= data?.items[0];
                    localStorage.setItem(`video-${id}`,JSON.stringify(data?.items[0]));
                    setVideoInfo({description,channelTitle,channelId,liveBroadcastContent,publishedAt,title,videoUrl,viewCount,likeCount})
                }
                fetchFromAPI(`channels?part=snippet,statistics&id=${videoInfo?.channelId}`)
                .then((data)=> {
                    if(data) {
                        const {snippet: { thumbnails:{ default:{ url:channelUrl }}} ,statistics:{subscriberCount} } =data?.items[0];
                        localStorage.setItem(`channel-${id}`,JSON.stringify(data?.items[0]));
                        setChannelInfo({channelUrl,subscriberCount})
                    }
                })
            })
        }
    } 
    useEffect(()=> {
        const storedVideoData=localStorage.getItem(`video-${id}`);
        const storedChannelData=localStorage.getItem(`channel-${id}`);
        if(storedVideoData && storedChannelData) {
            const {snippet: { description, channelTitle,channelId,liveBroadcastContent , publishedAt,localized:{title}, thumbnails:{ medium: {url:videoUrl} } }, statistics: { viewCount,likeCount }}= JSON.parse(storedVideoData);
            const {snippet: { thumbnails:{ default:{ url:channelUrl }}} ,statistics:{subscriberCount} } =JSON.parse(storedChannelData);
            setVideoInfo({description,channelTitle,channelId,liveBroadcastContent,publishedAt,title,videoUrl,viewCount,likeCount})
            setChannelInfo({channelUrl,subscriberCount})
        }
        else getVideoPageData();
        
    },[])
    const {description,channelTitle,publishedAt,title,viewCount,likeCount}=videoInfo;
    const {channelUrl,subscriberCount} =channelInfo;
    return ( 
        <Fragment>
            {/* Video Player */}
            <div className='relative pt-[56%]'>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className="absolute left-0 top-0" width='100%' height='100%' controls />
            </div>
            <div className='info pt-4 container mx-auto px-2'>
                {/* Video Title */}
                <p className='text-[18px] font-bold max-[500px]:text-[16px]'>{title}</p>
                <div className='flex justify-between items-center max-[600px]:flex-col max-[600px]:gap-2'>
                    <div className='flex items-center max-[600px]:w-full max-[600px]:justify-between my-2 gap-[40px] max-[600px]:gap-[10px]'>
                        <div className='flex gap-1'>
                            {/* Channel Image */}
                            <Link href='/' className='!no-underline w-max'>
                                <img className='rounded-[50%] w-[40px] h-[40px] object-cover' src={channelUrl}  alt="" />
                            </Link>
                            <div className='info flex flex-col'>
                                {/* Channel Title  */}
                                <Link href='/' className='!no-underline w-max font-medium' >
                                    <Tooltip title={channelTitle} placement="top">
                                        <span className='text-[16px] text-black  max-[500px]:text-[14px]'>
                                            {(channelTitle?.length > 22)? channelTitle.slice(0,22)+'...' : channelTitle}
                                        </span>
                                    </Tooltip>
                                </Link>
                                {/* Subscriber Count */}
                                <span className='text-[12px] text-[#606060]'>
                                    {numeral(subscriberCount).format('0.a').toUpperCase()} subcribers
                                </span>
                            </div>
                        </div>
                        <button className='text-white rounded-full bg-[#0f0f0f] hover:bg-[#0f0f0fe9] py-[7px] px-[15px] text-[15px] max-[500px]:text-[14px] border-none cursor-pointer'>
                            Subscribe
                        </button>
                    </div>
                    <div className='flex max-[600px]:w-full'>
                        {/* Like & Dislike Btn */}
                        <div className='btn-group flex'>
                            <Tooltip title="I like this" placement="bottom">
                                <button className='border-none rounded-tl-full rounded-bl-full bg-[#0000000D] px-[15px] flex items-center gap-2 hover:bg-[#0000001f] relative before:pseudo-content-comma before:absolute before:right-0 before:top-[50%] before:translate-y-[-50%] before:w-[1px] before:h-[60%] before:bg-[#0000002a]'>
                                    <span className="material-symbols-outlined text-[23px]">
                                    thumb_up
                                    </span>
                                    <span className='text-[14px]'>
                                        {numeral(likeCount).format('0.a').toUpperCase()}
                                    </span>
                                </button>
                            </Tooltip>
                            <Tooltip title="I dislike this" placement="bottom">
                                <button className='border-none rounded-tr-full rounded-br-full bg-[#0000000D] px-[15px] flex gap-2 hover:bg-[#0000001f] items-center'>
                                    <span className="material-symbols-outlined text-[23px]">
                                    thumb_down
                                    </span>
                                </button>
                            </Tooltip>
                            
                        </div>
                        {/* Share Btn */}
                        <Tooltip title="Share" placement="bottom">
                            <button className='mx-[15px] border-none rounded-full bg-[#0000000D] px-[10px] py-[7px] flex gap-2 items-center hover:bg-[#0000001f] text-[15px]'>
                                <span className="material-symbols-outlined text-[23px]">
                                reply
                                </span>
                                share
                            </button>
                        </Tooltip>
                        <button className="border-none p-[10px] max-[500px]:text-[14px] rounded-[50%] bg-[#f8f8f8] hover:bg-[#0000001A]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='desc w-full my-3 bg-[#0000000D] rounded-lg p-3 text-[14px]'>
                <p className='font-bold'>
                    {numeral(viewCount).format('0.000a')} watching now Started streaming {moment(publishedAt).fromNow()}
                </p>
                <p 
                className='whitespace-pre-wrap cursor-pointer'
                onClick={()=> setToggle(!toggle)}
                >
                    {(!toggle)? description?.slice(0,150)+'...\n': description+'...\n'}
                    {(!toggle)? <span className='font-bold'>Show more</span>: <span className='font-bold'>Show less</span> }
                </p>
            </div>
        </Fragment>
    );
}

export default VideoDetails;