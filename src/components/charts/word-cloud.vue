<template>
  <highcharts :options="options" ref="word-cloud-chart" class="word-cloud"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import loadWordcloud from 'highcharts/modules/wordcloud';

loadWordcloud(Highcharts);

export default {
  components: {
    HighchartsVue,
  },
  props: {
    title: {
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
        series: [{
          type: 'wordcloud',
          data: this.data,
          name: 'Importance',
        }],
        title: {
          text: this.title,
        },
        subtitle: {
          text: this.subtitle,
        },
        plotOptions: {
          wordcloud: {
            colors: [
              '#f9ee0e',
              '#eded10',
              '#ff9500',
              '#5c7a1c',
              '#a1af31',
              '#1e3c70',
              '#ff7d00',
            ],
          },
        },
      };
    },
  },
};
</script>

  <style scoped>
  .word-cloud{
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 100%;
 }
 </style>
