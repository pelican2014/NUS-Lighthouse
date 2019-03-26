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
    text: 'Fresh Graduate Starting Salary',
  },
  xAxis: {
    title: {
      text: 'Histogram',
    },
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
      // binWidth: 0.1,
      baseSeries: 's1',

    },
  },

  series: [{
    type: 'histogram',
    name: 'Starting Salary',
    id: 's1',
    data: [4300, 4400, 4050, 4500, 4070, 5100, 4400, 4500, 4500, 4800, 4100, 4100, 4200, 4500, 4800,
      5000, 4900, 4000, 4100, 4100, 3900, 4000, 4100, 4700, 5300, 5500, 4000, 4100, 5500, 5700,
      4200, 4400, 4600, 4700, 4900, 4900, 4700, 4600, 4500, 4500, 4650, 5200, 5300, 5400, 5500],
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
