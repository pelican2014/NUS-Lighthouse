<template>
  <highcharts :options="options" ref="line-chart" class="line"></highcharts>
</template>


<style scoped>
.line{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>


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
    yname: {
      type: String,
      required: false,
    },
    x: {
      type: Array,
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
          type: 'line',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        xAxis: {
          categories: this.x,
        },
        yAxis: {
          title: {
            text: this.yname,
          },
        },
        plotOptions: {
          line: {
            dataLabel: {
              enabled: true,
            },
            enableMouseTracking: false,
          },
        },
        series: this.data,
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          }],
        },
      };
    },
  },
};
</script>
