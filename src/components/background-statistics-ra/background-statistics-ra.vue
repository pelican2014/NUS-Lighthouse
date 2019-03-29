<template src="./background-statistics-ra.html"></template>
<style src="./background-statistics-ra.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Color from 'color';
import Math from 'mathjs';
import PieChart from '@/components/charts/pie';
import BarChart from '@/components/charts/bar';
import LineChart from '@/components/charts/line';
import Histogram from '@/components/charts/histogram';
import Treemap from '@/components/charts/treemap';


export default {
  name: 'Backgroud Statistics',
  components: {
    PieChart,
    BarChart,
    LineChart,
    Histogram,
    Treemap,
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
    totalNum() {
      let counter = 0;
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === this.prof_id) { // change to prof id
          counter += 1;
        }
      }
      return counter;
    },
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) {
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === this.prof_id) {
          const ra = this.ra_dict[item_id];
          cap_list.push(ra.cap);
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
    major_faculty() {
      const child_list = [];
      const faculty_list = [];
      const major_list = [];
      const id_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === this.prof_id) {
          id_list.push(item_id);
          const ra = this.ra_dict[item_id];
          if (!major_list.includes(ra.major)) {
            major_list.push(ra.major);
          }
          if (!faculty_list.includes(ra.faculty)) {
            faculty_list.push(ra.faculty);
          }
        }
      }

      for (let i = 0; i < faculty_list.length; i += 1) {
        const fac = faculty_list[i];
        for (let j = 0; j < major_list.length; j += 1) {
          const major = major_list[j];
          let freq = 0;
          for (let k = 0; k < id_list.length; k += 1) {
            const id_faculty = this.ra_dict[id_list[k]].faculty;
            const id_major = this.ra_dict[id_list[k]].major;
            if ((id_faculty === fac) && (id_major === major)) {
              freq += 1;
            }
          }
          if (freq !== 0) {
            child_list.push({ name: major, parent: fac, value: freq });
          }
        }
      }

      const color_list = ['#4e3a96', '#0e75bc', '#f89520', '#9c5252', '#685343', '#175742', '#ecb605', '#fbd0bf', '#7e8eff'];
      const result = [];
      for (let i = 0; i < faculty_list.length; i += 1) {
        const fac = faculty_list[i];
        const major = [];
        const values = [];
        const random_color = color_list[Math.floor(Math.random() * color_list.length)];
        result.push({ id: faculty_list[i], name: faculty_list[i] });
        for (let j = 0; j < child_list.length; j += 1) {
          if (child_list[j].parent === fac) {
            major.push(child_list[j].name);
            values.push(child_list[j].value);
          }
        }
        const freq_min = Math.min(values);
        const freq_max = Math.max(values);
        for (let k = 0; k < values.length; k += 1) {
          const normalised_value = (((values[k] - freq_min) * 2) / (freq_max - freq_min)) - 1;
          const normalised_color = Color(random_color).whiten(normalised_value).hex();

          result.push({ name: major[k], parent: fac, value: values[k], color: random_color });
        }
      }
      return result;
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
};


</script>
