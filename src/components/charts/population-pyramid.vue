<template>
  <highcharts :options="options" ref="pyramid" class="pyramid"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';

export default {
  components: {
    HighchartsVue,
  },
  props: {
    title: {
      type: String,
      default: 'Year and Gender Pyramid',
    },
    female: {
      type: Array,
      required: true,
    },
    male: {
      type: Array,
      required: true,
    },
    subtitle: {
      type: String,
      default: 'Source: NUS Datalake',
    },
  },
  data() {
  	return {
  	  categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4'],
  	};
  },
  computed: {
    options() {
      return {
        chart: {
          type: 'bar',
        },
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        xAxis: [{
          categories: this.categories,
          reversed: false,
          labels: {
            rotation: -45,
            step: 1,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
            },
          },
        }, {
          opposite: true,
          reversed: false,
          categories: this.categories,
          linkTo: 0,
          labels: {
          	step: 1,
          },
        }],
        yAxis: {
          // min: 0,
          title: {
            text: 'Number of people',
          },
          labels: {
            formatter() {
              return Math.abs(this.value);
            },
          },
        },
        legend: {
          enabled: true,
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.y:.1f} </b>',
        },
        plotOptions: {
          series: {
          	stacking: 'normal',
          	pointPadding: 0.05,
            groupPadding: 0.05,
            borderWidth: 0,
          	// color: ['#FFC300', '#eded10'],
          },
        },
        series: [{
          name: 'Male',
          data: [-1, -2, -3, -4],
          color: '#FFC300',
        }, {
          name: 'Female',
          data: [1, 2, 3, 4],
          color: '#1b8ae5',
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
  width: 100%
}
</style>
