import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Video from "../Components/Video";
import { fetchFromAPI } from "./api/fetchFromAPI";
import VideoDetails from "../Components/VideoDetails";

const Watch = ({selectedVideo,selectedChannel}) => {
    const { id } = useParams();
    const [relatedVideos,setRelatedVideos] = useState(null);
    const getRelatedVideo =()=> {
        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=8`)
        .then((data)=> {
            setRelatedVideos(data.items);
            localStorage.setItem(`realtedVideos-${id}`,JSON.stringify(data.items));
        })
    }
    useEffect(()=> {
        const storedRelatedVideos =localStorage.getItem(`realtedVideos-${id}`);
        if(storedRelatedVideos) setRelatedVideos(JSON.parse(storedRelatedVideos));
        else getRelatedVideo();
    },[])
    const videoList = relatedVideos?.map(item => (
        <Video videoId={item.id.videoId} channelId={item.snippet.channelId} dir='colSmall' key={item.id.videoId}/>
    ))
    return ( 
        <Fragment>
            <div className="grid grid-cols-5 gap-4 mt-[70px] mb-[20px]">
                <div className="col-span-3 mx-[70px] max-[1100px]:mx-[20px] max-[1100px]:col-span-5 max-[500px]:mx-0">
                    <VideoDetails videoId={id} selectedVideo={selectedVideo} selectedChannel={selectedChannel} />
                </div>
                <div className="col-span-2 mx-[70px] max-[1100px]:mx-[20px] max-[500px]:mx-[0px] flex flex-col gap-3 max-[1100px]:col-span-5">
                    {videoList}
                </div>
            </div>
        </Fragment>
    );
}
export default Watch;
