<template>
  <highcharts :options="options" ref="bar-chart" class="bar"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';

const data = {
  chart: {
    type: 'column',
  },
  title: {
    text: 'Nationality',
  },
  subtitle: {
    text: 'Source: NUS datalake',
  },
  xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '10px',
        fontFamily: 'Verdana, sans-serif',
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Number of people',
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    pointFormat: 'Number of people: <b>{point.y:.0f} </b>',
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      color: '#FFC300',
    },
  },
  series: [{
    name: 'Race',
    data: [
      ['Chinese', 40],
      ['Malay', 15],
      ['Indian', 5],
      ['Others', 7],
    ],
    dataLabels: {
      enabled: true,
      rotation: -90,
      color: '#000080',
      align: 'right',
      format: '{point.y:.0f}', // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: '13px',
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
