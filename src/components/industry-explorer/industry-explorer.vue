<template src="./industry-explorer.html"></template>
<style src="./industry-explorer.scss" lang="scss"></style>

<script>
import BarChart from '@/components/charts/bar';
import AreaChart from '@/components/charts/area';
import HorizontalBarChart from '@/components/charts/horizontal-bar';
import Boxplot from '@/components/charts/boxplot';

import db from '@/firebase';

export default {
  name: 'IndustryExplorer',
  components: {
    BarChart,
    AreaChart,
    HorizontalBarChart,
    Boxplot,
  },
  computed: {
    // internship() {
    //   return this.internship;
    // }
  },
  firebase: {
    internship: {
      source: db.ref('internship'),
      asArray: true,
    },
  },
};


</script>
