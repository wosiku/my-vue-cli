<template>
    <div class="containerBox">
        <el-button-group>
            <el-button type="primary" size="mini" @click="handleUndo">后退</el-button>
            <el-button type="success" size="mini" @click="handleRedo">前进</el-button>
            <el-button type="warning" size="mini" @click="handleDownload">下载</el-button>
            <el-upload
              style="display: inline-block;"
              :file-list="fileList"
              class="upload-demo"
              action=""
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleOnchangeFile"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
            >
              <el-button type="danger" size="mini">导入</el-button>
            </el-upload>
            <el-button type="primary" size="mini" @click="previewTemp">预览</el-button>
            <el-button type="success" size="mini" @click="handleZoom(1)">放大</el-button>
            <el-button type="warning" size="mini" @click="handleZoom(-1)">缩小</el-button>
        </el-button-group>
        <div id="container" v-bind:style="{width: 100 * scale + '%',height: 100 * scale + '%'}"></div>
    </div>
</template>
<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
// import CustomPaletteProvider from './customPalette';
import camundaExtension from './resources/camunda';
import jquery from 'jquery';
import BpmnViewer from 'bpmn-js/lib/Viewer';

export default {
  name: 'index',
  data () {
    return {
      containerEl: null,
      bpmnModeler: null,
      fileList: [],
      scale: 1,
      // 此变量为预览的xml文件数据，由于行数过多，附在了附件中，使用时，将附件整个复值到currentCanvasXml即可
      currentCanvasXml: ''
    };
  },
  mounted () {
    this.containerEl = document.getElementById('container');
    this.bpmnModeler = new BpmnModeler({
      container: this.containerEl,
      moddleExtensions: {camunda: camundaExtension}
      // additionalModules: [CustomPaletteProvider]
    });
    this.create();
  },
  methods: {
    handleZoom (flag) {
      if (flag < 0 && this.scale <= 1) {
        return;
      }
      this.scale += flag;
      this.$nextTick(() => {
        this.bpmnModeler.get('canvas').zoom('fit-viewport');
      });
    },
    previewTemp () {
      this.containerEl = document.getElementById('container');
      // 避免缓存，每次清一下
      this.bpmnModeler && this.bpmnModeler.destroy();
      this.scale = 1;
      this.bpmnModeler = new BpmnViewer({container: this.containerEl});
      const viewer = this.bpmnModeler;
      this.bpmnModeler.importXML(this.currentCanvasXml, (err) => {
        if (err) {
          console.error(err);
        } else {
          // 只实现预览，核心代码以下两句足够
          const canvas = viewer.get('canvas');
          canvas.zoom('fit-viewport');
          // 以下代码为：为节点注册鼠标悬浮事件
          const eventBus = this.bpmnModeler.get('eventBus');
          const overlays = this.bpmnModeler.get('overlays');
          eventBus.on('element.hover', (e) => {
            const $overlayHtml = jquery(` <div class="tipBox">
                    你好，我是悬浮框里的内容
                    </div>`);
            overlays.add(e.element.id, {
              position: {top: e.element.height, left: 0},
              html: $overlayHtml
            });
          });
          eventBus.on('element.out', () => {
            overlays.clear();
          });
          //  注册悬浮事件结束
        }
      });
    },
    create () {
      this.bpmnModeler.createDiagram(() => {
        this.bpmnModeler.get('canvas').zoom('fit-viewport');
      });
    },
    handleRemove (file) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (file.name === this.fileList[i].name) {
          this.fileList.splice(i, 1);
        }
      }
    },
    beforeRemove (file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 后退
    handleUndo () {
      this.bpmnModeler.get('commandStack').undo();
    },
    // 前进
    handleRedo () {
      this.bpmnModeler.get('commandStack').redo();
    },
    handleDownload () {
      this.bpmnModeler.saveXML({format: true}, (err, data) => {
        console.log(err);
        const dataTrack = 'bpmn';
        const a = document.createElement('a');
        const name = `diagram.${dataTrack}`;
        a.setAttribute(
          'href',
          `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
        );
        a.setAttribute('target', '_blank');
        a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
        a.setAttribute('download', name);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    handleOnchangeFile (file) {
      const reader = new FileReader();
      let data = '';
      reader.readAsText(file.raw);
      reader.onload = (event) => {
        data = event.target.result;
        this.bpmnModeler.importXML(data, (err) => {
          if (err) {
            this.$message.info('导入失败');
          } else {
            this.$message.success('导入成功');
          }
        });
      };
    }
  }
};
</script>
<style lang="less">
  .containerBox {
    height: calc(100vh - 220px);
    position: relative;
    #container {
      height: calc(100% - 50px);
    }
  }
  .tipBox {
    width: 200px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
  }
</style>
