<template>
  <div>
    <el-button @click="jsonpFn">jsonp请求</el-button>
  </div>
</template>
<script>
// import axios from 'axios';
export default {
  data () {
    return {

    };
  },
  mounted () {
    console.log(process.env.NODE_ENV, 'process.env.NODE_ENV');
    console.log(process.env.USER_COMPUTER_IP, 'process.env.TESTDATA');
    console.log(process, 'process.env.API_HOST');
    this.instance.regist().then(res => {
      console.log(res, 'res');
    }).catch(function (error) {
      console.log(error);
    });
  },
  methods: {
    jsonpFn () {
      let url = 'https://apis.map.qq.com/ws/direction/v1/driving/?from=39.915285,116.403857&to=39.915285,116.803857&waypoints=39.111,116.112;39.112,116.113&output=json&callback=callbackMethod&key=PCQBZ-SJOWX-4CP4R-TAK7B-HKZHJ-XABYI';
      this.fetchJsonp(url)
        .then((res) => {
          console.log(res, 'jsonp res');
        });
    },
    createScript (_url, _id) {
      const script = document.createElement('script');
      script.setAttribute('src', _url);
      script.id = _id;
      document.getElementsByTagName('head')[0].appendChild(script);
      console.log(window.callbackMethod, 'callbackmethod');
    },
    fetchJsonp (url) {
      return new Promise((resolve, reject) => {
        window['callbackMethod'] = (res) => {
          console.log(res, 'ress');
          resolve(res);
        };
        this.createScript(url, 'jsonpid'); // 这里就是生成script的函数
      });
    }

  }
};
</script>
