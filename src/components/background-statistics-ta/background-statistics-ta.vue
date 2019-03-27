<template src="./background-statistics-ta.html"></template>
<style src="./background-statistics-ta.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import PieChart from '@/components/charts/pie';
import BarChart from '@/components/charts/bar';
import LineChart from '@/components/charts/line';
import Histogram from '@/components/charts/histogram';


export default {
  name: 'Backgroud Statistics',
  components: {
    PieChart,
    BarChart,
    LineChart,
    Histogram,
  },
  props: {
    module: {
      type: String,
      required: true,
    },
    input_cap: {
      type: Number,
      required: true,
    },
  },
  computed: {
    gender() {
      let female = 0;
      let male = 0;
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to module
          const ta = ta_list[item_id];
          if (ta.gender === 'F') {
            female += 1;
          } else {
            male += 1;
          }
        }
      }
      const result = [{ name: 'Female', y: female }, { name: 'Male', y: male }];
      return result;
    },
    major() {
      const major = [];
      const freq = [];
      let prev;
      const major_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) {
          const ta = ta_list[item_id];
          major_list.push(ta.major);
        }
      }

      major_list.sort();
      for (let i = 0; i < major_list.length; i += 1) {
        if (major_list[i] !== prev) {
          major.push(major_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = major_list[i];
      }

      const result = [];
      for (let j = 0; j < major.length; j += 1) {
        const dict = { name: major[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    race() {
      const race = [];
      const freq = [];
      let prev;
      const race_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.race !== '') {
            race_list.push(ta.race);
          }
        }
      }
      race_list.sort();
      for (let i = 0; i < race_list.length; i += 1) {
        if (race_list[i] !== prev) {
          race.push(race_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = race_list[i];
      }

      const result = [];
      for (let j = 0; j < race.length; j += 1) {
        const dict = { name: race[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    nationality() {
      const country = [];
      const freq = [];
      let prev;
      const country_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.nationality !== '') {
            country_list.push(ta.nationality);
          }
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
      return result;
    },
    number() {
      const year = [];
      const freq = [];
      let prev;
      const year_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          year_list.push(ta.year);
        }
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

      const result = { x: year, data: [{ name: 'number of TAs', data: freq }] };
      return result;
    },
    count() {
      let counter = 0;
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          counter += 1;
        }
      }
      return counter;
    },
    cap_hist() {
      const cap_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) {
          const ta = ta_list[item_id];
          cap_list.push(ta.cap);
        }
      }
      const breakpoints = [1, 2, 3, 4, 5];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(cap_list, (o) => {
        if (o > last) {
          return 5;
        } else if (o < first) {
          return 0;
        } else {
          return Math.floor(o);
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point;
        if (current_point < first) {
          return { name: '<' + first, y: count };
        } else if (current_point >= last) {
          return { name: '>=' + last, y: count };
        } else {
          const next_point = Number(current_point) + 1;
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },
  },
  firebase: {
    ta_dict: {
      source: db.ref('ta'),
      asObject: true,
    },
    module_dict: {
      source: db.ref('modules'),
      asObject: true,
    },
  },
  data() {
    return {
      totalNum: 70,
    };
  },
};


</script>
