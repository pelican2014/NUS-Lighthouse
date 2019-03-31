<template src="./background-statistics-ta.html"></template>
<style src="./background-statistics-ta.scss" lang="scss"></style>

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
import Pyramid from '@/components/charts/population-pyramid';


export default {
  name: 'Backgroud Statistics',
  components: {
    PieChart,
    BarChart,
    LineChart,
    Histogram,
    Treemap,
    Pyramid,
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
    // male() {
    //   const result = [0, 0, 0, 0];
    //   for(const student_id in ta_list) {
    //     if (ta_list[item_id].module_code === this.module and ta_list[item_id].gender === 'M') {
    //       if (ta_list[item_id].student_year === 1) {
    //         result[0] -= 1;
    //       } else if (ta_list[item_id].student_year === 2) {
    //         result[1] -= 1;
    //       } else if (ta_list[item_id].student_year === 3) {
    //         result[2] -=1;
    //       } else {
    //         result[3] -=1;
    //       }
    //     }
    //   }
    //   return result;
    // },
    // female() {
    //   const result = [0, 0, 0, 0];
    //   for(const student_id in ta_list) {
    //     if (ta_list[item_id].module_code === this.module and ta_list[item_id].gender === 'F') {
    //       if (ta_list[item_id].student_year === 1) {
    //         result[0] += 1;
    //       } else if (ta_list[item_id].student_year === 2) {
    //         result[1] += 1;
    //       } else if (ta_list[item_id].student_year === 3) {
    //         result[2] +=1;
    //       } else {
    //         result[3] +=1;
    //       }
    //     }
    //   }
    //   return result;
    // },
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
      for (const item_id in this.ta_dict) {
        if (this.ta_dict[item_id].module_code === this.module) {
          const ta = this.ta_dict[item_id];
          cap_list.push(ta.cap);
        }
      }
      const breakpoints = [];
      for (let i = 0; Math.round(i * 10) / 10 <= 5; i += 0.2) {
        breakpoints.push(Math.round(i * 10) / 10);
      }
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(cap_list, (o) => {
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
    major_faculty() {
      const child_list = [];
      const faculty_list = [];
      const major_list = [];
      const id_list = [];
      for (const item_id in this.ta_dict) {
        if (this.ta_dict[item_id].module_code === this.module) {
          id_list.push(item_id);
          const ta = this.ta_dict[item_id];
          if (!major_list.includes(ta.major)) {
            major_list.push(ta.major);
          }
          if (!faculty_list.includes(ta.faculty)) {
            faculty_list.push(ta.faculty);
          }
        }
      }

      for (let i = 0; i < faculty_list.length; i += 1) {
        const fac = faculty_list[i];
        for (let j = 0; j < major_list.length; j += 1) {
          const major = major_list[j];
          let freq = 0;
          for (let k = 0; k < id_list.length; k += 1) {
            const id_faculty = this.ta_dict[id_list[k]].faculty;
            const id_major = this.ta_dict[id_list[k]].major;
            if ((id_faculty === fac) && (id_major === major)) {
              freq += 1;
            }
          }
          if (freq !== 0) {
            child_list.push({ name: major, parent: fac, value: freq });
          }
        }
      }

      const color_list = ['#f9ee0e', '#eded10', '#ff9500', '#5c7a1c', '#a1af31', '#1e3c70', '#ff7d00'];
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
        if (freq_max === freq_min) {
          result.push({ name: major[0], parent: fac, value: values[0], color: random_color });
        } else {
          for (let k = 0; k < values.length; k += 1) {
            const normalised_value = (((values[k] - freq_min) * 1) / (freq_max - freq_min)) - 0.5;
            const normalised_color = Color(random_color).blacken(normalised_value).hex();
            result.push({ name: major[k], parent: fac, value: values[k], color: normalised_color });
          }
        }
      }
      return result;
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
