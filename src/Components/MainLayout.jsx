
import { Fragment } from "react";
import Filterbar from "./Filterbar";
import  Navbar  from "./Navbar";
import Sidebar from "./Sidebar";
const MainLayout = ({children}) => {
    return ( 
        <Fragment>
            <Navbar/>
            <Filterbar />
            <div className="flex bg-white">
                <Sidebar />
                {children}
            </div>
        </Fragment>
    );
}

export default MainLayout;