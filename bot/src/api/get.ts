import axios from 'axios';
import ApiError from './errors/ApiError';

const get = async (url: string) => {
    return axios.get(`${process.env.API_URL}/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${process.env.API_KEY}`,
        },
    }).then((res) => {
        return res.data;
    }).catch((err) =>{
        throw new ApiError(err.response.statusText);
    });
}

export default get;
