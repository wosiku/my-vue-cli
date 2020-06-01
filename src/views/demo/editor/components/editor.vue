<template>
  <div>
    <!-- 自定义图片上传 -->
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img class="avatar">
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 自定义富文本 -->
    <quill-editor v-model="content" ref="myQuillEditor" :style="{height: height, width: width}" :options="editorOption">
      <!-- 自定义toolar -->
      <div id="toolbar" slot="toolbar">
        <!-- Add a bold button -->
        <button class="ql-bold" title="加粗">Bold</button>
        <button class="ql-italic" title="斜体">Italic</button>
        <button class="ql-underline" title="下划线">underline</button>
        <button class="ql-strike" title="删除线">strike</button>
        <button class="ql-blockquote" title="引用"></button>
        <button class="ql-code-block" title="代码"></button>
        <button class="ql-header" value="1" title="标题1"></button>
        <button class="ql-header" value="2" title="标题2"></button>
        <!--Add list -->
        <button class="ql-list" value="ordered" title="有序列表"></button>
        <button class="ql-list" value="bullet" title="无序列表"></button>
        <!-- Add font size dropdown -->
        <select class="ql-header" title="段落格式">
          <option selected>标题</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="5">H5</option>
          <option value="6">H6</option>
        </select>
        <select class="ql-size" title="字体大小">
          <option value="10px">10px</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px" selected>16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
        </select>
        <select class="ql-font" title="字体">
          <option value="SimSun">宋体</option>
          <option value="SimHei">黑体</option>
          <option value="Microsoft-YaHei">微软雅黑</option>
          <option value="KaiTi">楷体</option>
          <option value="FangSong">仿宋</option>
          <option value="Arial">Arial</option>
        </select>
        <!-- Add subscript and superscript buttons -->
        <select class="ql-color" value="color" title="字体颜色"></select>
        <select class="ql-background" value="background" title="背景颜色"></select>
        <select class="ql-align" value="align" title="对齐"></select>
        <button class="ql-image" title="上传图片"></button>
        <button class="ql-clean" title="还原"></button>

        <!-- You can also add your own -->
      </div>
    </quill-editor>
  </div>
</template>

<script>
import {
  Quill,
  quillEditor
} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// 引入font.css
import './font.less';

// 自定义字体大小
let Size = Quill.import('attributors/style/size');
Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
Quill.register(Size, true);

// 自定义字体类型
var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
  '宋体', '黑体'
];
var Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  name: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data () {
    return {
      content: null,
      editorOption: {
        placeholder: '请输入',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: '#toolbar',
            handlers: {
              'image': function (value) {
                if (value) {
                  // 调用iview图片上传
                  document.querySelector('.avatar-uploader .el-upload').click();
                } else {
                  this.quill.format('image', false);
                }
              }
            }
          }
        }
      }
    };
  },
  watch: {
    content: {
      handler (nval, oval) {
        this.$emit('update:content', nval);
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      if (res.id === 101) {
        this.$message.success('上传成功');
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址,这里暂且用'http://baidu.com'
        console.log(quill, 'quill', length, 'length');
        quill.insertEmbed(length, 'image', 'http://baidu.com');
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error('上传失败');
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped lang="less">
.avatar-uploader {
  display: none;
}
</style>
