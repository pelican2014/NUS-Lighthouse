<template>
  <highcharts :options="options" ref="bar-chart" class="bar"></highcharts>
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
    yname: {
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
          type: 'column',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
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
            text: this.yname,
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.1f} </b>',
        },
        plotOptions: {
          column: {
            pointPadding: 0.05,
            groupPadding: 0.05,
            borderWidth: 0,
            color: '#FFC300',
          },
        },
        series: [{
          name: this.yname,
          data: this.data,
        }],
      };
    },
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
