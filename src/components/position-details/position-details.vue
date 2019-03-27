<template src="./position-details.html"></template>
<style src="./position-details.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Lines from '@/components/charts/line';
import Histogram from '@/components/charts/histogram';

export default {
  name: 'PositionDetails',
  components: {
    Lines,
    Histogram,
  },
  data() {
    return {
      label: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    };
  },
  props: {
    position_id: {
      type: String,
      required: true,
    },
  },
  computed: {
    companyID() {
      let id = null;
      for (const company_id in this.company_dict) {
        if (company_id) {
          const positions = this.company_dict[company_id].positions;
          for (const position_id in positions) {
            if (position_id === this.position_id) {
              id = company_id;
            }
          }
        }
      }
      return id;
    },
    num_positions() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return [{ name: 'Openings', data: this.company_dict[this.companyID].positions[this.position_id].number_of_openings }];
    },
    salary() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.company_dict[this.companyID].positions[this.position_id].starting_salary;
    },
    title() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.company_dict[this.companyID].positions[this.position_id].position_name;
    },
    all_salary() {
      if (!this.title) return null;
      const salaries = [];
      for (const company_id in this.company_dict) {
        if (company_id) {
          const positions = this.company_dict[company_id].positions;
          for (const position_id in positions) {
            if (positions[position_id].position_name === this.title) {
              salaries.push(positions[position_id].starting_salary);
            }
          }
        }
      }
      return salaries;
    },
    salary_hist() {
      const breakpoints = [2000, 3000, 4000, 5000, 6000];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.all_salary, (o) => {
        if (o > last) {
          return 7000;
        } else if (o < first) {
          return 0;
        } else {
          return Math.floor(o / 1000);
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
  },
  firebase: {
    company_dict: {
      source: db.ref('company'),
      asObject: true,
    },
  },
};


</script>
