<template src="./major-insight.html"></template>
<style src="./major-insight.scss" lang="scss"></style>
<script>
import Pie from '@/components/charts/pie';
import Bar from '@/components/charts/bar';
import LineChart from '@/components/charts/line';
import Pyramid from '@/components/charts/population-pyramid';
// import Histogram from '@/components/charts/histogram';
import SpiderChart from '@/components/charts/spider-chart';
import WordCloud from '@/components/charts/word-cloud';

export default {
  name: 'MainChart',
  props: {
    number: {
      type: Object,
      required: true,
    },
    gender: {
      type: Array,
      required: true,
    },
    // year: {
    //   type: Array,
    //   required: true,
    // },
    // faculty: {
    //   type: Array,
    //   required: true,
    // },
    nationality: {
      type: Array,
      required: true,
    },
    salary_hist: {
      type: Array,
      required: true,
    },
    salary_line: {
      type: Object,
      required: true,
    },
    total_num: {
      type: Number,
      required: true,
    },
    // female: {
    //   type: Array,
    //   required: true,
    // },
    // male: {
    //   type: Array,
    //   required: true,
    // },
    spider_chart_data: {
      type: Object,
      required: true,
    },
    company: {
      type: Array,
      required: true,
    },
  },
  components: {
    Pie,
    Bar,
    LineChart,
    Pyramid,
    SpiderChart,
    WordCloud,
    // Histogram,
    // PieChartGender,
    // PieChartFaculty,
    // PieChartYear,
    // LineChartNum,
    // BarChartNa,
    // LineChartSalary,
    // HistogramSalary,
  },
  // data() {
  //   return {
  //     totalNum: 552,
  //   };
  // },
};

</script>
