<template src="./background-statistics.html"></template>
<style src="./background-statistics.scss" lang="scss"></style>

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
    prof_id: {
      type: Number,
      required: true,
    },
    input_cap: {
      type: Number,
      required: true,
    },
  },
  computed: {
    publication() {
      const professors = this.prof_dict['.value'];
      if (professors == null) {
        return [];
      }

      const prof = professors[1];// change to prof_id
      if (prof && 'Publications' in prof) {
        return prof.Publications;
      }

      return [];
    },
    gender() {
      let female = 0;
      let male = 0;
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.gender === 'F') {
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
      const majors = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') {
          const ra = this.ra_dict[item_id];
          majors.push(ra.major);
        }
      }

      majors.sort();
      for (let i = 0; i < majors.length; i += 1) {
        if (majors[i] !== prev) {
          major.push(majors[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = majors[i];
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
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.race !== '') {
            race_list.push(ra.race);
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
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.nationality !== '') {
            country_list.push(ra.nationality);
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
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          year_list.push(ra.year);
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

      const result = { x: year, data: [{ name: 'number of RAs', data: freq }] };
      return result;
    },
    // cap() {
    //   const cap_list = [];
    //   for (const item_id in this.ra_dict) {
    //     if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
    //       const ra = this.ra_dict[item_id];
    //       cap_list.push(ra.cap);
    //     }
    //   }
    //   return cap_list;
    // },
    cap_hist() {
      const cap_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          cap_list.push(ra.cap);
        }
      }

      const breakpoints = [1, 2, 3, 4, 5];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.cap_list, (o) => {
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
          const next_point = breakpoints[breakpoints.indexOf(current_point) + 1];
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },
  },
  firebase: {
    ra_dict: {
      source: db.ref('ra'),
      asObject: true,
    },
    prof_dict: {
      source: db.ref('professor'),
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
