import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../App";

const NotFound = () => {
    const {marginValue} = useContext(DataContext);
    const history =useNavigate();
    useEffect(()=> {
        setTimeout(() => {
            history('/');
        } ,3000);
    },[])
    return ( 
        <div 
        className="mt-[130px] bg-white flex flex-col items-center justify-center w-full h-full gap-[15px] text-black"
        style={{
            marginLeft:marginValue
        }}>
            <h1 className="text-[30px] text-black">404 - Page Not Found</h1>
            <p>Redirecting to home page...</p>
        </div>
    );
}

export default NotFound