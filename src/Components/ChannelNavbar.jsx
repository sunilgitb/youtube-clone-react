import { Link } from "@mui/material";
import numeral from "numeral";
import { listChannel } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { fetchFromAPI } from "../pages/api/fetchFromAPI";
import { DataContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const ChannelNavbar = () => {
    const {selectedChannel,marginValue,isSelectedForChannelBar,setIsSelectedForChannelBar} =useContext(DataContext);
    const { id } = useParams();
    const history=useNavigate();
    const [channelInfo,setChannelInfo] =useState({});
    const getChannelNavData =()=> {
        if(selectedChannel) {
            const {snippet: {title ,customUrl , description, thumbnails:{ medium:{ url:channelUrl }}} ,statistics:{subscriberCount,videoCount} } =selectedChannel;
            setChannelInfo({title,customUrl,description,channelUrl,subscriberCount,videoCount})
        }
        else {
            fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
            .then((data) => {
                if(data) {
                    const {snippet: {title ,customUrl , description, thumbnails:{ medium:{ url:channelUrl }}} ,statistics:{subscriberCount,videoCount} } =data?.items[0];
                    localStorage.setItem(`channel-${id}-navbar`,JSON.stringify(data?.items[0]));
                    setChannelInfo({title,customUrl,description,channelUrl,subscriberCount,videoCount})
                }
            })
        }
    }   
    useEffect(()=> {
        const storedNav=localStorage.getItem(`channel-${id}-navbar`);
        if(storedNav) {
            const {snippet: {title ,customUrl , description, thumbnails:{ medium:{ url:channelUrl }}} ,statistics:{subscriberCount,videoCount} } =JSON.parse(storedNav);
            setChannelInfo({title,customUrl,description,channelUrl,subscriberCount,videoCount})
        }
        else getChannelNavData();
    },[])
    const {title,customUrl,description,channelUrl,subscriberCount,videoCount}= channelInfo;
    return ( 
        <div className="mt-[70px] mb-[10px]"
            style={{
            marginLeft:marginValue,
            }}>
                <div className="w-full flex gap-5 items-center px-[40px] mb-[20px] max-[700px]:flex-col max-[450px]:flex-col max-[500px]:px-[15px]">
                    <img className="max-[700px]: w-[130px] rounded-[50%] object-over" src={channelUrl} alt=""/>
                    <div className='info flex flex-col gap-1 mt-[15px] max-[700px]:text-center'>
                        <h1 className="text-[23px]">{title}</h1>
                        <div className='flex gap-1 max-[700px]:mx-auto max-[380px]:flex-col text-[#606060] text-[14px]'>
                            <span className='font-semibold'>
                                {customUrl}
                            </span>
                            <div className='flex gap-1'>
                                <span>
                                    {numeral(subscriberCount).format('0.0a')} subscribers
                                </span>
                                <span>
                                    {numeral(videoCount).format('0.a')} videos
                                </span>
                            </div>
                        </div>
                        <Link 
                        onClick={()=> {
                            setIsSelectedForChannelBar(4);
                            history(`/channel/${id}/about`);
                        }}
                        className='flex items-center !no-underline cursor-pointer mr-0 mt-[10px] text-[14px]'>
                            <p className="h-[20px] text-[#606060] whitespace-normal text-ellipsis overflow-hidden">
                                {description}
                            </p>
                            <div className='text-[#606060] flex justify-center items-center'>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_right
                                </span>
                            </div>
                        </Link>
                    </div>
                    <button className='font-medium text-white rounded-full justify-end bg-[#0f0f0f] hover:bg-[#0f0f0fe9] py-[7px] px-[15px] text-[15px] border-none cursor-pointer max-[450px]:mx-auto'>
                        Subscribe
                    </button>
                </div>
                <ul className="flex gap-5 px-[60px] max-[550px]:px-[10px] max-[450px]:px-0">
                    {listChannel.map( el=> (
                        <Link 
                        onClick={()=> {
                            setIsSelectedForChannelBar(el.id)
                            history(`/channel/${id}/${el.link}`)
                        }}
                        className={`${el.id == isSelectedForChannelBar?'border-b-2 border-black border-solid':null} !no-underline cursor-pointer text-[14px] p-5 max-[450px]:p-3 `}
                        key={el.id}>
                            <li className={`${el.id == isSelectedForChannelBar?'text-black':'text-[#606060] hover:text-black'}`}>{el.label}</li>
                        </Link>
                    ))}
                </ul>
                <hr/>
        </div>
    );
}
export default ChannelNavbar;