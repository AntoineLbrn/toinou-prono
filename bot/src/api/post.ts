import axios from 'axios';
import ApiError from './errors/ApiError'
const post = async (url: string, body: any) => {
    console.log('posting')
    return axios.post(`${process.env.API_URL}/${url}`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Basic ${process.env.API_KEY}`,
        },
    }).then((res) => {
        return res.data;
    }).catch((err) => {
        throw new ApiError(err.response.statusText);
    });
}

export default post;
