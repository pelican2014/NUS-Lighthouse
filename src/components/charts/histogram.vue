<template>
  <highcharts :options="options" ref="histogram" class="histogram"></highcharts>
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
    yname: {
      type: String,
      required: false,
    },
    data: {
      type: Array,
      required: false,
    },
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
    yours: {
      type: Number,
      default: 2.5,
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
          plotLines: [{
            value: this.yours,
            color: 'red',
            width: 2,
            zIndex: 8,
            // label: {
            //   text: 'You are here',
            //   align: 'bottom',
            //   style: {
            //     color: 'gray',
            //   },
            // },
          }],
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
            pointPadding: 0,
            borderWidth: 0,
            groupPadding: 0,
            shadow: false,
            color: '#FFC300',
          },
        },
        series: [{
          name: this.yname,
          data: this.data,
          zIndex: -1,
          // dataLabels: {
          //   enabled: true,
          //   // rotation: -90,
          //   color: '#FFFFFF',
          //   align: 'center',
          //   format: '{point.y:.1f}', // one decimal
          //   y: 10, // 10 pixels down from the top
          //   style: {
          //     fontSize: '10px',
          //     fontFamily: 'Verdana, sans-serif',
          //   },
          // },
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

