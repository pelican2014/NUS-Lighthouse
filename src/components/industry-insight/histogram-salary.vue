<template>
  <highcharts :options="options" ref="bell-curve" class="line"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
// import Histogram from 'highcharts-histogram-bellcurve';
import Highcharts from 'highcharts';

const data = {
  title: {
    text: 'Bell curve',
  },
  xAxis: [{
    title: {
      text: 'Data',
    },
    alignTicks: false,
  }, {
    title: {
      text: 'Bell curve',
    },
    alignTicks: false,
    opposite: true,
  }],

  yAxis: [{
    title: { text: 'Data' },
  }, {
    title: { text: 'Bell curve' },
    opposite: true,
  }],

  series: [{
    type: 'bellcurve',
    xAxis: 1,
    yAxis: 1,
    baseSeries: 1,
  }, {
    data: [3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4],
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
  width: 60%;
}
</style>
