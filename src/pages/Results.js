import Video from '../Components/Video';
import { useEffect, Fragment, useContext } from 'react';
import { fetchFromAPI } from './api/fetchFromAPI';
import { DataContext } from '../App';
import Channel from '../Components/Channel';
import Playlist from '../Components/Playlist';

const Result = () => {
    const {dataAPI,searchWord,marginValue,setDataAPI,setSelectedVideo,setSelectedChannel} =useContext(DataContext);
    const getResult = ()=> {
        fetchFromAPI(`search?q=${searchWord}&type=channel,video,playlist&part=snippet&maxResult=6`)
        .then((data)=> {
            console.log(data.items);
            setDataAPI([...data.items]);
            localStorage.setItem(`result-${searchWord}`,JSON.stringify([...data.items]));
        });
    }
    useEffect(()=> {
        const storedResult =localStorage.getItem(`result-${searchWord}`);
        if(storedResult) setDataAPI(JSON.parse(storedResult));
        else getResult();
    },[searchWord])
    const resultList = Array.isArray(dataAPI)?
    dataAPI.map(item => {
        if (item.id.kind === "youtube#video")
            return <Video videoId={item.id.videoId} channelId={item.snippet.channelId} dir='col' setSelectedVideo={setSelectedVideo} setSelectedChannel={setSelectedChannel} key={item.id.videoId}/>
        else if (item.id.kind ==="youtube#channel")
            return <Channel channelData={item} key={item.id.channelId}/>
        else {
            return <Playlist playListData={item} id={item.id.playlistId} key={item.id} type='result'/>
        }
    }):null
    return ( 
        <Fragment>
            <div 
            className="result w-full mt-[70px] text-black"
            style={{marginLeft:marginValue}}
            >
                <button className='p-2 text-[15px] flex gap-2 items-center transition-[0.6s] rounded-[20px] hover:bg-[#0000001A]'>
                    <span className="material-symbols-outlined">
                    tune
                    </span>
                    Filters
                </button>
                <hr className='mb-[20px]'/>
                <div className="videoList flex flex-col gap-y-5 pb-5">
                    {resultList}
                </div>
            </div>
        </Fragment>
    );
}
export default Result;