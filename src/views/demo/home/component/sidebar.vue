<template>
    <div>
        <ul><li v-for="item of tablist" :key="item.name" @click="$emit('update:tab', item.name)">{{item.label}}</li></ul>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tablist: [
        {
          name: 'tab1',
          label: 'tab1'
        },
        {
          name: 'tab2',
          label: 'tab2'
        },
        {
          name: 'tab3',
          label: 'tab3'
        },
        {
          name: 'tab4',
          label: 'tab4'
        }
      ]
    };
  }
};
</script>
