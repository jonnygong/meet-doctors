/**
 *  axios 配置文件
 *  @desc: 配置ajax headers request Response 数据预处理
 *  @author: helloLaoYang<aaron@codonas.cn>
 */

import axios from 'axios';
import configs from './../../configs/api';
import { Toast } from 'mint-ui'

const { baseUrl } = configs;
// 确认默认链接
axios.defaults.baseURL  = baseUrl;

// 初始化post header
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.withCredentials = true;

/*
* todo: 预处理Requests数据
* desc: 进行数据转换，添加默认字段等
* @return data;
**/
axios.defaults.transformRequest = function _transformRequest( params = {} ){
    // 跑出错误
    if( !FormData ) throw `
        Serious errors:
        Your browser does not support formdata.
    `;
    // 处理当上传对象为formdata 不处理
    if( params instanceof FormData ) return params;

    // 新建formData 对象
    const formData = new FormData();

    // 遍历数据，整合数据
    Object.keys( params ).forEach( key => {
        formData.append( key , params[key] );
    });

    // 返回完整数据，请求ajax
    formData.append('auth', localStorage.auth);
    return formData;
};

/*
* todo: 预处理Response数据
* desc: 可以进行返回码操作
* @return data || null;
**/
axios.defaults.transformResponse = function _transformResponse( res ){
    // 处理返回数据
    try {
        // JSON 化数据
        res instanceof Object ? null : res = JSON.parse( res );
    } catch (e) {
        // 不是对象或者json格式字符串
        return null;
        
    };
    // 处理错误码
    // 返回object对象到response[data]
    const { status, info, param } = res;
    if(status === '200' || status === true) {
        return res;
    }else{
        // 556未登录状态下重定向路由，10000授权过期后重新发起授权
        if(status === '556') {
            Toast({
                message: info,
                duration: 1000
            });
            const { host, pathname } = window.location
            setTimeout(() => {
                window.location.href = `http://${host}${pathname}#/login`
            }, 1000);
        }else if(status === '10000') {
            Toast({
                message: info,
                duration: 1000
            });
            localStorage.removeItem('auth');
            setTimeout(() => {
                location.reload()
            }, 1000);
        }else if(status === '110') {
            
        }else {
            Toast({
                message: info,
                duration: 1000
            });
        }
        return res;
    }
};