<template>
  <highcharts :options="options" ref="bar-chart" class="bar"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
// import Highcharts from 'highcharts';

const data = {
  chart: {
    type: 'bar',
  },
  title: {
    text: 'RA Acceptance Rate by Major',
  },
  subtitle: {
    text: 'in the past 5 years',
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif',
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Acceptance Rate',
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    pointFormat: 'Number of people: <b>{point.y:.1f} </b>',
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      color: '#FFC300',
    },
  },
  series: [{
    name: 'Population',
    data: [
      ['LS', 0.5],
      ['CS', 0.45],
      ['CEG', 0.38],
      ['MS', 0.38],
      ['PS', 0.2],
      ['EC', 0.19],
      ['CE', 0.1],
      ['IS', 0.4],
      ['BA', 0.5],
    ],
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: '#000080',
      align: 'right',
      format: '{point.y}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '10px',
        fontFamily: 'Verdana, sans-serif',
      },
    },
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
.bar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
