import { useMediaQuery } from "@mui/material";
import { useContext ,useState ,useEffect } from "react";
import { DataContext } from '../App';
import { fetchFromAPI } from "./api/fetchFromAPI";
import Playlist from "../Components/Playlist";
import ChanneLayout from "../Components/ChannelLayout";
import { useParams } from "react-router-dom";

const ChannelPlaylist = () => {
    const {marginValue,setIsSelectedForChannelBar} = useContext(DataContext);
    const [channelPlayLists,setChannelPlayLists] =useState([]);
    const query=useMediaQuery('(max-width:700px)');
    const { id } = useParams();
    const getChannelPlayList =()=> {
        try {
            fetchFromAPI(`playlists?channelId=${id}&part=snippet,contentDetails&maxResults=3`)
            .then((data)=> {
                setChannelPlayLists([...data.items]);
                localStorage.setItem(`channel-${id}-playlists`,JSON.stringify([...data.items]));
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=> {
        setIsSelectedForChannelBar(3);
        const storedChannelPlaylists =localStorage.getItem(`channel-${id}-playlists`);
        if(storedChannelPlaylists) setChannelPlayLists(JSON.parse(storedChannelPlaylists));
        else getChannelPlayList();
    },[])
    const playlists = channelPlayLists?.map(item => (
        <Playlist playListData={item} id={item.id}  key={item.id} type='channel'/>
    ))
    return ( 
        <ChanneLayout>
            <div className="px-[50px] pb-[30px] pt-[10px]"
                style={{
                marginLeft:query?'auto':marginValue,
                marginRight:query?'auto':null
                }}> 
                    <h1 className="mb-[20px] text-[18px] font-normal">Created playlists</h1>
                    <div className="playlists grid place-content-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:items-center gap-y-3 gap-x-3 px-5 pb-5">
                            {playlists}
                    </div>
                </div>
        </ChanneLayout> 
    );
}
export default ChannelPlaylist;