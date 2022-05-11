import axios from 'axios';
import qs from 'qs'


export const post = async () => {
    const body = qs.stringify({
        email: 'ystark+sta28@felmo.de',
        password: 'codingchallenge'
    });

    const config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }
    try {
        const response = await axios.post('https://api-staging.felmo.de/v1/auth/login', body, config);
        const accessToken = response?.data?.token;
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const get = async () => {
    try {
        const response = await axios.get('https://api-staging.felmo.de/v1/app/my-pets');
        // console.log('Response',response.data);

        return response.data;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
};