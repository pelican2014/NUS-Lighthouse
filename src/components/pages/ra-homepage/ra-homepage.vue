<template src='./ra-homepage.html'></template>
<style src='./ra-homepage.scss' lang='scss'></style>
<script>
import _ from 'lodash';

import TopHeader from '@/components/top-header/top-header';
import SubHeader from '@/components/subheader/subheader';
import SearchBar from '@/components/search-bar/search-bar';
import IndustryExplorer from '@/components/industry-explorer/industry-explorer';
import Boxplot from '@/components/charts/boxplot';

import db from '@/firebase';

export default {
  name: 'InternshipHomepage',
  components: {
    Boxplot,
    TopHeader,
    SubHeader,
    SearchBar,
    IndustryExplorer,
  },

  methods: {
    sort_by(transform) {
      // choose only the top 10 results
      const results = {};
      for (const entry of this.ra) {
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

      const median = (arr) => {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      };

      arr.sort((a, b) => a - b);

      // get the required data for a box plot.
      return [
        x[0],
        median(x.slice(0, Math.floor(x.length / 2) + 1)),
        median(x),
        median(x.slice(Math.floor(x.length / 2))),
        x[x.length - 1],
      ]
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
      return _.map(this.ra_by_number, (o, k) => ({
        name: k,
        y: o.length,
      }));
    },
    cap() {
      const combined = _.map(this.ra_by_number, (o, industry) => ({
        industry,
        cap_list: _.map(o, 'cap'),
      }));

      const xcategory = _.map(combined, 'industry');
      const data = _.map(combined, 'cap_list');

      return { xcategory, data };
    },
    acceptance_rate() {

    },
    opening_positons() {

    },
  },

  firebase: {
    ra: {
      source: db.ref('ra'),
      asArray: true,
    },
  },
};

</script>
