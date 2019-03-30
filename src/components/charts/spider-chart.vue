<template>
  <highcharts :options="options" ref="spider-chart" class="spider-chart"></highcharts>
</template>
<script>
import HighchartsVue from 'highcharts-vue';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

More(Highcharts);

export default {
  components: {
    HighchartsVue,
  },
  props: {

    title: {
      type: String,
      required: true,
    },
    xname: {
      type: String,
    },
    xcategory: {
      type: Array,
      required: true,
    },
    yname: {
      type: String,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          polar: true,
          type: 'line',
        },
        title: {
          text: this.title,
        },
        pane: {
          size: '85%',
        },

        legend: {
          align: 'left',
          verticalAlign: 'top',
          layout: 'vertical',
        },
        xAxis: {
          categories: this.xcategory,
          lineColor: '#ffffff',
          title: {
            text: this.xname,
          },
          tickmarkPlacement: 'on',
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
        },
        tooltip: {
          shared: true,
        },
        series: this.data,
      };
    },
  },
};

</script>
<style scoped>
.spider-chart {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

</style>
