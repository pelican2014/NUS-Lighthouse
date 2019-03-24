<template>
  <highcharts :options="options" ref="bell-curve" class="line"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import loadHistogram from 'highcharts/modules/histogram-bellcurve';

loadHistogram(Highcharts);

export default {
  components: {
    HighchartsVue,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      options: {
        title: {
          text: this.title,
        },
        xAxis: [{
          title: { text: 'Data' },
          alignTicks: false,
        }, {
          title: { text: 'Histogram' },
          alignTicks: false,
          opposite: true,
        }],

        yAxis: [{
          title: { text: 'Data' },
        }, {
          title: { text: 'Bellcurve' },
          opposite: true,
        }],

        series: [{
          name: 'Histogram',
          type: 'bellcurve',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 's1',
          zIndex: -1,
        }, {
          name: 'Data',
          type: 'scatter',
          data: [1, 2, 3, 4, 5, 1, 3, 4, 3, 3, 2, 1, 1, 3, 2, 1],
          id: 's1',
          marker: {
            radius: 1.5,
          },
        }],
      },
    };
  },
};
</script>

<style scoped>
.line{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}
</style>
