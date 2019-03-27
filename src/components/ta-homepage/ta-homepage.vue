<template src='./ta-homepage.html'></template>
<style src='./ta-homepage.scss' lang='scss'></style>
<script>
import _ from 'lodash';
import math from 'mathjs';

import TopHeader from '@/components/top-header/top-header';
import SubHeader from '@/components/subheader/subheader';
import SearchBar from '@/components/search-bar/search-bar';
import HorizontalBarChart from '@/components/charts/horizontal-bar';
import Boxplot from '@/components/charts/boxplot';
import AreaChart from '@/components/charts/area';

import db from '@/firebase';

export default {
  name: 'InternshipHomepage',
  components: {
    Boxplot,
    HorizontalBarChart,
    AreaChart,
    TopHeader,
    SubHeader,
    SearchBar,
  },

  methods: {
    sort_by(transform) {
      // choose only the top 10 results
      const results = {};
      for (const entry of this.ta) {
        if (!(entry.major in results)) {
          results[entry.major] = [];
        }
        results[entry.major].push(entry);
      }
      const sorted_majors = _.map(_.sortBy(_.map(results, (group, major) => ({
        major,
        number: transform(group),
      })), 'number'), 'major');

      return _.pick(results, sorted_majors.slice(-10));
    },

    get_box_points(arr) {
      if (!arr.length) return arr;
      return math.quantileSeq(arr, [0, 0.25, 0.5, 0.75, 1]);
    },
  },

  computed: {
    last_year() {
      return new Date().getFullYear() - 1;
    },
    ra_by_number() {
      return this.sort_by(o => o.length);
    },
    ra_by_acceptance() {
      return this.sort_by(o => _.meanBy(o, 'acceptance_rate'));
    },
    ra_by_number_last_year() {
      return this.sort_by(o => _.sumBy(
        o,
        k => (k.year === this.last_year ? 1 : 0),
      ));
    },

    number() {
      return _.map(this.ta_by_number, (o, k) => [k, o.length]);
    },
    cap() {
      const combined = _.map(this.ta_by_number_last_year, (o, industry) => ({
        industry,
        cap_list: _.map(o, 'cap'),
      }));

      const xcategory = _.map(combined, 'industry');
      const data = _.map(combined, o => this.get_box_points(o.cap_list));

      return { xcategory, data };
    },
    acceptance_rate() {
      return _.map(
        this.ta_by_number,
        (o, k) => [k, _.meanBy(o, 'acceptance_rate')],
      );
    },

    opening_positions() {
      const month_count = {};
      for (const industry in this.ta_by_number_last_year) {
        if (typeof this.ta_by_number_last_year[industry] !== 'object') continue;
        month_count[industry] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (const entry of this.ta_by_number_last_year[industry]) {
          for (let i = entry.starting_month; i <= entry.ending_month; i += 1) {
            month_count[industry][i - 1] += 1;
          }
        }
      }
      return _.map(month_count, (counts, industry) => ({
        name: industry,
        data: counts,
      }));
    },
  },

  firebase: {
    ta: {
      source: db.ref('ta'),
      asArray: true,
    },
  },
};

</script>
