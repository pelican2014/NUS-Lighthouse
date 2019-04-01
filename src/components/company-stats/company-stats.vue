<template src="./company-stats.html"></template>
<style src="./company-stats.scss" lang="scss"></style>
<script>
import _ from 'lodash';
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Bar from '@/components/charts/bar';
import Histogram from '@/components/charts/histogram';
import SpiderChart from '@/components/charts/spider-chart';

export default {
  name: 'position-stats',
  components: {
    Lines,
    Pie,
    Bar,
    Histogram,
    SpiderChart,
  },
  props: {
    company_id: {
      type: String,
      required: true,
    },
  },
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
  },
  computed: {
    industry_name() {
      return this.company_dict[this.company_id].industry;
    },
    categories() {
      return ['Number of Interns', 'Mean CAP', 'Acceptance Rate', 'Average Starting Salary', 'Gender Equality Index', 'Nationality Diversity Index', 'Race Diversity Index'];
    },

    spider_chart_data() {
      const company_interns = this.number;
      const gender_index = this.gender_index;
      const nationality_index = this.nationality_index;
      const race_index = this.race_index;
      const company_mean_cap = this.average(this.CAP);
      const company_acceptance_rate = this.mean_acceptance_rate;
      const company_mean_salary = this.mean_starting_salary;
      const industry_interns = this.industry_average_num_interns;
      const industry_gender_index = this.industry_gender_index;
      const industry_nationality_index = this.industry_nationality_index;
      const industry_race_index = this.industry_race_index;
      const industry_mean_cap = this.industry_mean_cap;
      const industry_mean_salary = this.industry_mean_salary;
      const industry_acceptance_rate = this.industry_acceptance_rate;
      const needed_data = [];
      needed_data.push({
        name: 'Industry Benchmark',
        data: [1, 1, 1, 1, 1, 1, 1],
      });
      needed_data.push({
        name: this.company_dict[this.company_id].company_name,
        data: [
          company_interns / industry_interns,
          company_mean_cap / industry_mean_cap,
          company_acceptance_rate / industry_acceptance_rate,
          company_mean_salary / industry_mean_salary,
          gender_index / industry_gender_index,
          nationality_index / industry_nationality_index,
          race_index / industry_race_index,
        ],
      });
      return needed_data;
    },
    mean_acceptance_rate() {
      const acceptance_rates = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          acceptance_rates.push(internship.acceptance_rate);
        }
      }
      return this.average(acceptance_rates);
    },
    mean_starting_salary() {
      const positions = this.company_dict[this.company_id].positions;

      const starting_salary = _.map(positions, (instance, key) => instance.starting_salary);
      return this.average(starting_salary);
    },
    gender_index() {
      // use cross entropy as an indicator
      const male = this.gender[0].y;
      const female = this.gender[1].y;
      return this.get_entropy([male, female]);
    },
    race_index() {
      const race_numbers = _.map(this.race, x => x[1]);
      return this.get_entropy(race_numbers);
    },
    nationality_index() {
      const nationality_numbers = _.map(this.nationality, x => x[1]);
      return this.get_entropy(nationality_numbers);
    },
    number() {
      let num = 0;
      for (const internship_id in this.internship_dict) {
        if (internship_id && this.internship_dict[internship_id].company_id === this.company_id) {
          num += 1;
        }
      }
      return num;
    },
    industry_average_num_interns() {
      let num = 0;
      for (const internship_id in this.internship_dict) {
        if (internship_id && this.internship_dict[internship_id].industry === this.industry_name) {
          num += 1;
        }
      }
      let companies_count = 0;
      for (const company_id in this.company_dict) {
        if (company_id && this.company_dict[company_id].industry === this.industry_name) {
          companies_count += 1;
        }
      }
      return num / companies_count;
    },
    industry_gender_index() {
      let male = 0;
      let female = 0;
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].industry === this.industry_name) {
          const internship = this.internship_dict[internship_id];
          if (internship.gender === 'F') {
            female += 1;
          } else {
            male += 1;
          }
        }
      }
      return this.get_entropy([male, female]);
    },
    industry_race_index() {
      const results = {};
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].industry === this.industry_name) {
          const internship = this.internship_dict[internship_id];
          if (internship.race in results) {
            results[internship.race] += 1;
          } else {
            results[internship.race] = 1;
          }
        }
      }
      const output = [];
      for (const eachRace in results) {
        if (eachRace) {
          output.push([eachRace, results[eachRace]]);
        }
      }
      const race_numbers = _.map(output, x => x[1]);
      return this.get_entropy(race_numbers);
    },
    industry_nationality_index() {
      const results = {};
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].industry === this.industry_name) {
          const internship = this.internship_dict[internship_id];
          if (internship.nationality in results) {
            results[internship.nationality] += 1;
          } else {
            results[internship.nationality] = 1;
          }
        }
      }
      const output = [];
      for (const nation in results) {
        if (nation) {
          const eachNation = [nation, results[nation]];
          output.push(eachNation);
        }
      }
      const result = _.sortBy(output, 1).slice(-5);
      const nationality_numbers = _.map(result, x => x[1]);
      return this.get_entropy(nationality_numbers);
    },
    industry_acceptance_rate() {
      const acceptance_rates = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].industry === this.industry_name) {
          const internship = this.internship_dict[internship_id];
          acceptance_rates.push(internship.acceptance_rate);
        }
      }
      return this.average(acceptance_rates);
    },
    industry_mean_salary() {
      const starting_salary = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].graduate_industry === this.industry_name) {
          const internship = this.internship_dict[internship_id];
          starting_salary.push(internship.starting_salary);
        }
      }
      return this.average(starting_salary);
    },
    industry_mean_cap() {
      const results = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].industry === this.industry_name) {
          if (this.internship_dict[internship_id].cap) {
            results.push(this.internship_dict[internship_id].cap);
          }
        }
      }
      return this.average(results);
    },

    gender() {
      let male = 0;
      let female = 0;
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          if (internship.gender === 'F') {
            female += 1;
          } else {
            male += 1;
          }
        }
      }
      return [{ name: 'male', y: male }, { name: 'female', y: female }];
    },
    major() {
      const results = {};
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          if (internship.major in results) {
            results[internship.major] += 1;
          } else {
            results[internship.major] = 1;
          }
        }
      }
      const output = [];
      for (const major in results) {
        if (major) {
          output.push({ name: major, y: results[major] });
        }
      }
      return _.sortBy(output, 'y').slice(-10);
    },
    race() {
      const results = {};
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          if (internship.race in results) {
            results[internship.race] += 1;
          } else {
            results[internship.race] = 1;
          }
        }
      }
      const output = [];
      for (const eachRace in results) {
        if (eachRace) {
          output.push([eachRace, results[eachRace]]);
        }
      }
      return output;
    },
    nationality() {
      const results = {};
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          if (internship.nationality in results) {
            results[internship.nationality] += 1;
          } else {
            results[internship.nationality] = 1;
          }
        }
      }
      const output = [];
      for (const nation in results) {
        if (nation) {
          const eachNation = [nation, results[nation]];
          output.push(eachNation);
        }
      }
      return _.sortBy(output, 1).slice(-5);
    },
    CAP() {
      const results = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          if (this.internship_dict[internship_id].cap) {
            results.push(this.internship_dict[internship_id].cap);
          }
        }
      }
      return results;
    },
    CAP_hist() {
      const breakpoints = [];
      for (let i = 0; Math.round(i * 10) / 10 <= 5; i += 0.2) {
        breakpoints.push(Math.round(i * 10) / 10);
      }

      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.CAP, (o) => {
        if (o > last) {
          return 5;
        } else if (o < first) {
          return 0;
        } else {
          return Math.round(Math.floor(o * 5) / 5 * 10) / 10;
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point;
        if (current_point < first) {
          return { name: '<' + first, y: count };
        } else if (current_point >= last) {
          return { name: '>=' + last, y: count };
        } else {
          const next_point = Math.round((Number(current_point) + 0.2) * 5) / 5;
          return {
            name: current_point + ' to ' + next_point,
            y: count,
            start: current_point,
          };
        }
      });
      return _.map(_.sortBy(counts, 'start'), o => ({ name: o.name, y: o.y }));
    },
    interns() {
      const results = {};
      const years = [];
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id].company_id === this.company_id) {
          const internship = this.internship_dict[internship_id];
          if (internship.year in results) {
            results[internship.year] += 1;
          } else {
            results[internship.year] = 1;
            years.push(internship.year);
          }
        }
      }
      years.sort();
      const output = [];
      for (const year of years) {
        if (year) {
          output.push(results[year]);
        }
      }
      return [years, [{ name: 'Interns', data: output }]];
    },
  },
  firebase: {
    internship_dict: {
      source: db.ref('internship'),
      asObject: true,
    },
    company_dict: {
      source: db.ref('company'),
      asObject: true,
    },
  },
};

</script>
