<template src="./industry-explorer.html"></template>
<style src="./industry-explorer.scss" lang="scss"></style>
<script>
import _ from 'lodash';

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
  computed: {
    internship_groups() {
      const results = {};
      for (const entry of this.internship) {
        if (!(entry.industry in results)) {
          results[entry.industry] = [];
        }
        results[entry.industry].push(entry);
      }
      const sorted_industries = _.map(_.sortBy(_.map(results, (group, industry) => ({
        industry,
        number: group.length,
      })), 'number'), 'industry');

      // concatenate other industries that are out of top 9 in number
      const others = _.concat(_.map(sorted_industries.slice(0, -9)), industry => results[industry]);
      const final_results = _.pick(results, sorted_industries.slice(-9));
      final_results.Others = _.concat(_.values(_.pick(results, others)));

      return final_results;
    },

    acceptance_rates_data() {
      return _.map(
        this.internship_groups,
        (group, industry) => [industry, _.meanBy(group, 'acceptance_rate')],
      );
    },

    opening_positions_data() {
      const year = new Date().getFullYear() - 1;
      const last_year_data = _.map(this.internship_groups, group => _.filter(group, { year }));
      return [];
    },
  },
  firebase: {
    internship: {
      source: db.ref('internship'),
      asArray: true,
    },
  },
};

</script>
