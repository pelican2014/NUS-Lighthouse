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
  },
  data() {
    return {
      bardata: [
        ['Finance', 24.2],
        ['Manufacturing', 20.8],
        ['C', 14.9],
        ['D', 13.7],
        ['E', 13.1],
        ['F', 12.7],
      ]


    };

  }
};

</script>
