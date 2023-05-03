import ChannelNavbar from "./ChannelNavbar"

const ChanneLayout = ({children}) => {
    return ( 
        <div className="flex flex-col w-screen">
            <ChannelNavbar/>
            {children}
        </div>
    );
}
export default ChanneLayout;