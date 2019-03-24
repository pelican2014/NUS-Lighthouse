<template>
  <highcharts :options="options" ref="bar-chart" class="bar"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

More(Highcharts);

const data = {
  chart: {
    type: 'boxplot',
  },

  title: {
    text: 'CAP of successful RA Applicants',
  },
  subtitle: {
    text: 'in the past 5 years',
  },

  legend: {
    enabled: false,
  },

  xAxis: {
    categories: ['Life Sci', 'Com Sci', 'Civil Eng', 'Material Sci', 'Psychology', 'Economics', 'Chemical Eng', 'Info Systems', 'Biz Analytics'],
    title: {
      text: 'Major',
    },
  },

  yAxis: {
    title: {
      text: 'CAP',
    },
    plotLines: [{
      value: 4.3,
      color: '#FFA500',
      dashStyle: 'LongDash',
      width: 3,
      label: {
        text: 'You are here: 4.3',
        align: 'left',
        style: {
          color: '#000080',
          fontSize: '10px',
        },
      },
    }],
  },
  plotOptions: {
    boxplot: {
      fillColor: '#87CEFA',
      lineWidth: 1,
      medianColor: '#1E90FF',
      medianWidth: 3,
      stemColor: '#000080',
      stemDashStyle: 'dot',
      stemWidth: 2,
      whiskerColor: '#4169E1',
      whiskerLength: '20%',
      whiskerWidth: 5,
    },
  },

  series: [{
    name: 'CAP',
    data: [
      [4.3, 4.4, 4.5, 4.5, 4.7],
      [4.3, 4.4, 4.5, 4.5, 4.5],
      [4.1, 4.1, 4.2, 4.5, 4.5],
      [4.0, 4.0, 4.0, 4.1, 4.1],
      [3.9, 4.0, 4.1, 4.5, 4.5],
      [3.9, 4.0, 4.1, 4.5, 4.5],
      [4.2, 4.4, 4.5, 4.5, 4.7],
      [4.9, 4.7, 4.6, 4.5, 4.5],
      [4.4, 4.4, 4.5, 4.5, 4.6],
    ],
    tooltip: {
      headerFormat: '<em>{point.x}</em><br/>',
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
