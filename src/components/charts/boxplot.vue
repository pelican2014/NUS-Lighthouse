<template>
  <highcharts :options="options" ref="boxplot" class="boxplot"></highcharts>
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
      required: false,
    },
    xname: {
      type: String,
      required: false,
    },
    xcategory: {
      type: Array,
      required: false,
    },
    yname: {
      type: String,
      required: false,
    },
    mean: {
      type: String,
    },
    data: {
      type: Array,
      required: true,
    },
    outliers: {
      type: Array,
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
          type: 'boxplot',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: this.xcategory,
          title: {
            text: this.xname,
          },
        },
        yAxis: {
          title: {
            text: this.yname,
          },
          plotLines: [{
            value: this.mean,
            color: 'red',
            width: 1,
            label: {
              text: 'Theoretical mean',
              align: 'center',
              style: {
                color: 'gray',
              },
            },
          }],
        },

        series: [{
          name: this.yname,
          data: this.data,
          tooltip: {
            headerFormat: '<em>{point.key}</em><br/>',
          },
        }, {
          name: 'Outliers',
          color: Highcharts.getOptions().colors[0],
          type: 'scatter',
          data: this.outliers,
          marker: {
            fillColor: 'white',
            lineWidth: 1,
            lineColor: Highcharts.getOptions().colors[0],
          },
          tooltip: {
            pointFormat: 'Observation: {point.y}',
          },
        }],
      };
    },
  },
};
</script>

<style scoped>
.boxplot {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
