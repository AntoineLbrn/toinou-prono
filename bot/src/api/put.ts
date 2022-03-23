import axios from 'axios';
import ApiError from './errors/ApiError'

const put = async (url: string, body: any) => {
    return axios.put(`${process.env.API_URL}/${url}`, body, {
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

export default put;
