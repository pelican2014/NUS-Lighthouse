<template>
  <highcharts :options="options" ref="horizontal-bar-chart" class="horizontal-bar"></highcharts>
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
      type: Object,
      required: true,
    },
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
  },
  data() {
    return {
      options: {
        chart: {
          type: 'bar',
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
            pointPadding: 0.2,
            borderWidth: 0,
            color: '#FFC300',
          },
        },
        series: [{
          name: this.yname,
          data: this.data,
          dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        }],
      },
    };
  },
};
</script>

<style scoped>
.horizontal-bar {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
