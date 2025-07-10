import {route} from 'ziggy-js';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: window.location.origin,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    withCredentials : true,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});

let getRouteUrl = function(name , argue = null) {
  let url;
  if(argue && typeof argue == 'object'){
    url = route(name , argue) 
  }else{
    url = route(name)
  }
  let pattern = /:\/\/(.[^/]+)/;
  let path = url.split(url.match(pattern)[1])
  url = location.origin + path[1]
  return url;
}

export  {axiosInstance , getRouteUrl};
