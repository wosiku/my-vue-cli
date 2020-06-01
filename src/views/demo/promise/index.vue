<template>
  <div>
    promise: please click F12
    <renderTest></renderTest>
  </div>
</template>
<script>
import MyPromise from './components/promise';
import renderTest from './components/renderTest';
export default {
  components: {renderTest},
  data () {
    return {

    };
  },
  mounted () {
    console.log('js start');
    let flag = true;
    let p = new MyPromise((resolve, reject) => {
      console.log('promise开始');
      setTimeout(() => {
        if (flag) {
          resolve('promise成功');
        } else {
          reject('promise失败');
        }
      }, 2000);
    });
    p
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('js end');
  }
};
</script>
