<template>
 <div>
  <transition-group tag="div" class="box">
    <div class="item" v-for="(item) in plantTemplateRespDtos" :key="item.uuid"
      draggable="true"
      @dragstart="handleDragStart($event, item)"
      @dragover.prevent="handleDragOver($event, item)"
      @dragenter="handleDragEnter($event, item)"
      @dragend="handleDragEnd($event, item)" >
        {{item.templateName}}
    </div>
  </transition-group>
 </div>
</template>
<script>
export default {
  data () {
    return {
      plantTemplateRespDtos: [
        {
          uuid: 1,
          templateName: '模块1'
        },
        {
          uuid: 2,
          templateName: '模块2'
        }
      ],
      dragging: null
    };
  },
  mounted () {

  },
  methods: {
    handleDragStart (e, item) {
      console.log('handleDragStart');
      this.dragging = item;
    },
    handleDragEnd (e, item) {
      console.log('handleDragEnd');
      this.dragging = null;
    },
    // 首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver (e) {
      console.log('handleDragOver');
      e.dataTransfer.dropEffect = 'move';// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDragEnter (e, item) {
      console.log('handleDragEnter');
      e.dataTransfer.effectAllowed = 'move';// 为需要移动的元素设置dragstart事件
      if (item === this.dragging) {
        return;
      }
      const newItems = [...this.plantTemplateRespDtos];
      console.log(newItems, 'dianid');
      const src = newItems.indexOf(this.dragging);
      const dst = newItems.indexOf(item);
      newItems.splice(dst, 0, ...newItems.splice(src, 1));
      this.plantTemplateRespDtos = newItems;
    }
  }
};
</script>
<style lang="less" scoped>
  .box {
    width: 800px;
    background: #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .item {
      transition: all linear .3s;
      width: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 24px;
      border: 1px solid #e1e1e1;
      margin: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
  /* v-enter 【这是一个时间点】 是进入之前，元素的起始状态，此时还没有开始进入 */
  /* v-leave-to 【这是一个时间点】 是动画离开之后，离开的终止状态，此时，元素 动画已经结束了 */
  .v-enter,
  .v-leave-to {
    opacity: 0;
    transform: translateX(150px);
    transform: translateY(150px);
  }

  /* v-enter-active 【入场动画的时间段】 */
  /* v-leave-active 【离场动画的时间段】 */
  .v-enter-active,
  .v-leave-active{
    transition: all 0.3s ease;
  }
</style>
