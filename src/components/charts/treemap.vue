<template>
  <highcharts :options="options" ref="treemap" class="tree"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import loadTreemap from 'highcharts/modules/treemap';
import Highcharts from 'highcharts';

loadTreemap(Highcharts);

export default {
  components: {
    HighchartsVue,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        series: [{
          type: 'treemap',
          layoutAlgorithm: 'stripes',
          alternateStartingDirection: true,
          levels: [{
            level: 1,
            layoutAlgorithm: 'sliceAndDice',
            dataLabels: {
              enabled: true,
              align: 'left',
              verticalAlign: 'top',
              style: {
                fontSize: '15px',
                fontWeight: 'bold',
              },
            },
          }],
          data: this.data,
        }],
        title: {
          text: 'Major and Faculty Breakdown',
        },
      };
    },
  },
};
</script>

<style scoped>
.line{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
