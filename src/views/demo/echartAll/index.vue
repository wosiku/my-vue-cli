<template>
  <div style="background: #000;">
    <div style="color: #fff;font-size: 50px;">bar1</div>
    <bar1></bar1>
    <div style="color: #fff;font-size: 50px;">bar2</div>
    <bar2></bar2>
    <div style="color: #fff;font-size: 50px;">line1</div>
    <line1></line1>
    <div style="color: #fff;font-size: 50px;">line2</div>
    <line2></line2>
    <div style="color: #fff;font-size: 50px;">line3</div>
    <line3></line3>
    <div style="color: #fff;font-size: 50px;">line4</div>
    <line4></line4>
    <div style="color: #fff;font-size: 50px;">pie1</div>
    <pie1></pie1>
    <div style="color: #fff;font-size: 50px;">pie2</div>
    <pie2></pie2>
    <div style="color: #fff;font-size: 50px;">pie3</div>
    <pie3></pie3>
    <div style="color: #fff;font-size: 50px;">pie3</div>
    <pie4></pie4>
    <div style="color: #fff;font-size: 50px;">Radar</div>
    <Radar></Radar>
  </div>
</template>
<script>
import bar1 from './components/bar1';
import bar2 from './components/bar2';
import line1 from './components/line1';
import line2 from './components/line2';
import line3 from './components/line3';
import line4 from './components/line4';
import pie1 from './components/pie1';
import pie2 from './components/pie2';
import pie3 from './components/pie3';
import pie4 from './components/pie4';
import Radar from './components/Radar';
// import tetris from './components/tetris';
export default {
  components: { bar1, bar2, line1, line2, line3, line4, pie1, pie2, pie3, pie4, Radar },
  data () {
    return {};
  }
};
</script>
