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
    yours: {
      type: String,
    },
    data: {
      type: Array,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
  },
  data() {
    return {
      options: {
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        xAxis: [{
          title: { text: this.name },
          alignTicks: false,
        }, {
          title: { text: 'Histogram' },
          alignTicks: false,
          opposite: true,
          plotLines: [{
            value: this.yours,
            color: 'red',
            width: 1,
            label: {
              text: 'You are here',
              align: 'bottom',
              style: {
                color: 'gray',
              },
            },
          }],
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
          zIndex: -1,
        }, {
          name: this.name,
          type: 'scatter',
          data: this.data,
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
