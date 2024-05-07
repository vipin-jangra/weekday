import axios from 'axios';

export const jobsList = async(payload)=>{
   
    try {
        const {data} = await axios.post('https://api.weekday.technology/adhoc/getSampleJdJSON',payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}