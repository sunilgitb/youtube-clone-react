import { useContext, useEffect, useState } from "react";
import { DataContext } from '../App';
import dateFormat from "dateformat";
import numeral from "numeral";
import { countries } from "country-data";
import ChanneLayout from "../Components/ChannelLayout";
import { fetchFromAPI } from "./api/fetchFromAPI";
import { useParams } from "react-router-dom";

const ChannelAbout = () => {
    const {selectedChannel,marginValue,setIsSelectedForChannelBar} =useContext(DataContext);
    const { id } = useParams();
    const [channelInfo,setChannelInfo] =useState({});
    const getAboutdata=()=> {
        if(selectedChannel) {
            const {snippet:{description,publishedAt,country},statistics:{viewCount}} =selectedChannel;
            setChannelInfo({description,publishedAt,country,viewCount})
        }
        else {
            fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
            .then((data) => {
                if(data) {
                    const {snippet:{description,publishedAt,country},statistics:{viewCount}} =data?.items[0];
                    localStorage.setItem(`channel-${id}-about`,JSON.stringify(data?.items[0]));
                    setChannelInfo({description,publishedAt,country,viewCount})
                }
            })
        }
    }
    useEffect(()=> {
        setIsSelectedForChannelBar(4);
        const storedAbout = localStorage.getItem(`channel-${id}-about`);
        if(storedAbout) {
            const {snippet:{description,publishedAt,country},statistics:{viewCount}} = JSON.parse(storedAbout);
            setChannelInfo({description,publishedAt,country,viewCount});
        }
        else getAboutdata()
    },[])
    const {description, publishedAt, country, viewCount}=channelInfo;
    console.log(countries)
    console.log(channelInfo)
    return ( 
        <ChanneLayout>
            <div className="px-[50px] pb-[30px] pt-[10px] mt-[30px] max-[600px]:px-2 max-[600px]:flex max-[600px]:flex-col max-[600px]:gap-[20px]"
                style={{
                marginLeft:marginValue
                }}> 
                    <div className="grid grid-cols-3 max-[600px]:gap-[20px]">
                        <div className="desc text-[14px] whitespace-pre-wrap col-span-2 pl-[20px] pr-[25px]">
                            <h1 className="text-[17px] font-normal mb-[20px]">Description</h1>
                            {description?.length===0?"There is no description":description}
                        </div>
                        <div className="stats text-[14px] col-span-1 max-[600px]:col-span-2 flex flex-col gap-3 pl-[20px]">
                            <h1 className="text-[17px] font-normal">Stats</h1>
                            <hr className="max-[600px]:hidden"/>
                            <p>Joined {dateFormat(publishedAt,"mmmm d, yyyy")}</p>
                            <hr className="max-[600px]:hidden"/>
                            <p>{numeral(viewCount).format()} views</p>
                            <hr className="max-[600px]:hidden"/>
                        </div>
                        <hr className="col-span-2 my-[30px] max-[600px]:hidden"/>
                    </div>
                    <div className="details pl-[20px] pr-[25px] max-[600px]:pr-0 text-[13px] text-[#606060]">
                        <h1 className="text-black text-[17px] font-normal mb-[20px]">Details</h1>
                        <span className="mr-[25px]">Location:</span>
                        {console.log(country)}
                        <span>{country?countries[country].name:null}</span>
                    </div>
                    <hr className="w-[67%] mt-[30px] mb-[20px] max-[600px]:hidden"/>
            </div>
        </ChanneLayout>
    );
}
export default ChannelAbout;