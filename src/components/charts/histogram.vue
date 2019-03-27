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
      required: true,
    },
    yname: {
      type: String,
      required: true,
    },
    yours: {
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
            width: 1,
            zIndex: 2,
            label: {
              text: 'You are here',
              align: 'left',
              style: {
                color: '#000080',
                fontSize: '15pxs',
              },
            },
          }],
        },

        yAxis: [{
          title: { text: this.name },
        }, {
          title: { text: 'Histogram' },
          opposite: true,
        }],
        series: [{
          name: 'Histogram',
          type: 'histogram',
          xAxis: 1,
          yAxis: 1,
          zIndex: 2,
          baseSeries: 's1',
        }, {
          name: 'Data',
          type: 'scatter',
          data: this.data,
          id: 's1',
          marker: {
            radius: 0,
          },
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
