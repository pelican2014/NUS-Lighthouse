<template>
  <highcharts :options="options" ref="donut-chart" class="donut"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';

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
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
  },
  computed: {
    options() {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 0,
          plotShadow: false,
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },

        plotOptions: {
          pie: {
            colors: [
              '#FFC400',
              '#436BC6',
              '#4F97D6',
              '#FFDA5A',
              '#B7D5EE',
            ],
            allowPointSelect: true,
            cursor: 'pointer',
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%'],
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
              	fontWeight: 'bold',
              	fontSize: 10,
              },
          	},
          },
      	},
        series: [{
          type: 'pie',
          name: this.name,
          colorBypoint: true,
          innerSize: '50%',
          data: this.data,
        }],
      };
    },
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
