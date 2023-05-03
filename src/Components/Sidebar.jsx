import { Fragment } from 'react';
import { list1, list2, list3, list4, list5 } from '../utils/constants';
import { useMediaQuery, Link } from '@mui/material';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { DataContext } from '../App';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    const {isSelectedForSideBar,setIsSelectedForSideBar,isExpand,isExpandMedia,setIsExpandMedia} =useContext(DataContext);
    const location =useLocation();
    const {pathname} = location;
    const queryExpand =useMediaQuery('(max-width:1100px)');
    const queryNotExpand =useMediaQuery('(min-width:791px) and (max-width:1100px)');
    const queryHide =useMediaQuery('(max-width:790px)');
    return (
        <Fragment>
            {(!pathname.includes('/watch') && isExpand && !queryExpand) &&
                <div className='h-screen mt-[70px] fixed left-0 top-0 bg-white text-black w-[240px] overflow-hidden hover:overflow-y-scroll'>
                        <div className="content pb-[80px] px-2 pt-3 flex flex-col gap-1">
                        {
                            list1.map(el => (
                                <Link 
                                href={el.link}
                                className={el.id === isSelectedForSideBar?
                                    "text-black font-medium text-[16px] !no-underline rounded-[10px] p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3":
                                    "text-black !no-underline rounded-[10px] p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3"
                                } 
                                key={el.id}
                                onClick={()=>setIsSelectedForSideBar(el.id)}
                                >
                                    <div className="icon text-black flex justify-center items-center">{el.iconOutLined}</div>
                                    <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                </Link>
                            ))
                        }
                        <hr className='w-[220px] my-1' />
                        {
                            list2.map(el => (
                                <Link 
                                href={el.link} 
                                className={el.id === isSelectedForSideBar?
                                    "text-black font-medium text-[16px] !no-underline rounded-[10px] p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3":
                                    "text-black !no-underline rounded-[10px] p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3"
                                } 
                                key={el.id}
                                onClick={()=>setIsSelectedForSideBar(el.id)}
                                >
                                    <div className="icon text-black flex justify-center items-center">{el.iconOutLined}</div>
                                    <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                </Link>
                            ))
                        }
                        <hr className='w-[220px] my-1' />
                        <div className="py-2 px-4 flex flex-col w-[220px]">
                            <p className='mb-2 text-[14px]'>Sign in to like videos, comment, and subscribe.</p>
                            <div className="flex items-center justify-center gap-1 text-[15px] rounded-[25px] p-[10px] w-max text-[#065fd4] cursor-pointer hover:bg-[#5094ed29] border border-solid border-[#ccc]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Sign in</span>
                            </div>
                        </div>
                        <hr className='w-[220px] my-1' />
                            <h6 className='fw-bold px-3'>Explore</h6>
                            {
                                list3.map(el => (
                                    <Link 
                                    href={el.link} 
                                    className={el.id === isSelectedForSideBar?
                                        "text-black font-medium text-[16px] !no-underline rounded-[10px] p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3":
                                        "text-black !no-underline rounded-[10px] p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3"
                                    } 
                                    key={el.id}
                                    onClick={()=>setIsSelectedForSideBar(el.id)}
                                    >
                                        <div className="icon text-black flex justify-center items-center">{el.iconOutLined}</div>
                                        <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                    </Link>
                                ))
                            }
                        <hr className='w-[220px] my-1' />
                        <div className="rounded-[10px] cursor-pointer p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3" >
                            <span className="material-symbols-outlined">
                            add_circle
                            </span>
                            <span className='w-[75%] text-[14px] text-black'>Browse Channels</span>
                        </div>
                        <hr className='w-[220px] my-1' />
                        {
                                list4.map(el => (
                                    <Link 
                                    href={el.link} 
                                    className={el.id === isSelectedForSideBar?
                                        "text-black font-medium text-[16px] !no-underline rounded-[10px] p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3":
                                        "text-black !no-underline rounded-[10px] p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3"
                                    } 
                                    key={el.id}
                                    onClick={()=>setIsSelectedForSideBar(el.id)}
                                    >
                                        <div className="icon text-black flex justify-center items-center">{el.iconOutLined}</div>
                                        <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                    </Link>
                                ))
                        }
                        <hr className='w-[220px] my-1' />
                        <div className="text-[#606060] text-[13px] px-3 flex flex-col gap-2 w-[220px]">
                            <p>About Press Copyright Contact us Creators Advertise Developers</p>
                            <p>Terms Privacy Policy & Safety How YouTube worksTest new features</p>
                            <span className='text-[#909090] text-[12px]'>© 2023 Google LLC</span>
                        </div>
                        </div>
                </div>
            }
            {
                (!pathname.includes('/watch') && (!isExpand || queryNotExpand) && !queryHide ) &&
                <div className="bg-white h-screen w-[70px] mt-[70px] fixed left-0 top-0">
                    <div className="content text-[14px] px-1 pt-3 flex flex-col gap-3">
                        {
                            list5.map(el => (
                                <Link
                                href={el.link} 
                                className={el.id ==isSelectedForSideBar?
                                    "rounded-[10px] cursor-pointer text-black !no-underline text-[10px] px-[5px] py-[15px] bg-[#f8f8f8] flex flex-col items-center justify-center gap-1":
                                    "rounded-[10px] cursor-pointer text-black !no-underline text-[10px] px-[5px] py-[15px] hover:bg-[#f8f8f8] flex flex-col items-center justify-center gap-1"
                                } 
                                key={el.label}
                                >
                                    <div className="icon text-black flex justify-center items-center">{el.iconOutLined}</div>
                                    <span className='fw-bold text-black text-[11px]'>{el.label}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            }
            {
                (pathname.includes('/watch') || queryHide || queryNotExpand  ) &&
                <Fragment>
                    <div className={`sidebar ${isExpandMedia?'open':'close'}`}>
                        <div className="flex items-center w-[220px] px-5 pt-3 gap-3">
                            <IconButton
                            className='hvr-icon mr-0'
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={()=> {
                                setIsExpandMedia(0);
                                document.body.classList.remove("open-sidebar");
                            }}
                            >
                                <span className="material-symbols-outlined">
                                menu
                                </span>
                            </IconButton>
                            <Link href='/' className='mx-[18px] flex items-center justify-center w-[90px] h-[20px]'>
                                <img className='logo-youtube w-full' src="/logo-you.png" alt="hd youtube logo image 5 @transparentpng.com"></img>
                            </Link>
                        </div>
                        <div className="content pb-3 px-2 pt-3 flex flex-col gap-1">
                        {
                            list1.map(el => (
                                <Link
                                href={el.link} 
                                className={el.id === isSelectedForSideBar?
                                    "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center":
                                    "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center"
                                } 
                                key={el.id}
                                onClick={()=>setIsSelectedForSideBar(el.id)}
                                >
                                    <div className="icon text-black flex justify-center items-center mr-[12px]">{el.iconOutLined}</div>
                                    <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                </Link>
                            ))
                        }
                        <hr className='w-[220px] my-1' />
                        {
                            list2.map(el => (
                                <Link
                                href={el.link} 
                                className={el.id === isSelectedForSideBar?
                                    "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center":
                                    "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center"
                                } 
                                key={el.id}
                                onClick={()=>setIsSelectedForSideBar(el.id)}
                                >
                                    <div className="icon text-black flex justify-center items-center mr-[12px]">{el.iconOutLined}</div>
                                    <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                </Link>
                            ))
                        }
                        <hr className='w-[220px] my-1' />
                        <div className="py-2 px-4 flex flex-col w-[220px]">
                            <p className='mb-2 text-[14px]'>Sign in to like videos, comment, and subscribe.</p>
                            <div className="flex items-center justify-center gap-1 text-[15px] rounded-[25px] p-[10px] w-max text-[#065fd4] cursor-pointer hover:bg-[#5094ed29] border border-solid border-[#ccc]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Sign in</span>
                            </div>
                        </div>
                        <hr className='w-[220px] my-1' />
                            <h6 className='fw-bold px-3'>Explore</h6>
                            {
                                list3.map(el => (
                                    <Link
                                    href={el.link} 
                                    className={el.id === isSelectedForSideBar?
                                        "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center":
                                        "rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center"
                                    } 
                                    key={el.id}
                                    onClick={()=>setIsSelectedForSideBar(el.id)}
                                    >
                                        <div className="icon text-black flex justify-center items-center mr-[12px]">{el.iconOutLined}</div>
                                        <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                    </Link>
                                ))
                            }
                        <hr className='w-[220px] my-1' />
                        <div className="rounded-[10px] cursor-pointer text-black !no-underline p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center gap-3" >
                            <span className="material-symbols-outlined">
                            add_circle
                            </span>
                            <span className='w-[75%] text-[14px] text-black'>Browse Channels</span>
                        </div>
                        <hr className='w-[220px] my-1' />
                        {
                                list4.map(el => (
                                    <Link
                                    href={el.link} 
                                    className={el.id === isSelectedForSideBar?
                                        "rounded-[10px] cursor-pointer text-black !no-underline text-black !no-underline p-[10px] select-none bg-[#f8f8f8] w-[220px] flex items-center justify-center":
                                        "rounded-[10px] cursor-pointer text-black !no-underline text-black !no-underline p-[10px] select-none hover:bg-[#f8f8f8] w-[220px] flex items-center justify-center"
                                    } 
                                    key={el.id}
                                    onClick={()=>setIsSelectedForSideBar(el.id)}
                                    >
                                        <div className="icon text-black flex justify-center items-center mr-[12px]">{el.iconOutLined}</div>
                                        <span className='w-[75%] text-[14px] text-black'>{el.label}</span>
                                    </Link>
                                ))
                        }
                        <hr className='w-[220px] my-1' />
                        <div className="text-[#606060] text-[13px] px-3 flex flex-col gap-2 w-[220px]">
                            <p>About Press Copyright Contact us Creators Advertise Developers</p>
                            <p>Terms Privacy Policy & Safety How YouTube worksTest new features</p>
                            <span className='text-[#909090] text-[12px]'>© 2023 Google LLC</span>
                        </div>
                        </div>
                    </div>
                    <div className={`overlay ${isExpandMedia?'show':null} `}
                    ></div>
                </Fragment>
            }
        </Fragment>
        
    );
}

export default Sidebar;