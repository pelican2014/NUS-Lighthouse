<template>
  <highcharts :options="options" ref="histogram-chart" class="histogram"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import loadHistogram from 'highcharts/modules/histogram-bellcurve';
import Highcharts from 'highcharts';

loadHistogram(Highcharts);

const data = {
  title: {
    text: 'Cumulative Average Point',
  },
  xAxis: {
    title: {
      text: 'Histogram',
    },
    plotLines: [{
      value: 4.4,
      color: '#FFA500',
      dashStyle: 'LongDash',
      width: 3,
      label: {
        text: 'You are here: 4.4',
        align: 'left',
        style: {
          color: '#000080',
          fontSize: '15px',
        },
      },
    }],
  },


  yAxis: [{
    title: { text: 'Data' },
  }, {
    title: { text: 'Histogram' },
    opposite: true,
  }],

  plotOptions: {
    histogram: {
      color: '#6495ED',
      binWidth: 0.1,
      baseSeries: 's1',

    },
  },

  series: [{
    type: 'histogram',
    name: 'CAP',
    id: 's1',
    data: [4.3, 4.4, 4.5, 4.5, 4.7, 4.3, 4.4, 4.5, 4.5, 4.5, 4.1, 4.1, 4.2, 4.5, 4.5,
      4.0, 4.0, 4.0, 4.1, 4.1, 3.9, 4.0, 4.1, 4.5, 4.5, 3.9, 4.0, 4.1, 4.5, 4.5,
      4.2, 4.4, 4.5, 4.5, 4.7, 4.9, 4.7, 4.6, 4.5, 4.5, 4.4, 4.4, 4.5, 4.5, 4.6],
  }],
};

export default {
  components: {
    HighchartsVue,
  },
  data() {
    return {
      options: data,
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
