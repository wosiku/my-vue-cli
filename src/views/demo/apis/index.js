import axios from '@/common/axiosPlugin.js';

let tencentApiUrl = '/ws/direction/v1/driving/?from=39.915285,116.403857&to=39.915285,116.803857&waypoints=39.111,116.112;39.112,116.113&output=json&callback=callbackMethod&key=PCQBZ-SJOWX-4CP4R-TAK7B-HKZHJ-XABYI';
export let tencentApi = (data) => {
  return axios.get(tencentApiUrl, data)
    .then(resData => {
      return resData;
    });
};
