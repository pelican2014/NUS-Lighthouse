<template src='./industry-explorer.html'></template>
<style src='./industry-explorer.scss' lang='scss'></style>
<script>
import _ from 'lodash';

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
    internship: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    internship_groups() {
      const results = {};
      let criteria = this.by;
      if (this.by === 'company') {
        criteria = 'company_name';
      }
      for (const entry of this.internship) {
        if (!(entry[criteria] in results)) {
          results[entry[criteria]] = [];
        }
        results[entry[criteria]].push(entry);
      }
      return results;
    },

    acceptance_rates_data() {
      const results = this.internship_groups;
      const sorted_categories = _.map(_.sortBy(_.map(results, (group, category) => ({
        category,
        number: _.meanBy(group, 'acceptance_rate'),
      })), 'number'), 'category');

      /*
      // concatenate other industries that are out of top 9 in number
      const others = _.concat(_.map(sorted_industries.slice(0, -9)), industry => results[industry]);
      const final_results = _.pick(results, sorted_industries.slice(-9));
      final_results.Others = _.concat(..._.values(_.pick(results, others)));
      */
      const final_results = _.pick(results, sorted_categories.slice(-10));
      return _.reverse(_.map(
        final_results,
        (group, category) => [category, _.meanBy(group, 'acceptance_rate')],
      ));
    },

    lowest_acceptance_rates_data() {
      const results = this.internship_groups;
      const sorted_categories = _.map(_.sortBy(_.map(results, (group, category) => ({
        category,
        number: _.meanBy(group, 'acceptance_rate'),
      })), 'number'), 'category');
      const final_results = _.pick(results, sorted_categories.slice(0, 10));
      return _.reverse(_.map(
        final_results,
        (group, category) => [category, _.meanBy(group, 'acceptance_rate')],
      ));
    },

    num_interns_data() {
      const results = this.internship_groups;
      const sorted = _.map(_.sortBy(_.map(results, (group, category) => ({
        category, // the factor we are interested in (either company, major or industry)
        numInterns: group.length,
      })), 'numInterns'), 'category');
      const final_results = _.pick(results, sorted.slice(-10)); // pick top ten
      return _.reverse(_.map(
        final_results,
        (group, category) => [category, group.length],
      ));
    },

    starting_salary_data() {
      const results = this.internship_groups;
      // sort the categories based on mean starting salary
      const sorted = _.map(_.sortBy(_.map(results, (group, category) => ({
        category,
        averageSalary: _.meanBy(_.filter(group, x => (x.starting_salary !== null)), 'starting_salary'),
      })), 'averageSalary'), 'category');
      const final_results = _.pick(results, sorted.slice(-10));
      const categories_salary = _.map(final_results, (group, category) => ({
        category,
        salary: _.map(_.filter(group, x => (x.starting_salary !== 0 && x.starting_salary !== '' && x.starting_salary !== null)), x => x.starting_salary),
      }));
      const categories = _.map(categories_salary, 'category');
      const sorted_salaries = _.map(_.map(categories_salary, 'salary'), x => x.sort());

      // define a function to find the median
      const median = (arr) => {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      };

      // get the required data for a box plot.
      const required_data = _.map(sorted_salaries,
        x => [x[0], median(x.slice(0, Math.floor(x.length / 2) + 1)),
          median(x),
          median(x.slice(Math.floor(x.length / 2))), x[x.length - 1],
        ]);

      return { category: categories, salary: required_data, };
    },


    cap_data() {
      const results = this.internship_groups;
      const sorted = _.map(_.sortBy(_.map(results, (group, category) => ({
        category,
        averageCap: _.meanBy(_.filter(group, x => (!x.cap == 0)), 'cap'),
      })), 'averageCap'), 'category');
      const final_results = _.pick(results, sorted.slice(-10));
      const categories_cap = _.map(final_results, (group, category) => ({
        category,
        cap: _.map(_.filter(group, x => (!x.cap == 0)), x => x.cap),
      }));
      const categories = _.map(categories_cap, 'category');
      const sorted_cap = _.map(_.map(categories_cap, 'cap'), x => x.sort());
      // define a function to find the median
      const median = (arr) => {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);
        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      };
      // get the required data for a box plot.
      const required_data = _.map(sorted_cap,
        x => [x[0],
          median(x.slice(0, Math.floor(x.length / 2) + 1)),
          median(x), median(x.slice(Math.floor(x.length / 2))),
          x[x.length - 1],
        ]);

      return { category: categories, cap: required_data };
    },


    results() {
      return 1;
    },

    opening_positions_data() {
      const year = new Date().getFullYear() - 1;
      const last_year_data = _.map(this.internship_groups, group => _.filter(group, { year }));
      return [];
    },
  },
};

</script>
