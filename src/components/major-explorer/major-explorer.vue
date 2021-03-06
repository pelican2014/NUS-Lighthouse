<template src='./major-explorer.html'></template>
<style src='./major-explorer.scss' lang='scss'></style>

<script>
import _ from 'lodash';
import math from 'mathjs';
import BarChart from '@/components/charts/bar';
import AreaChart from '@/components/charts/area';
import HorizontalBarChart from '@/components/charts/horizontal-bar';
import Boxplot from '@/components/charts/boxplot';
import searchBar from '@/components/search-bar/search-bar';
// import ExplorerSearch from '@/components/explorer-search/explorer-search';
import db from '@/firebase';

export default {
  name: 'IndustryExplorer',
  components: {
    searchBar,
    BarChart,
    AreaChart,
    HorizontalBarChart,
    Boxplot,
    // ExplorerSearch,
  },
  props: {
    by: {
      type: String,
      required: true,
    },
    internship: {
      type: Array,
      required: true,
    },
  },
  methods: {
    get_box_points(arr) {
      if (!arr.length) return arr;
      return Array.from(math.quantileSeq(arr, [0, 0.25, 0.5, 0.75, 1]));
    },
  },
  computed: {
    cap_by() {
      if (!(this.by) || this.by.length === 0) return '';
      return this.by[0].toUpperCase() + this.by.substr(1);
    },
    internship_instances() {
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

    last_year_internship_instances() {
      const year = new Date().getFullYear() - 1;
      const results = {};
      let criteria = this.by;
      if (this.by === 'company') {
        criteria = 'company_name';
      }
      for (const entry of this.internship) {
        if (entry.year === year) {
          if (!(entry[criteria] in results)) {
            results[entry[criteria]] = [];
          }
          results[entry[criteria]].push(entry);
        }
      }
      return results;
    },

    acceptance_rates_data() {
      const results = this.internship_instances;
      const sorted_categories = _.map(_.sortBy(_.map(results, (instance, category) => ({
        category,
        number: _.meanBy(instance, 'acceptance_rate'),
      })), 'number'), 'category');

      const final_results = _.pick(results, sorted_categories.slice(-10));
      return _.reverse(_.map(
        final_results,
        (instance, category) => [category, _.meanBy(instance, 'acceptance_rate')],
      ));
    },

    lowest_acceptance_rates_data() {
      const results = this.internship_instances;
      const sorted_categories = _.map(_.sortBy(_.map(results, (instance, category) => ({
        category,
        number: _.meanBy(instance, 'acceptance_rate'),
      })), 'number'), 'category');
      const final_results = _.pick(results, sorted_categories.slice(0, 10));
      return _.map(
        final_results,
        (instance, category) => [category, _.meanBy(instance, 'acceptance_rate')],
      );
    },

    num_interns_data() {
      const results = this.internship_instances;
      const sorted = _.map(_.sortBy(_.map(results, (instance, category) => ({
        category, // the factor we are interested in (either company, major or industry)
        numInterns: instance.length,
      })), 'numInterns'), 'category');
      const final_results = _.pick(results, sorted.slice(-10)); // pick top ten
      return _.reverse(_.map(
        final_results,
        (instance, category) => [category, instance.length],
      ));
    },


    starting_salary_data() {
      const results = this.internship_instances;
      // sort the categories based on mean starting salary
      const sorted = _.map(_.sortBy(_.filter(_.map(results, (instance, category) => ({ category, averageSalary: _.meanBy(_.filter(instance, x => (x.starting_salary !== null && x.starting_salary !== 0 && x.starting_salary !== '')), 'starting_salary') })), x => x.averageSalary), 'averageSalary'), 'category');

      const final_results = _.pick(results, sorted.slice(-10));
      const categories_salary = _.map(final_results, (instance, category) => ({
        category,
        salary: _.map(_.filter(instance, x => (x.starting_salary !== 0 && x.starting_salary !== '' && x.starting_salary)), x => x.starting_salary),
      }));
      const categories = _.map(categories_salary, 'category');
      const sorted_salaries = _.map(_.map(categories_salary, 'salary'), x => x.sort());

      // get the required data for a box plot.
      const required_data = _.map(sorted_salaries,
        x => this.get_box_points(x),
      );
      return {
        category: categories,
        salary: required_data,
      };
    },
    cap_data() {
      const results = this.internship_instances;

      const sorted = _.map(_.sortBy(_.map(results, (instance, category) => ({
        category,
        averageCap: _.meanBy(_.filter(instance, x => (x.cap !== 0)), 'cap'),
      })), 'averageCap'), 'category');
      const final_results = _.pick(results, sorted.slice(-10));
      const categories_cap = _.map(final_results, (instance, category) => ({
        category,
        cap: _.map(_.filter(instance, x => (x.cap !== 0)), x => x.cap),
      }));

      const categories = _.map(categories_cap, 'category');
      const sorted_cap = _.map(_.map(categories_cap, 'cap'), x => x.sort());
      // get the required data for a box plot.
      const required_data = _.map(sorted_cap,
        x => this.get_box_points(x),
      );
      const new_result = this.internship_instances;
      return {
        category: categories,
        cap: required_data,
      };
    },

    opening_positions_data() {
      const results = this.last_year_internship_instances;
      const sorted_categories = _.map(_.sortBy(_.map(results, (instance, category) => ({
        category,
        numInterns: instance.length,
      })), 'numInterns'), 'category');
      const needed_data = _.pick(results, sorted_categories.slice(-10));
      // pick top ten industries that have the most number of interns
      const category_openings = {};
      for (const category of Object.keys(needed_data)) {
        const entries = needed_data[category];
        // for each category, create an array to represent monthly openings
        category_openings[category] = Array(12).fill(0);
        for (const entry of entries) {
          for (let i = entry.starting_month; i <= entry.ending_month; i += 1) {
            category_openings[category][i - 1] += 1;
          }
        }
      }
      const final_data = [];
      for (const category of Object.keys(category_openings)) {
        final_data.push({ name: category, data: category_openings[category] });
      }
      return final_data;
    },
    dashboard_search() {
      return _.map(
        Object.keys(this.internship_instances), o => ({ name: o }),
      );
    },
  },
  /*
  firebase: {
    internship: {
      source: db.ref('internship'),
      asArray: true,
    },
  },
  */
};
</script>
