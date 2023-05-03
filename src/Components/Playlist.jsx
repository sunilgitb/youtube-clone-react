import { Link, Tooltip } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useContext } from 'react';
import { DataContext } from "../App";
import { useNavigate } from "react-router-dom";
import { fetchFromAPI } from "../pages/api/fetchFromAPI";

const Playlist = ({playListData,id,type}) => {
    const [show,setShow] =useState(false);
    const [channelData,setChannelData] =useState(null);
    const [playListInfo,setPlayListInfo] =useState({});
    const {setSelectedPlaylist,setSelectedChannel} =useContext(DataContext);
    if(type ==="channel") {
        const {contentDetails:{itemCount}, snippet:{channelId,title,channelTitle, thumbnails:{medium:{url}}}} =playListData;
        setPlayListInfo({id,itemCount,channelId,title,channelTitle,url});
    }
    else {
        fetchFromAPI(`playlists?id=${id}&part=snippet,contentDetails`)
        .then((data)=> {
            const {contentDetails:{itemCount}, snippet:{channelId,title,channelTitle, thumbnails:{medium:{url}}}} =data?.items[0];
            setPlayListInfo({id,itemCount,channelId,title,channelTitle,url});
        });
    }
    const history=useNavigate();
    const {itemCount,channelId,title,channelTitle,url}=playListInfo;
    useEffect(()=> {
        fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}`)
        .then((data) => {
            setChannelData(data.items[0]);
        })
    },[])
    const handleClick =()=> {
        setSelectedPlaylist(playListInfo);
        history(`/playlist/${id}`);
    }
    return ( 
        <Fragment>
            {
                type==="channel" && 
                <div className="cursor-pointer flex flex-col gap-2 bg-white">
                    {/* Playlist Image */}
                    <Link 
                    className='!no-underline w-full relative'
                    onMouseOver={()=>setShow(true)}
                    onMouseLeave={()=>setShow(false)}
                    >
                        <img
                        className='rounded-[10px] w-full object-cover'
                        src={url}  
                        alt="" />
                        <div className="bg-[#000000e0] rounded-tr-[10px] rounded-br-[10px] text-white absolute right-0 top-0 w-[45%] h-full flex flex-col justify-center items-center">
                            <span className="text-[18px]">{itemCount}</span>
                            <span className="material-symbols-outlined text-[25px]">
                            playlist_play
                            </span>
                        </div>
                        {show && 
                            <div 
                            className="bg-[#000000e0] rounded-[10px] z-20 text-white text-[13px] absolute left-0 top-0 w-full h-full flex gap-2 justify-center items-center"
                            onClick={()=>handleClick()}>
                                <span className="material-symbols-outlined">
                                play_arrow
                                </span>
                                <span>PLAY ALL</span>
                            </div>
                        }
                    </Link>
                    <div className="flex flex-col gap-2 w-full">
                        {/* Playlist Title */}
                        <Link 
                        className='!no-underline'
                        onClick={()=>handleClick()}>
                            <p className='font-medium text-black text-[14px] h-[40px] text-ellipsis whitespace-normal overflow-hidden'>
                                {title}
                            </p>
                        </Link>
                        <Link 
                        className='!no-underline text-[13px]'
                        onClick={()=>handleClick()}>
                            <span className="text-[#606060] hover:text-black">View Full playlist</span>
                        </Link>
                    </div>
                </div>
            }
            {
                type==="result" &&
                <div className="container mx-auto px-2 grid grid-cols-12 cursor-pointer gap-2 bg-white max-[500px]:flex max-[500px]:flex-col">
                    {/* Playlist Image */}
                    <Link 
                    className='!no-underline w-full relative col-span-4 '
                    onMouseOver={()=>setShow(true)}
                    onMouseLeave={()=>setShow(false)}
                    >
                        <img
                        className='rounded-[10px] w-full object-cover'
                        src={url}  
                        alt="" />
                        <div className="bg-[#000000e0] rounded-tr-[10px] rounded-br-[10px] text-white absolute right-0 top-0 w-[45%] h-full flex flex-col justify-center items-center">
                            <span className="text-[18px]">{itemCount}</span>
                            <span className="material-symbols-outlined text-[25px]">
                            playlist_play
                            </span>
                        </div>
                        {show && 
                            <div 
                            className="bg-[#000000e0] rounded-[10px] z-20 text-white text-[13px] absolute left-0 top-0 w-full h-full flex gap-2 justify-center items-center"
                            onClick={()=>handleClick()}>
                                <span className="material-symbols-outlined">
                                play_arrow
                                </span>
                                <span>PLAY ALL</span>
                            </div>
                        }
                    </Link>
                    <div className="col-span-8 max-[500px]:hidden flex flex-col gap-2">
                        {/* Playlist Title */}
                        <Link 
                        className='!no-underline'
                        onClick={()=>handleClick()}>
                            <p className='font-normal text-black text-[18px] text-ellipsis whitespace-normal overflow-hidden'>
                                {title}
                            </p>
                        </Link>
                        {/* Channel title */}
                        <Tooltip title={channelTitle} placement="top">
                            <Link 
                            className='!no-underline w-max' 
                            onClick={()=> {
                                setSelectedChannel(channelData);
                                history(`/channel/${channelId}/videos`)
                            }}>
                                <span className="text-[#606060] w-max text-[11px] transition-[0.5s] hover:text-black">
                                    {channelTitle}
                                </span>
                            </Link>
                        </Tooltip>
                        <Link 
                        className='!no-underline text-[13px]'
                        onClick={()=>handleClick()}>
                            <span className="text-[#606060] text-[11px] hover:text-black">View Full playlist</span>
                        </Link>
                    </div>
                    {/* Media Mobile View and medium screen */}
                    <div className='hidden max-[500px]:flex info w-full flex-col gap-2 px-2'>
                        <div className='grid grid-cols-12'>
                            {/* Playlist Title  */}
                            <Link 
                            className='!no-underline col-span-11 ' 
                            onClick={()=>handleClick()}>
                                <p className='text-[14px] text-black mb-[3px] whitespace-normal text-ellipsis overflow-hidden'>
                                    {title}
                                </p>
                            </Link>
                            <div className='col-span-1 flex justify-end h-[32px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.0" stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </div>
                        {/* Channel title */}
                        <Tooltip title={channelTitle} placement="top">
                            <Link 
                            className='!no-underline w-max' 
                            onClick={()=> {
                                setSelectedChannel(channelData);
                                history(`/channel/${channelId}/videos`)
                            }}>
                                <span className="text-[#606060] text-[11px] transition-[0.5s] hover:text-black">
                                    {channelTitle}
                                </span>
                            </Link>
                        </Tooltip>
                        <Link 
                        className='!no-underline text-[13px]'
                        onClick={()=>handleClick()}>
                            <span className="text-[#606060] text-[11px] hover:text-black">View Full playlist</span>
                        </Link>
                    </div>
                </div>
            }
        </Fragment>
    );
}
export default Playlist;