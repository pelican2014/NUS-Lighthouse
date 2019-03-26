<template>
  <highcharts :options="options" ref="bell-curve" class="histogram"></highcharts>
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
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        title: {
          text: this.title,
        },
        xAxis: [{
          title: { text: this.name },
          alignTicks: false,
        }, {
          title: { text: 'Histogram' },
          alignTicks: false,
          opposite: true,
        }],

        yAxis: [{
          title: { text: this.name },
        }, {
          title: { text: 'Histogram' },
          opposite: true,
        }],

        series: [{
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          yAxis: 1,
          baseSeries: 's1',
          data: this.data,
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
  width: 100%;
}
</style>
