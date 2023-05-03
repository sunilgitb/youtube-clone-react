import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../App";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "./api/fetchFromAPI";
import PlaylistVideo from "../Components/PlaylistVideo";
import PlaylistDetails from "../Components/PlaylistDetails";

const PlaylistPage = () => {
    const {marginValue} =useContext(DataContext);
    const [playlistData ,setPlaylistData] =useState();
    const { id } = useParams();
    const getPlaylistVideos =()=> {
        try {
            fetchFromAPI(`playlistItems?playlistId=${id}&part=snippet,contentDetails&maxResults=6`)
            .then((data)=> {
                console.log("playlist data:",data.items)
                setPlaylistData(data.items);
                localStorage.setItem(`playlist-${id}`,JSON.stringify(data.items));
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        const storedPlaylist =localStorage.getItem(`playlist-${id}`);
        if(storedPlaylist) setPlaylistData(JSON.parse(storedPlaylist));
        else getPlaylistVideos();
    },[])
    const playlistVideos =playlistData?.map((item) => (
        <PlaylistVideo key={item.id} position={item.snippet.position} videoId={item.snippet.resourceId.videoId} channelId={item.snippet.channelId}/>
    ))
    return ( 
        <div 
        className='flex flex-col mt-[70px] mb-[30px] max-[790px]:!ml-0 w-screen'
        style={{
            marginLeft:marginValue,
        }}>
            <PlaylistDetails id={id}/>
            <div className='playlist-videos mt-[20px] ml-[400px] mr-[20px] flex flex-col gap-3 max-[1100px]:ml-0 max-[1100px]:mr-0'>
                {playlistVideos}
            </div>
        </div>
    );
}
export default PlaylistPage;