<template>
  <highcharts :options="options" ref="pie-chart" class="pie"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
// import Highcharts from 'highcharts';


const data = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
  },

  title: {
    text: 'Year',
  },

  subtitle: {
    text: 'Source: NUS Data Lake',
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  },

  plotOptions: {
    pie: {
      colors: [
        '#FFC400',
        '#436BC6',
      ],
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %',

      },
    },
  },

  series: [{
    name: 'Year',
    colorBypoint: true,
    data: [{
      name: 'Year 1',
      y: 5,
      sliced: true,
      selected: true,
    }, {
      name: 'Year 2',
      y: 20,
    }, {
      name: 'Year 3',
      y: 40,
      sliced: true,
      selected: true,
    }, {
      name: 'Year 4',
      y: 20,
      sliced: true,
      selected: true,
    }],
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
.pie{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

</style>
