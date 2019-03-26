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
  watch: {
    data(val) {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      // this.options.addSeries(this.data);
      const series = this.$children[0].chart.series[0];
      series.setData(this.data);
    },
  },
  computed: {
    options() {
      return {
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
            color: '#FFA500',
            dashStyle: 'LongDash',
            width: 3,
            zIndex: 8,
            label: {
              text: 'You are here',
              align: 'left',
              style: {
                color: '#000080',
                fontSize: '15pxs',
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

        plotOptions: {
          histogram: {
            color: '#6495ED',
            binWidth: 0.2,
            baseSeries: 's1',
          },
        },
        series: [{
          name: 'Histogram',
          type: 'histogram',
          id: 's1',
          xAxis: 1,
          yAxis: 1,
          zIndex: 1,
          data: [0],
        }],
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
