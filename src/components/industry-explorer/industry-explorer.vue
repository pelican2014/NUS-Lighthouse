<template src="./industry-explorer.html"></template>
<style src="./industry-explorer.scss" lang="scss"></style>
<script>
import BarChart from '@/components/charts/bar';
import AreaChart from '@/components/charts/area';
import HorizontalBarChart from '@/components/charts/horizontal-bar';
import Boxplot from '@/components/charts/boxplot';

export default {
  name: 'IndustryExplorer',
  components: {
    BarChart,
    AreaChart,
    HorizontalBarChart,
    Boxplot,
  },
  props: {
    by: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
};

</script>
