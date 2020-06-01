export default {
  data () {
    return {
      msg: '这是mixins里的数据'
    };
  },
  methods: {
    clickFn () {
      this.$message.success('这是mixins里的方法');
    }
  }
};
