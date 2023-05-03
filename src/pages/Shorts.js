import { useContext, useEffect } from 'react';
import { DataContext } from '../App';
const Shorts = () => {
    const {marginValue,setIsSelectedForSideBar} =useContext(DataContext);
    useEffect(() => {
        setIsSelectedForSideBar(2);
    }, [])
    return ( 
        <div 
        className="subscribe w-screen h-screen  flex flex-col gap-4 justify-center items-center col-span-4"
        style={{marginLeft:marginValue}}
        >
            <span className="material-symbols-outlined text-[130px]">
            play_circle
            </span>
            <h1 className='text-[25px] font-normal'>Is not availabe yet</h1>
        </div>
    );
}
export default Shorts;