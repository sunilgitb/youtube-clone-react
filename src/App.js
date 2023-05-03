import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Library from './pages/Library';
import PlaylistPage from './pages/PlaylistPage';
import Result from './pages/Results';
import Shorts from './pages/Shorts';
import Subscriptions from './pages/Subscriptions';
import { createContext, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import MainLayout from './Components/MainLayout';
import ChannelVideos from './pages/ChannelVideos';
import ChannelLive from './pages/ChannelLive';
import ChannelPlaylist from './pages/ChannelPlaylists';
import ChannelAbout from './pages/ChannelAbout';
import Watch from './pages/Watch';

export const DataContext =createContext();

function App() {
  const [isExpand ,setIsExpand] = useState(1);
  const [isExpandMedia,setIsExpandMedia] =useState(0);
  const [dataAPI,setDataAPI] =useState([]);
  const [searchWord,setSearchWord] =useState('');
  const [filterWord,setFilterWord] =useState('ALL');
  const [selectedVideo,setSelectedVideo] = useState(null);
  const [selectedChannel,setSelectedChannel] = useState(null);
  const [selectedPlaylist,setSelectedPlaylist] = useState(null);
  const[isSelectedForSideBar,setIsSelectedForSideBar] =useState(1);
  const[isSelectedForChannelBar,setIsSelectedForChannelBar] =useState(1);
  const queryExpand =useMediaQuery('(max-width:1100px)');
  const queryNotExpand =useMediaQuery('(min-width:791px) and (max-width:1100px)');
  const queryHide =useMediaQuery('(max-width:790px)');
  let marginValue,widthFilterbar;
  if(!queryExpand) {
      if(isExpand) {
        marginValue='240px';
        widthFilterbar='81.7%';
      }
      else {
        marginValue='70px';
        widthFilterbar='94%';
      }
  }
  else if(queryNotExpand) {
    marginValue='70px';
    widthFilterbar='94%';
  } 
  else if(queryHide){
    marginValue='0px';
    widthFilterbar='98%';
  }
  
  return (
    <DataContext.Provider value={{
      queryExpand,searchWord,isSelectedForSideBar,setIsSelectedForSideBar,isExpand,setIsExpand,
      widthFilterbar,isExpandMedia,setIsExpandMedia,setSearchWord,marginValue,
      dataAPI,setDataAPI,setSelectedVideo,selectedVideo,setSelectedChannel,
      selectedChannel,isSelectedForChannelBar,setIsSelectedForChannelBar,
      selectedPlaylist,setSelectedPlaylist,filterWord,setFilterWord
    }}>
      <MainLayout>
        <div className="App">
            <Routes>
              <Route path="/" element={ <Home/> } />
              <Route path="/result" element={ <Result/> } />
              <Route path="/watch/:id" element={ <Watch/> } />
              <Route path="/history" element={ <History/> } />
              <Route path="/library" element={ <Library/> } />
              <Route path="/shorts" element={ <Shorts/> } />
              <Route path="/subscriptions" element={ <Subscriptions/> } />
              <Route path="/playlist/:id" element={ <PlaylistPage/> } />
              <Route path="/channel/:id/videos" element={ <ChannelVideos/> } />
              <Route path="/channel/:id/live" element={ <ChannelLive/> } />
              <Route path="/channel/:id/playlists" element={ <ChannelPlaylist/> } />
              <Route path="/channel/:id/about" element={ <ChannelAbout/> } />
            </Routes>
        </div>
      </MainLayout>
    </DataContext.Provider>
  );
}

export default App;
