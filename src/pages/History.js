import { useContext, useEffect } from 'react';
import { DataContext } from '../App';
const History = () => {
    const {marginValue,setIsSelectedForSideBar} =useContext(DataContext);
    useEffect(() => {
        setIsSelectedForSideBar(5);
    }, [])
    return ( 
        <div 
        className="subscribe w-screen h-screen  flex flex-col gap-4 justify-center items-center col-span-4"
        style={{marginLeft:marginValue}}
        >
            <span className="material-symbols-outlined text-[130px]">
            history
            </span>
            <h1 className='text-[25px] font-normal text-center px-2'>Keep track of what you watch</h1>
            <p className='text-[15px] text-center px-2'>Watch history is not  viewable when signed out. <a href='#'>Learn more</a></p>
            <div className="text-[15px] rounded-[25px] py-[5px] px-[10px] w-max text-[#065fd4] cursor-pointer hover:bg-[#5094ed29] border border-solid border-[#ccc] flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Sign in</span>
            </div>
        </div>
    );
}
export default History;