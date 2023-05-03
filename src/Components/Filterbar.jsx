import { Swiper, SwiperSlide } from 'swiper/react';
import { Fragment, useRef, useState} from 'react';
import { Pagination, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/a11y';
import 'swiper/css/controller';
import { listFilterBar } from '../utils/constants';
import { useContext } from 'react';
import { DataContext } from '../App';
import { useLocation } from 'react-router-dom';

const Filterbar = () => {
    const {marginValue,setFilterWord} =useContext(DataContext);
    const[isSelected,setIsSelected] =useState(1);
    const handleSelect= (e)=> {
        setFilterWord(e.value);
        setIsSelected(e.id);
    }
    const location =useLocation();
    const {pathname} = location;
    const swiperRef = useRef();
    return (
        <Fragment>
            {pathname == '/' && 
                <div 
                className="filter max-w-full mx-auto px-2 mt-[70px] fixed top-0 left-0 bg-white h-[50px] z-20 flex items-center"
                style={{
                    marginLeft:marginValue,
                }}
                >
                    <Swiper
                    modules={[Pagination, A11y]}
                    slidesPerView="auto"
                    spaceBetween={12}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    >
                    {listFilterBar.map(item => (
                        <SwiperSlide 
                        key={item.value}
                        onClick={()=>handleSelect(item)}
                        >
                            <div
                            className={item.id ===isSelected?
                                'text-white bg-black cursor-pointer rounded-lg w-max p-[10px] py-[7px] text-[14px] flex justify-content-center items-center select-none':
                                'text-black bg-[#f8f8f8] cursor-pointer rounded-lg w-max p-[10px] py-[7px] text-[14px] hover:bg-[#0000000f] flex justify-content-center items-center select-none'
                            }
                            >
                            {item.value}
                            </div>
                        </SwiperSlide>
                    ))}
                    
                    </Swiper>
                </div> 
            }
        </Fragment>
    );
}

export default Filterbar;