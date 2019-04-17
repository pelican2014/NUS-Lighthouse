<template>
  <highcharts :options="options" ref="pie-chart" class="pie"></highcharts>
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
      required: false,
    },
    name: {
      type: String,
      required: false,
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
          type: 'pie',
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
            size: 140,
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              distance: 10,
              style: {
                fontSize: 10,
              },
            },
          },
        },

        series: [{
          name: this.name,
          colorBypoint: true,
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
