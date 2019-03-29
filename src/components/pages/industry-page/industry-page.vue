<template src="./industry-page.html"></template>
<style src="./industry-page.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import NavBar from '@/components/nav-bar/nav-bar';
import FilteredSearch from '@/components/filtered-search/filtered-search';
import IndustryInsight from '@/components/industry-insight/industry-insight';
import Pyramid from '@/components/charts/population-pyramid';

import db from '@/firebase';

const median = (arr) => {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export default {
  name: 'PositionDetails',
  methods: {
    update_industry(industry) {
      this.industry = industry;
    },
    update_major(major) {
      this.major = major;
    },
  },
  data() {
    return {
      industry: '(Unrestricted)',
      major: '(Unrestricted)',
    };
  },
  components: {
    FilteredSearch,
    IndustryInsight,
    Pyramid,
    NavBar,
  },
  computed: {
    filtered_internship() {
      let results = this.internship;
      if (this.industry !== '(Unrestricted)') {
        results = _.filter(results, { industry: this.industry });
      }
      if (this.major !== '(Unrestricted)') {
        results = _.filter(results, { major: this.major });
      }
      return results;
    },

    grad_internship() {
      return _.filter(this.filtered_internship, o => o.starting_salary !== '');
    },
    total_num() {
      return this.filtered_internship.length;
    },
    female() {
      const result = [0, 0, 0, 0];
      for (const internship of this.filtered_internship) {
        if (internship.gender === 'F') {
          if (internship.student_year === 1) {
            result[0] += 1;
          } else if (internship.student_year === 2) {
            result[1] += 1;
          } else if (internship.student_year === 3) {
            result[2] += 1;
          } else {
            result[3] += 1;
          }
        }
      }
      return result;
    },
    male() {
      const result = [0, 0, 0, 0];
      for (const internship of this.filtered_internship) {
        if (internship.gender === 'M') {
          if (internship.student_year === 1) {
            result[0] -= 1;
          } else if (internship.student_year === 2) {
            result[1] -= 1;
          } else if (internship.student_year === 3) {
            result[2] -= 1;
          } else {
            result[3] -= 1;
          }
        }
      }
      return result;
    },
    gender() {
      let female = 0;
      let male = 0;
      for (const internship of this.filtered_internship) {
        if (internship.gender === 'F') {
          female += 1;
        } else {
          male += 1;
        }
      }
      const result = [{ name: 'Female', y: female }, { name: 'Male', y: male }];
      return result;
    },

    nationality() {
      const country = [];
      const freq = [];
      let prev;
      const country_list = [];
      for (const internship of this.filtered_internship) {
        if (internship.nationality !== '') {
          country_list.push(internship.nationality);
        }
      }
      country_list.sort();
      for (let i = 0; i < country_list.length; i += 1) {
        if (country_list[i] !== prev) {
          country.push(country_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = country_list[i];
      }

      const result = [];
      for (let j = 0; j < country.length; j += 1) {
        const dict = { name: country[j], y: freq[j] };
        result.push(dict);
      }
      return _.sortBy(result, 'y').slice(-10);
    },

    faculty() {
      const faculty = [];
      const freq = [];
      let prev;
      const faculty_list = [];
      for (const internship of this.filtered_internship) {
        if (internship.faculty !== '') {
          faculty_list.push(internship.faculty);
        }
      }
      faculty_list.sort();
      for (let i = 0; i < faculty_list.length; i += 1) {
        if (faculty_list[i] !== prev) {
          faculty.push(faculty_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = faculty_list[i];
      }

      const result = [];
      for (let j = 0; j < faculty.length; j += 1) {
        const dict = { name: faculty[j], y: freq[j] };
        result.push(dict);
      }
      return _.sortBy(result, 'y').slice(-10);
    },


    year() {
      const faculty = [];
      const freq = [];
      let prev;
      const faculty_list = [];
      for (const internship of this.filtered_internship) {
        if (internship.student_year !== '') {
          faculty_list.push('Year ' + internship.student_year);
        }
      }
      faculty_list.sort();
      for (let i = 0; i < faculty_list.length; i += 1) {
        if (faculty_list[i] !== prev) {
          faculty.push(faculty_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = faculty_list[i];
      }

      const result = [];
      for (let j = 0; j < faculty.length; j += 1) {
        const dict = { name: faculty[j], y: freq[j] };
        result.push(dict);
      }
      return _.sortBy(result, 'y').slice(-10);
    },

    number() {
      const year = [];
      const freq = [];
      let prev;
      const year_list = [];
      for (const entry of this.filtered_internship) {
        year_list.push(entry.year);
      }
      year_list.sort();
      for (let i = 0; i < year_list.length; i += 1) {
        if (year_list[i] !== prev) {
          year.push(year_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = year_list[i];
      }

      const result = { x: year, data: [{ name: 'number of interns', data: freq }] };
      return result;
    },

    salary_hist() {
      const breakpoints = [3000, 4000, 5000, 6000, 7000];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.grad_internship, (o) => {
        if (o.starting_salary > last) {
          return 7;
        } else if (o.starting_salary < first) {
          return 0;
        } else {
          return Math.floor(o.starting_salary / 1000);
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point * 1000;
        if (current_point < first) {
          return { name: '<' + first, y: count };
        } else if (current_point >= last) {
          return { name: '>=' + last, y: count };
        } else {
          const next_point = breakpoints[breakpoints.indexOf(current_point) + 1];
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },

    salary_line() {
      const year_groups = _.groupBy(this.grad_internship, o => o.year);
      let mean_data = _.map(year_groups, (group, year) => ({
        name: year,
        data: _.meanBy(group, 'starting_salary'),
      }));
      let median_data = _.map(year_groups, (group, year) => ({
        name: year,
        data: median(_.map(group, 'starting_salary')),
      }));
      mean_data = _.sortBy(mean_data, 'name');
      median_data = _.sortBy(median_data, 'name');

      const x = _.map(mean_data, 'name');
      mean_data = _.map(mean_data, 'data');
      median_data = _.map(median_data, 'data');
      return {
        x,
        data: [
          {
            name: 'mean',
            data: mean_data,
          },
          {
            name: 'median',
            data: median_data,
          },
        ],
      };
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
