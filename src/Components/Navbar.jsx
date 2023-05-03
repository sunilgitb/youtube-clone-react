import Tooltip from '@mui/material/Tooltip';
import { useMediaQuery,Link } from '@mui/material';
import { Fragment, useContext, useRef, useState } from 'react';
import { DataContext } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
const Navbar = () => {
    const {queryExpand,setIsExpand,isExpand,setSearchWord,setIsExpandMedia,isExpandMedia} =useContext(DataContext);
    const location =useLocation();
    const {pathname} = location;
    const history =useNavigate();
    const [hide,setHide] =useState(true);
    const [focus,setFocus] =useState(0);
    const [toggleSearch,setToggleSearch] =useState(false);
    const querySearch = useMediaQuery('(max-width:650px)');
    const inputRef1 = useRef("");
    const inputRef2 = useRef("");
    const handleChange1 = () => {
        if(inputRef1.current.value.length > 0) setHide(false);
        else if(inputRef1.current.value === "") setHide(true);
    };
    const submit1 =(e)=> {
        e.preventDefault();
        setSearchWord(inputRef1.current.value);
        history('/result');
    }
    const handleClear1 =()=>{
        inputRef1.current.value="";
        setHide(1);
    }
    const handleChange2 = () => {
        if(inputRef2.current.value.length > 0) setHide(false);
        else if(inputRef2.current.value === "") setHide(true);
    };
    const submit2 =(e)=> {
        e.preventDefault();
        setSearchWord(inputRef2.current.value);
        history('/result');
    }
    const handleClear2 =()=>{
        inputRef2.current.value="";
        setHide(1);
    }
    const queryhideVoicIcon=useMediaQuery('(max-width:430px)');
    return ( 
        <Fragment>
            {/* Navbar Main */}
            <div className={`${toggleSearch?'hidden':'flex'} fixed top-0 left-0 w-screen px-6 h-[70px] mx-0 z-[9999] bg-white text-black justify-between items-center pt-2 pb-4 max-[400px]:px-2`}>
                <div className="flex items-center justify-center gap-2">
                    <IconButton
                    className='hvr-icon mr-0'
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={()=> {
                        if(pathname.includes('/watch') || queryExpand) {
                            setIsExpandMedia(!isExpandMedia);
                            document.body.classList.add("open-sidebar");
                        }
                        else if(!queryExpand) setIsExpand(!isExpand);
                    }}
                    >
                        <span className="material-symbols-outlined">
                        menu
                        </span>
                    </IconButton>
                    <Link href='/' className='mx-[18px] w-[100px] h-[30px]'>
                        <img className='logo-youtube w-full h-full !relative object-cover' src='/logo-you.png' alt=" youtube-logo"/>
                    </Link>
                </div>
                <div className={querySearch?
                "w-[75%] flex justify-end":
                "w-[75%] flex justify-center"
                }>
                    {!querySearch && 
                        <div className='search w-[60%] flex items-center'>
                            <form 
                            className={focus?
                                'form-shadow w-full h-[90%] rounded-tl-[20px] rounded-bl-[20px] pl-[15px] flex justify-center items-center':
                                'w-full h-[90%] rounded-tl-[20px] rounded-bl-[20px] flex justify-center items-center border border-solid border-[#ccc] border-r-transparent'
                            }
                            onSubmit={submit1}
                            >
                                <div className={`${focus?'block':'hidden'} flex items-center justify-center text-black`}>
                                    <span className="material-symbols-outlined">
                                    search
                                    </span>
                                </div>
                                <input
                                onChange={handleChange1}
                                className='w-[90%] h-full px-[10px] bg-transparent border-none' 
                                type="text"
                                ref={inputRef1}
                                placeholder='Search'
                                onFocus={()=>setFocus(1)}
                                onBlur={()=>setFocus(0)}
                                />
                                {!hide && 
                                <div className='flex justify-center cursor-pointer p-[10px] items-center rounded-[50%] hover:bg-[#0000001A]'>
                                    <span 
                                    className="material-symbols-outlined"
                                    onClick={(e)=> {
                                        e.stopPropagation();
                                        handleClear1();
                                    }}>
                                    close
                                    </span>
                                </div>}
                            </form>
                            <Tooltip title="Search" placement="bottom">
                                <button 
                                className="w-[60px] h-[90%] border-l border-solid border-[#ccc] bg-[#f8f8f8] rounded-tr-[20px] rounded-br-[20px] flex items-center justify-center hover:bg-[#0000001A]"
                                onClick={submit1}
                                >
                                    <span className="material-symbols-outlined">
                                    search
                                    </span>
                                </button>
                            </Tooltip>
                        </div>
                    }
                    {querySearch &&
                        <Tooltip title="Search" placement="bottom">
                            <button 
                            className="flex justify-center items-center cursor-pointer p-[10px] rounded-[50%] hover:bg-[#0000001A]"
                            onClick={()=> setToggleSearch(true)}
                            >
                                <span className="material-symbols-outlined">
                                search
                                </span>
                            </button>
                        </Tooltip>
                    }
                    {
                        !queryhideVoicIcon &&
                        <Tooltip title="Search with your voice" placement="bottom">
                            <div className="flex justify-center items-center cursor-pointer p-[10px] rounded-[50%] hover:bg-[#0000001A]">
                                <span className="material-symbols-outlined">
                                keyboard_voice
                                </span>
                            </div>
                        </Tooltip>
                    }
                </div>
                <div className="flex items-center justify-center gap-2 max-[400px]:gap-1">
                        <Tooltip title="Settings" placement="bottom">
                            <div className="flex justify-center items-center cursor-pointer p-[10px] rounded-[50%]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                </svg>
                            </div>
                        </Tooltip>
                        <div className="text-[15px] rounded-[25px] py-[5px] px-[10px] w-max text-[#065fd4] cursor-pointer hover:bg-[#5094ed29] border border-solid border-[#ccc] flex items-center justify-center gap-1 max-[400px]:text-[13px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Sign in</span>
                        </div>
                </div>
            </div>
            {/* Media Search bar */}
            <div className={`${toggleSearch?'flex':'hidden'} fixed top-0 left-0 w-screen pr-5 pl-2 h-[70px] mx-0 z-20 bg-white text-black items-center justify-between pt-2 pb-4`}>
                <Tooltip title="Back" placement="bottom">
                    <button 
                    className="flex justify-center items-center cursor-pointer p-[10px] rounded-[50%] hover:bg-[#0000001A]"
                    onClick={()=> setToggleSearch(false)}
                    >
                        <span className="material-symbols-outlined">
                        arrow_back_ios
                        </span>
                    </button>
                </Tooltip>
                <div className='search w-[70%] h-[85%] flex'>
                    <form 
                    className={focus?
                        'form-shadow w-full rounded-tl-[20px] rounded-bl-[20px] pl-[15px] flex justify-center items-center':
                        'w-full rounded-tl-[20px] rounded-bl-[20px] flex justify-center items-center border border-solid border-[#ccc] border-r-transparent'
                    }
                    onSubmit={submit2}
                    >
                        <span className={`material-symbols-outlined ${focus?'block':'hidden'} text-black`}>
                        search
                        </span>
                        <input 
                        ref={inputRef2}
                        className='w-[90%] h-full px-[10px] bg-transparent border-none' 
                        type="text"
                        placeholder='Search'
                        onChange={handleChange2}
                        onFocus={()=>setFocus(1)}
                        onBlur={()=>setFocus(0)}
                        />
                        {!hide && 
                        <div className='flex justify-center cursor-pointer p-[10px] items-center rounded-[50%] hover:bg-[#0000001A]'>
                            <span 
                            className="material-symbols-outlined text-black"
                            onClick={(e)=> {
                                e.stopPropagation();
                                handleClear2();
                            }}>
                            close
                            </span>
                        </div>}
                    </form>
                    <Tooltip title="Search" placement="bottom">
                        <button 
                        className="w-[60px] border-l border-solid border-[#ccc] bg-[#f8f8f8] rounded-tr-[20px] rounded-br-[20px] flex items-center justify-center hover:bg-[#0000001A]"
                        onClick={submit2}
                        >
                            <span className="material-symbols-outlined text-black">
                            search
                            </span>
                        </button>
                    </Tooltip>
                    
                </div>
                <Tooltip title="Search with your voice" placement="bottom">
                    <div className="flex justify-center items-center cursor-pointer p-[10px] rounded-[50%] hover:bg-[#0000001A]">
                        <span className="material-symbols-outlined">
                        keyboard_voice
                        </span>
                    </div>
                </Tooltip>
            </div>
        </Fragment>
    );
}

export default Navbar;
