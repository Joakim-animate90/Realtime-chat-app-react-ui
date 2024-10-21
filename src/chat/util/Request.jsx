import axios from 'axios'
import qs from 'qs'
import {
    message
} from 'antd';

function axiosPost(url, data, options = { dealError: false }) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data), {
            headers: {
                // "Authorization": Params.TOKEN_PREFIX + localStorage.token,
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            if (response.data.code === 0) {
                resolve(response.data);
            } else {
                if (options.dealError) {
                    reject(response);
                } else {
                    message.error(response.data.msg);
                }
            }
        }).catch(_error => {
            message.error('Internet error, please try again!');
        });
    });
}

function axiosPostBody(url, data, options = { dealError: false }) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
            headers: {
                // "Authorization": Params.TOKEN_PREFIX + localStorage.token,
            }
        }).then(response => {
            if (response.data.code === 0) {
                resolve(response.data);
            } else {
                if (options.dealError) {
                    reject(response);
                } else {
                    message.error(response.data.msg);
                }
            }
        }).catch(_error => {
            message.error('Internet error, please try again!');
        });
    });
}

function axiosPut(url, data = {}, options = { dealError: false }) {
    return new Promise((resolve, reject) => {
        axios.put(url, data, {
            headers: {
                // "Authorization": Params.TOKEN_PREFIX + localStorage.token
            }
        }).then(response => {
            if (response.data.code === 0) {
                resolve(response.data);
            } else {
                if (options.dealError) {
                    reject(response);
                } else {
                    message.error(response.data.msg);
                }
            }
        }).catch(_error => {
            message.error('Internet error, please try again!');
        });
    });
}

function axiosGet(url, data = {}, options = { dealError: false }) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: {
                ...data,
            },
            headers: {
                // "Authorization": Params.TOKEN_PREFIX + localStorage.token
            }
        }).then(response => {
            if (response.data.code === 0) {
                resolve(response.data);
            } else {
                if (options.dealError) {
                    reject(response);
                } else {
                    message.error(response.data.msg);
                }
            }
        }).catch(_error => {
            message.error('Network error, please try again！');
        });
    });
}

export { axiosPost, axiosPut, axiosPostBody, axiosGet }