<template>
  <div>
    <div>
      <editor :content.sync="content"></editor>
    </div>
    <el-card>
      <div>
        富文本输出：{{content}}
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入font.css
import editor from './components/editor.vue';
import { deepClone } from '@/assets/js/util.js';
export default {
  name: 'FuncFormsEdit',
  components: {
    editor
  },
  data () {
    return {
      content: ''
    };
  },
  mounted () {
    // 深拷贝
    let obj = {a: 1, b: [1, 2], c: {a: 1}};
    let obj2 = deepClone(obj);
    console.log(obj, 'obj', obj2, 'obj2');
    obj2.a = 2;
    obj2.b = 3;
    console.log(obj, 'obj', obj2, 'obj2');
    this.promise()
      .then((res) => {
        console.log(res, 'res');
      });
  },
  methods: {
    promise () {
      return new Promise((resolve, reject) => {
        Promise.all(this.forFn())
          .then((res) => {
            resolve('success');
          });
      });
    },
    forFn () {
      let proArr = [];
      for (let i = 0; i < 5; i++) {
        let proItem = new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(i, 'i');
            resolve();
          }, 1000);
        });
        proArr.push(proItem);
      }
      return proArr;
    }
  }
};
</script>

<style scoped lang="less">
</style>
