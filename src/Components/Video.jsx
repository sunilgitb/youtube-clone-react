import { useContext, useState } from 'react';
import { Fragment, useEffect } from 'react';
import moment from 'moment'
import { fetchFromAPI } from '../pages/api/fetchFromAPI';
import { Link, useMediaQuery } from '@mui/material';
import numeral from 'numeral';
import VideoSkelton from './VideoSkelton';
import Tooltip from '@mui/material/Tooltip';
import { processDuration } from '../utils/constants';
import { DataContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

const Video = ({videoId,channelId,dir}) => {
    const {setSelectedVideo,setSelectedChannel} =useContext(DataContext);
    const [hide,setHide] =useState(true);
    const [isLoading,setIsLoading] = useState(true);
    const [VideoData,setVideoData] =useState(null);
    const [channelData,setChannelData] = useState(null);
    const query=useMediaQuery('(max-width:1100px)');
    const history =useNavigate();
    const location =useLocation();
    const {pathname} = location;
    useEffect(()=> {
        fetchFromAPI(`videos?part=snippet,statistics,contentDetails&id=${videoId}`)
        .then((data)=> {
            setVideoData(data.items[0]);
        });
        fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}`)
        .then((data) => {
            setChannelData(data.items[0]);
        })
    },[])
    const handleClickVideo = ()=> {
        setSelectedVideo(VideoData);
        setSelectedChannel(channelData);
        history(`/watch/${videoId}`)
    }
    const handleClickChannel = ()=> {
        setSelectedChannel(channelData);
        history(`/channel/${channelId}/videos`)
    }
    if(!VideoData || !channelData) return <VideoSkelton dir={dir}/>;
    const {snippet: { description, channelTitle, liveBroadcastContent , publishedAt,localized:{title}, thumbnails:{ medium: {url:videoUrl} } }, statistics: { viewCount }}= VideoData;
    const {snippet: { thumbnails:{ default:{ url:channelUrl }}}} =channelData;
    return (
        <Fragment>
            { dir === 'row' &&
                <div 
                className="cursor-pointer flex flex-col bg-white"
                onMouseOver={()=>setHide(false)}
                onMouseLeave={()=>setHide(true)}
                >
                    {/* Video Image */}
                    <Link className='!no-underline w-full relative !mb-[8px]' onClick={handleClickVideo}>
                        <img
                        className='rounded-[10px] w-full object-cover'
                        style={{display: isLoading? 'none': 'block'}}
                        onLoad={()=> setIsLoading(false)}
                        onError={()=>setIsLoading(false)}
                        src={videoUrl}  
                        alt="" />
                        { isLoading  &&
                            <div className='rounded-[10px] absolute left-0 top-0 w-full h-full bg-black'></div>
                        }
                        {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                    </Link>
                    <div className="flex gap-2 w-full">
                        {/* Channel Image */}
                        <Link onClick={handleClickChannel}>
                            <img className='!no-underline rounded-[50%] w-[40px] object-cover' src={channelUrl}  alt="" />
                        </Link>
                        <div className='info w-full'>
                            <div className='grid grid-cols-12'>
                                {/* Video Title  */}
                                <Link className='!no-underline col-span-11' onClick={handleClickVideo}>
                                    <p className='text-black text-[14px] mb-[3px] whitespace-normal text-ellipsis overflow-hidden'>
                                        {title}
                                    </p>
                                </Link>
                                <div className='col-span-1 h-[20px] flex justify-end h-[32px]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                    </svg>
                                </div>
                            </div>
                            {/* Channel title */}
                            <Tooltip title={channelTitle} placement="top">
                                <Link className='!no-underline' onClick={handleClickChannel}>
                                    <span className="text-[#606060] text-[11px] transition-[0.5s] hover:text-black">
                                        {channelTitle}
                                    </span>
                                </Link>
                            </Tooltip>
                            {/* View count & publish time */}
                            <div className="text-[#606060] text-[11px] flex items-center">
                                <span>
                                    {numeral(viewCount).format('0.a')} views
                                </span>
                                <span className='text-[14px] mx-[4px]'>•</span>
                                <span>
                                    {moment(publishedAt).fromNow()}
                                </span>
                            </div>
                            {/* Live icon */}
                            {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                                <span className="material-symbols-outlined text-[15px]">
                                sensors
                                </span>
                                <span>LIVE</span>
                            </div> }
                        </div>
                        
                    </div>
                </div> 
            }
            { dir === 'rowChannel' &&
                <div 
                className="cursor-pointer flex flex-col gap-2 bg-white"
                onMouseOver={()=>setHide(false)}
                onMouseLeave={()=>setHide(true)}
                >
                    {/* Video Image */}
                    <Link className='!no-underline w-full relative' onClick={handleClickVideo}>
                        <img
                        className='rounded-[10px] w-full object-cover'
                        style={{display: isLoading? 'none': 'block'}}
                        onLoad={()=> setIsLoading(false)}
                        onError={()=>setIsLoading(false)}
                        src={videoUrl}  
                        alt="" />
                        { isLoading  &&
                            <div className='rounded-[10px] absolute left-0 top-0 w-full h-full bg-black'></div>
                        }
                        {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                    </Link>
                    <div className='info w-full'>
                        <div className='grid grid-cols-5'>
                            {/* Video Title  */}
                            <Link className='!no-underline col-span-4' onClick={handleClickVideo}>
                                <p className='text-black text-[14px] h-[40px] w-[93%] mb-[3px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        {/* View count & publish time */}
                        <div className="text-[#606060] text-[11px] flex items-center">
                            <span>
                                {numeral(viewCount).format('0.a')} views
                            </span>
                            <span className='text-[14px] mx-[4px]'>•</span>
                            <span>
                                {moment(publishedAt).fromNow()}
                            </span>
                        </div>
                        {/* Live icon */}
                        {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                            <span className="material-symbols-outlined text-[15px]">
                            sensors
                            </span>
                            <span>LIVE</span>
                        </div> }
                    </div>
                </div> 
            }
            { dir ==='col' && 
                <div 
                className="cursor-pointer grid grid-cols-12 container mx-auto px-2 gap-2 bg-white max-[500px]:flex max-[500px]:flex-col"
                onMouseOver={()=>setHide(false)}
                onMouseLeave={()=>setHide(true)}
                >
                    <Link className='!no-underline relative col-span-4' onClick={handleClickVideo}>
                        <img className='rounded-[10px] max-[500px]:rounded-[0] w-full h-full object-cover' src={videoUrl}  alt="" />
                        {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                    </Link>
                    <div className='info col-span-8 max-[500px]:hidden flex flex-col'>
                        <div className='grid grid-cols-12 gap-2'>
                            {/* Video Title  */}
                            <Link className='!no-underline col-span-11' onClick={handleClickVideo}>
                                <p className='text-black text-[18px] font-normal h-[50px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        {/* View count & publish time */}
                        <div className="text-[#606060] text-[12px] flex items-center mb-3">
                            <span>
                                {numeral(viewCount).format('0.a')} views
                            </span>
                            <span className='text-[14px] mx-[4px]'>•</span>
                            <span>
                                {moment(publishedAt).fromNow()}
                            </span>
                        </div>
                        <div className='flex gap-2 items-center mb-3'>
                            {/* Channel Image */}
                            <Link className='!no-underline' onClick={handleClickChannel}>
                                <img className='rounded-[50%] w-[25px] object-cover' src={channelUrl}  alt="" />
                            </Link>
                            {/* Channel title */}
                            <Tooltip title={channelTitle} placement="top">
                            <Link className='!no-underline' onClick={handleClickChannel}>
                                <span className="text-[#606060] text-[12px] transition-[0.5s] hover:text-black">
                                    {channelTitle}
                                </span>
                            </Link>
                            </Tooltip>
                        </div>
                        {/* Video description */}
                        {pathname =='/result' && 
                            <Tooltip title='From the video description' placement="bottom">
                                <p className='text-[11px] text-[#606060] pr-5 mb-2 h-[30px] text-ellipsis overflow-hidden'>
                                    {(description.length > 130)? description.slice(0,130)+'...' : description}
                                </p>
                            </Tooltip>
                        }
                        {/* Live icon */}
                        {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                            <span className="material-symbols-outlined text-[15px]">
                            sensors
                            </span>
                            <span>LIVE</span>
                        </div> }
                    </div>
                    {/* Media Mobile View and medium screen */}
                    <div className='hidden max-[500px]:block info w-full px-2'>
                        <div className='grid grid-cols-12'>
                            {/* Video Title  */}
                            <Link className='!no-underline col-span-11 ' onClick={handleClickVideo}>
                                <p className='text-[14px] text-black mb-[3px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end h-[32px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Link className='!no-underline' onClick={handleClickChannel}>
                                <img className='rounded-[50%] w-[40px] object-cover' src={channelUrl}  alt="" />
                            </Link>
                            <div className='flex flex-col'>
                                {/* Channel title */}
                                <Tooltip title={channelTitle} placement="top">
                                    <Link className='!no-underline' onClick={handleClickChannel}>
                                        <span className="text-[#606060] text-[11px] transition-[0.5s] hover:text-black">
                                            {channelTitle}
                                        </span>
                                    </Link>
                                </Tooltip>
                                {/* View count & publish time */}
                                <div className="text-[#606060] text-[11px] flex items-center">
                                    <span>
                                        {numeral(viewCount).format('0.a')} views
                                    </span>
                                    <span className='text-[14px] mx-[4px]'>•</span>
                                    <span>
                                        {moment(publishedAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Live icon */}
                        {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                            <span className="material-symbols-outlined text-[15px]">
                            sensors
                            </span>
                            <span>LIVE</span>
                        </div> }
                    </div>
                </div> 
            }
            { dir ==='colSmall' &&
                <div 
                className="cursor-pointer container mx-auto px-2 grid grid-cols-12 gap-2 bg-white max-[500px]:flex max-[500px]:flex-col"
                onMouseOver={()=>setHide(false)}
                onMouseLeave={()=>setHide(true)}
                >
                    <Link 
                    className='!no-underline relative col-span-4 max-[450px]:col-span-5'
                    onClick={handleClickVideo}>
                        <img className='rounded-[10px] w-full object-cover' src={videoUrl}  alt="" />
                        {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                    </Link>
                    <div className='col-span-8 max-[500px]:hidden flex flex-col'>
                        <div className='grid grid-cols-5 gap-2'>
                            {/* Video Title  */}
                            <Link className='!no-underline col-span-4' onClick={handleClickVideo}>
                                <p className='text-black text-[14px] font-medium mb-[3px] h-[40px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-7 h-7  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            {/* Channel title */}
                            <Tooltip title={channelTitle} placement="top">
                            <Link className='!no-underline' onClick={handleClickChannel}>
                                <span className="text-[#606060] text-[12px] transition-[0.5s] hover:text-black">
                                    {channelTitle}
                                </span>
                            </Link>
                                
                            </Tooltip>
                        </div>
                        {/* View count & publish time */}
                        <div className="text-[#606060] text-[12px] flex items-center mb-3">
                            <span>
                                {numeral(viewCount).format('0.a')} views
                            </span>
                            <span className='text-[14px] mx-[4px]'>•</span>
                            <span>
                                {moment(publishedAt).fromNow()}
                            </span>
                        </div>
                        {/* Live icon */}
                        {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                            <span className="material-symbols-outlined text-[15px]">
                            sensors
                            </span>
                            <span>LIVE</span>
                        </div> }
                    </div>
                    {/* Media Mobile View and medium screen */}
                    <div className='hidden max-[500px]:block info w-full px-2'>
                        <div className='grid grid-cols-12'>
                            {/* Video Title  */}
                            <Link className='!no-underline col-span-11 ' onClick={handleClickVideo}>
                                <p className='text-[14px] text-black mb-[3px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end h-[32px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <Link className='!no-underline' onClick={handleClickChannel}>
                                <img className='rounded-[50%] w-[40px] object-cover' src={channelUrl}  alt="" />
                            </Link>
                            <div className='flex flex-col'>
                                {/* Channel title */}
                                <Tooltip title={channelTitle} placement="top">
                                    <Link className='!no-underline' onClick={handleClickChannel}>
                                        <span className="text-[#606060] text-[11px] transition-[0.5s] hover:text-black">
                                            {channelTitle}
                                        </span>
                                    </Link>
                                </Tooltip>
                                {/* View count & publish time */}
                                <div className="text-[#606060] text-[11px] flex items-center">
                                    <span>
                                        {numeral(viewCount).format('0.a')} views
                                    </span>
                                    <span className='text-[14px] mx-[4px]'>•</span>
                                    <span>
                                        {moment(publishedAt).fromNow()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* Live icon */}
                        {liveBroadcastContent ==="live" && <div className='bg-[#cc0000e6] px-[2px] text-[12px] text-white w-max rounded-sm flex items-center gap-[2px]'>
                            <span className="material-symbols-outlined text-[15px]">
                            sensors
                            </span>
                            <span>LIVE</span>
                        </div> }
                    </div>
                </div> 
            }
            {
                dir ==='colPlaylist' &&
                <div 
                className="cursor-pointer grid grid-cols-5 gap-2 bg-white w-full"
                onMouseOver={()=>setHide(false)}
                onMouseLeave={()=>setHide(true)}
                >
                    <Link 
                    className={query?'!no-underline relative col-span-1':'!no-underline relative col-span-2'} 
                    onClick={handleClickVideo}>
                        <img className='rounded-[10px] w-full object-cover' src={videoUrl}  alt="" />
                        {liveBroadcastContent ==="none" && <span className='absolute right-[4px] bottom-[4px] bg-[#000000cc] rounded-[4px] p-[2px] text-[12px] text-white'>{processDuration(VideoData?.contentDetails?.duration)}</span>}
                    </Link>
                    <div className={query?'col-span-4 flex flex-col':'col-span-3 flex flex-col'}>
                        <div className='grid grid-cols-5 gap-2 items-center'>
                            <div className='col-span-3'>
                                {/* Video Title  */}
                                <Link className='!no-underline col-span-4' onClick={handleClickVideo}>
                                    <p className='text-black text-[14px] font-medium mb-[3px] h-[40px] whitespace-normal text-ellipsis overflow-hidden'>
                                        {title}
                                    </p>
                                </Link>
                                <div className='flex gap-2 items-center text-[12px] text-[#606060]'>
                                {/* Channel title */}
                                <Tooltip title={channelTitle} placement="top">
                                    <Link className='!no-underline' onClick={handleClickChannel}>
                                        <span className="transition-[0.5s] hover:text-black">
                                            {channelTitle}
                                        </span>
                                    </Link>
                                </Tooltip>
                                {/* View count & publish time */}
                                <div className="flex items-center mb-3">
                                    <span>
                                        {numeral(viewCount).format('0.a')} views
                                    </span>
                                    <span className='text-[14px] mx-[4px]'>•</span>
                                    <span>
                                        {moment(publishedAt).fromNow()}
                                    </span>
                                </div>
                                </div>
                            </div>
                            <div className='col-span-1 flex justify-end'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className={`w-8 h-8  ${hide?'hidden':'block'}`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        
                    </div>
                </div> 
            }
        </Fragment>
    );
}

export default Video;