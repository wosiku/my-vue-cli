<template>
 <div id="app">
 <!-- <child1
 :p-child1="child1"
 :p-child2="child2"
 v-on:test1="onTest1"
 v-on:test2="onTest2">
 </child1> -->
  {{value4}}
  <el-time-picker
    is-range
    v-model="value4"
    format='HH:mm:ss:A'
    value-format="HH:mm:ss"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
    placeholder="选择时间范围">
  </el-time-picker>

  <div>
    <el-upload
      ref="uploadFlie"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
  <a @click.prevent="aclick" href="http://hhd-test.oss-cn-shenzhen.aliyuncs.com/egsc/img/LINK/c3b3031de7c37104a17b971bf4680cea" download>aaaa</a>

 </div>
</template>
<script>
import Axios from 'axios';
// import child1 from './child1.vue';
export default {
  data () {
    return {
      url: 'http://hhd-test.oss-cn-shenzhen.aliyuncs.com/cms_dev/LINK/2f082802c93765d05eee20b2e8e05024',
      value4: '',
      fileList: [{name: '', url: 'http://hhd-test.oss-cn-shenzhen.aliyuncs.com/cms_dev/LINK/0988f295288cc7b969764d0557446bfd'}]
    };
  },
  mounted () {
    this.$nextTick(() => {
    });
  },
  created () {
    // let url = window.URL.createObjectURL(this.url);
    // console.log(url, 'window.URL.createObjectURL(objectURL)');
    this.getData();
  },
  // components: { child1 },
  methods: {
    async getData () {
      console.log(1);
      let filename = '';
      await this.getName().then((res) => { filename = res; });
      console.log(filename, 3);
    },
    getName () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(2);
          resolve('name =========');
        }, 5000);
      });
    },
    downloadItem (url) {
      console.log(Axios.get, 'axios');
      Axios.get('api/test', { responseType: 'blob' })
        .then(({ data }) => {
          // 为了简单起见这里blob的mime类型 固定写死了
          let blob = new Blob([data], { type: 'application/vnd.ms-excel' });
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = url.split('/').pop();
          link.click()
            .catch(error => {
              console.error(error);
            });
        });
    },
    aclick (e) {
      this.downloadItem(this.url);
      console.log(e, 'a event');
    },
    onTest1 () {
      console.log('test1 running...');
    },
    onTest2 () {
      console.log('test2 running');
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
