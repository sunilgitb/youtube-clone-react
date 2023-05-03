import numeral from "numeral";
import { Fragment, useEffect, useState } from "react";
import { fetchFromAPI } from "../pages/api/fetchFromAPI";

const Channel = ({channelData}) => {
    const {id:{channelId}, snippet:{channelTitle,description,thumbnails:{medium:{url}}}}= channelData;
    const [channelDataAPI,setChannelDataAPI] = useState(null);
    useEffect(() => { 
        fetchFromAPI(`channels?part=snippet,statistics&id=${channelId}`)
        .then((data) => {
            data && setChannelDataAPI(data.items[0]);
            channelDataAPI && console.log('tttt',channelDataAPI);
        })
    }, [])
    return ( 
        <Fragment>
            <div className="flex items-center px-5 ml-[100px] max-[720px]:ml-0">
                <img className='w-[130px] mr-[50px] max-[420px]:mr-[20px]' src={url} alt="channel-image"/>
                <div className="info flex flex-col">
                    <h1 className='text-[18px] mb-[5px]'>{channelTitle}</h1>
                    <p className="text-[13px] text-[#606060] flex flex-wrap items-center gap-[3px] my-[3px]">
                        <span>{channelDataAPI?.snippet.customUrl}</span>
                        <span className='text-[14px]'>•</span>
                        <span className="w-max">{numeral(channelDataAPI?.statistics.subscriberCount).format('0.0a').toUpperCase()} subscribers</span>
                    </p>
                    <p className="text-[13px] text-[#606060] whitespace-normal text-ellipsis overflow-hidden h-[100px]">{description}</p>
                </div>
                <button className='text-white rounded-full bg-[#0f0f0f] hover:bg-[#0f0f0fe9] py-[7px] px-[15px] ml-[50px] text-[15px] border-none cursor-pointer max-[720px]:hidden max-[720px]:ml-0'>
                        Subscribe
                </button>
            </div>
            <hr className='mb-[10px]'/>
        </Fragment>
    );
}
export default Channel;