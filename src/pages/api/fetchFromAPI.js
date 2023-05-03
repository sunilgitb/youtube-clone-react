import axios from "axios";

const BaseGoogleURL ='https://www.googleapis.com/youtube/v3'

export const fetchFromAPI = async(url) => {
    const {data} =await axios.get(`${BaseGoogleURL}/${url}&key=${process.env.REACT_APP_API_KEY}`);
    return data;
}