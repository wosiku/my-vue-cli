<template>
  <div>
    <el-input v-model="textVal" type="textarea" rows="5"></el-input>
    <el-button id="downloadBtn" @click="fileDownload">文件下载</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      textVal: ''
    };
  },
  methods: {
    fileDownload () {
      if (!this.textVal) {
        this.$message.warning('请输入文本');
        return;
      }
      const fileName = 'blob.txt';
      const myBlob = new Blob([this.textVal], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(myBlob);
      link.download = fileName;
      link.click();
      link.remove();
      URL.revokeObjectURL(link.href);
    }
  }
};
</script>
