import { useContext, useEffect, useState } from "react";
import { Link, Tooltip, useMediaQuery } from "@mui/material";
import { fetchFromAPI } from "../pages/api/fetchFromAPI";
import { DataContext } from "../App";

const PlaylistDetails = ({id}) => {
    const [show,setShow] =useState(false);
    const [playListInfo,setPlayListInfo] =useState({});
    const {selectedPlaylist} =useContext(DataContext);
    const queryPage=useMediaQuery('(max-width:1100px)');
    const getPlayListData=()=> {
        if(selectedPlaylist) {
            setPlayListInfo(selectedPlaylist)
        }
        else {
            fetchFromAPI(`playlists?part=snippet,contentDetails&id=${id}`)
            .then((data) => {
                if(data) {
                    const {contentDetails:{itemCount}, snippet:{title,channelTitle, thumbnails:{medium:{url}}}} =data?.items[0];
                    localStorage.setItem(`playlist-${id}`,JSON.stringify(data?.items[0]));
                    setPlayListInfo({itemCount,title,channelTitle,url})
                }
            })
        }
    }
    useEffect(()=> {
        getPlayListData();
    },[])
    const {itemCount,title,channelTitle,url} =playListInfo;
    return ( 
        <div className={queryPage?
            "overflow-hidden max-[600px]:flex max-[600px]:flex-col":
            "fixed max-w-[350px] h-[85%] overflow-hidden ml-[30px] rounded-[10px] "
        }>
            {/* Playlist bg */}
            <div 
            className='playlist-bg relative w-full h-full p-[30px] flex flex-col text-white max-[1100px]:gap-8 max-[1100px]:py-[30px] max-[1100px]:px-[10p] max-[600px]:flex-col'
            style={{backgroundImage:`url(${url})`}}
            >
                {/* Playlist Image */}
                <Link
                    className='no-underline cursor-pointer relative w-[300px] max-[1100px]:w-[350px] max-[1100px]:!mx-auto max-[400px]:w-[250px]'
                    onMouseOver={()=>setShow(true)}
                    onMouseLeave={()=>setShow(false)}
                    >
                        <img
                        className='rounded-[10px] w-full object-cover'
                        src={url}  
                        alt="" />
                        {show && 
                            <div className="bg-[#000000e0] rounded-[10px] z-50 text-white text-[13px] absolute left-0 top-0 w-full h-full flex gap-2 justify-center items-center">
                                <span className="material-symbols-outlined">
                                play_arrow
                                </span>
                                <span>PLAY ALL</span>
                            </div>
                        }
                </Link>
                <div className="flex flex-col z-10">
                    <h1 className="font-medium text-[25px] my-[15px]">{title}</h1>
                    <Tooltip title={channelTitle} placement="top">
                        <Link className='!no-underline cursor-pointer w-max'>
                            <span className="text-white text-[15px]">
                                {channelTitle}
                            </span>
                        </Link>
                    </Tooltip>
                    <span className="text-[14px] text-[#ffffffb3]">{itemCount} videos</span>
                    <div className="btn-group flex gap-3 my-4">
                        <Tooltip title='Save playlist' placement="bottom">
                            <button className='glass-bg w-[35px] h-[35px] flex justify-center items-center rounded-[100%]'>
                                <span className="material-symbols-outlined">
                                playlist_add
                                </span>
                            </button>
                        </Tooltip>
                        <Tooltip title='Share' placement="bottom">
                            <button className='glass-bg w-[35px] h-[35px] flex justify-center items-center rounded-[100%]'>
                                <span className="material-symbols-outlined text-[25px]">
                                reply
                                </span>
                            </button>
                        </Tooltip>
                    </div>
                    <div className="btn-group text-[15px] flex gap-3 w-full">
                        <button className="w-full flex justify-center items-center py-[5px] rounded-[30px] bg-white text-black flex gap-3">
                            <span className="material-symbols-outlined">
                                play_arrow
                            </span>
                            Play all
                        </button>
                        <button className="w-full flex justify-center items-center glass-bg py-[5px] rounded-[30px] text-white flex gap-3">
                            <span className="material-symbols-outlined">
                            shuffle
                            </span>
                            Shuffle
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default PlaylistDetails;