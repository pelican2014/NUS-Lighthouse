<template>
  <highcharts :options="options" ref="area-chart" class="area"></highcharts>
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
      default: 'Number',
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
    optiones() {
      return {
        chart: {
          type: 'area',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        colors: [
          '#62ba1a',
          '#fccf05',
          '#808080',
          '#b73916',
          '#1b60aa',
          '#5f1570',
        ],
        xAxis: {
          allowDecimals: false,
          labels: {
            formatter() {
              return this.value; // clean, unformatted number for year
            },
          },
          categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Ocb', 'Nov', 'Dec'],
        },
        yAxis: {
          title: {
            text: this.yname,
          },
          labels: {
            formatter() {
              return this.value;
            },
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:,.0f}</b><br/>',
        },
        plotOptions: {
          area: {
            stacking: 'normal',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true,
                },
              },
            },
          },
        },
        series: this.data,
      };
    },
  },
};
</script>

<style scoped>
.area{
  display:block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

</style>
