// 输出通用axios实例
import axios from 'axios';

const instance = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

export default {
  regist () {
    return instance.get('/ws/direction/v1/driving/?from=39.915285,116.403857&to=39.915285,116.803857&waypoints=39.111,116.112;39.112,116.113&output=json&callback=callbackMethod&key=PCQBZ-SJOWX-4CP4R-TAK7B-HKZHJ-XABYI');
  }
};
