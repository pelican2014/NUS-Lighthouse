<template src="./major-page.html"></template>
<style src="./major-page.scss" lang="scss"></style>
<script>
import _ from 'lodash';
import NavBar from '@/components/nav-bar/nav-bar';
// import FilteredSearch from '@/components/filtered-search/filtered-search';
import MajorInsight from '@/components/major-insight/major-insight';
import Pyramid from '@/components/charts/population-pyramid';
import MajorDescription from '@/components/basic-information-major/basic-information-major';
import db from '@/firebase';

const median = (arr) => {
  const mid = Math.floor(arr.length / 2);
  const nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

export default {
  name: 'PositionDetails',
  methods: {
    get_entropy(arr) {
      let result = 0;
      const arrSum = x_arr => x_arr.reduce((a, b) => a + b, 0);
      const total = arrSum(arr);
      for (let i = 0; i < arr.length; i += 1) {
        result -= (arr[i] / total) * Math.log2((arr[i] / total));
      }
      return result;
    },
    average(arr) {
      return arr.reduce((sume, el) => sume + el, 0) / arr.length;
    },

    // update_industry(industry) {
    //   this.industry = industry;
    // },
    // update_major(major) {
    //   this.major = major;
    // },
  },
  mounted() {
    // if (this.$route.query && 'industry' in this.$route.query) {
    //   this.industry = this.$route.query['industry'];
    // }
    if (this.$route.query && 'major' in this.$route.query) {
      this.major = this.$route.query['major'];
    }
  },
  data() {
    // let industry = '(Unrestricted)';
    let major = '(Unrestricted)';

    // if (this.industry) industry = this.industry;
    if (this.major) major = this.major;

    return {
      // industry,
      major,
    };
  },
  components: {
    // FilteredSearch,
    MajorInsight,
    Pyramid,
    NavBar,
    MajorDescription,
  },
  computed: {
    filtered_internship() {
      let results = this.internship;
      // if (this.industry !== '(Unrestricted)') {
      //   results = _.filter(results, { industry: this.industry });
      // }
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
    average_num_interns() {
      return this.internship.length / (_.uniq(_.map(this.internship, x => x.major)).length);
    },
    average_starting_salary() {
      const results = _.filter(this.internship, o => o.starting_salary !== '');
      const salaries = _.map(results, x => x.starting_salary);
      return this.average(salaries);
    },
    average_acceptance_rate() {
      const acceptance_rates = _.map(this.internship, x => x.acceptance_rate);
      return this.average(acceptance_rates);
    },
    overall_average_cap() {
      const all_cap = _.map(_.filter(this.internship, x => x.cap !== ''), x => x.cap);
      return this.average(all_cap);
    },
    overall_gender_index() {
      let female = 0;
      let male = 0;
      for (const internship of this.internship) {
        if (internship.gender === 'F') {
          female += 1;
        } else {
          male += 1;
        }
      }
      return this.get_entropy([male, female]);
    },
    major_gender_index() {
      const male = this.gender[1].y;
      const female = this.gender[0].y;
      return this.get_entropy([male, female]);
    },
    major_mean_starting_salary() {
      let results = this.internship;
      if (this.major !== '(Unrestricted)') {
        results = _.filter(results, { major: this.major });
      }
      results = _.filter(results, o => o.starting_salary !== '');
      const salaries = _.map(results, x => x.starting_salary);
      return this.average(salaries);
    },
    major_mean_cap() {
      const all_cap = _.map(_.filter(this.filtered_internship, x => x.cap !== ''), x => x.cap);
      return this.average(all_cap);
    },
    major_acceptance_rate() {
      const acceptance_rates = _.map(this.filtered_internship, x => x.acceptance_rate);
      return this.average(acceptance_rates);
    },
    spider_chart_data() {
      const major_interns = this.total_num;
      const major_gender_index = this.major_gender_index;
      const major_mean_cap = this.major_mean_cap;
      const major_acceptance_rate = this.major_acceptance_rate;
      const major_mean_starting_salary = this.major_mean_starting_salary;
      const average_num_interns = this.average_num_interns;
      const overall_gender_index = this.overall_gender_index;
      const overall_average_cap = this.overall_average_cap;
      const average_starting_salary = this.average_starting_salary;
      const average_acceptance_rate = this.average_acceptance_rate;
      const needed_data = [];
      needed_data.push({
        name: 'Average of all industries (Benchmark)',
        data: [1, 1, 1, 1],
      });

      needed_data.push({
        name: this.major,
        data: [
          // industry_interns / average_num_interns,
          major_gender_index / overall_gender_index,
          major_mean_cap / overall_average_cap,
          major_mean_starting_salary / average_starting_salary,
          major_acceptance_rate / average_acceptance_rate,
        ],
      });
      return { title: this.major + ' v.s. All majors', data: needed_data, categories: ['Gender Equality Index', 'Average CAP', 'Average Starting Salary', 'Average Acceptance Rate'] };
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
    company() {
      const dict = {};
      for (const internship of this.filtered_internship) {
        if (internship.company_name !== '') {
          if (internship.company_name in dict) {
            dict[internship.company_name] += 1;
          } else {
            dict[internship.company_name] = 1;
          }
        }
      }
      const result = [];
      for (const company in dict) {
        if (company) {
          result.push({ name: company, weight: dict[company] });
        }
      }
      return result;
    },
    occupation() {
      const dict = {};
      for (const internship of this.filtered_internship) {
        if (internship.occupation !== '') {
          if (internship.occupation in dict) {
            dict[internship.occupation] += 1;
          } else {
            dict[internship.occupation] = 1;
          }
        }
      }
      delete dict['Non Applicable based on skip pattern'];
      delete dict['Others, please provide job title and description'];
      const result = [];
      for (const occupation in dict) {
        if (occupation) {
          result.push({ name: occupation, weight: dict[occupation] });
        }
      }
      return result;
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
