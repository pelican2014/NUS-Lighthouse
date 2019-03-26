<template src="./industry-page.html"></template>
<style src="./industry-page.scss" lang="scss"></style>

<script>
import FilteredSearch from '@/components/filtered-search/filtered-search';
import IndustryInsight from '@/components/industry-insight/industry-insight';

import db from '@/firebase';

export default {
  name: 'PositionDetails',
  components: {
    FilteredSearch,
    IndustryInsight,
  },
  computed: {
    salary_data() {
      return this.internship;
    },
  },
  firebase: {
    internship: {
      source: db.ref('internship'),
      asObject: true,
    },
  },
};


</script>
