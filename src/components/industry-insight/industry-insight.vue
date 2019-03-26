<template src="./industry-insight.html"></template>
<style src="./industry-insight.scss" lang="scss"></style>

<script>
// import PieChartGender from '@/components/industry-insight/pie-chart-gender';
// import PieChartFaculty from '@/components/industry-insight/pie-chart-faculty';
// import PieChartYear from '@/components/industry-insight/pie-chart-year';
// import LineChartNum from '@/components/industry-insight/line-chart-num';
// import BarChartNa from '@/components/industry-insight/bar-chart-nationality';
// import LineChartSalary from '@/components/industry-insight/line-chart-salary';
// import HistogramSalary from '@/components/industry-insight/histogram-salary';

import Pie from '@/components/charts/pie';
import Bar from '@/components/charts/bar';
import LineChart from '@/components/charts/line';
import Histogram from '@/components/charts/histogram';

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
    year: {
      type: Array,
      required: true,
    },
    faculty: {
      type: Array,
      required: true,
    },
    nationality: {
      type: Array,
      required: true,
    },
    salary_line: {
      type: Object,
      required: true,
    },
  },
  components: {
    Pie,
    Bar,
    LineChart,
    Histogram,
    // PieChartGender,
    // PieChartFaculty,
    // PieChartYear,
    // LineChartNum,
    // BarChartNa,
    // LineChartSalary,
    // HistogramSalary,
  },
  data() {
    return {
      totalNum: 552,
    };
  },
};


</script>
