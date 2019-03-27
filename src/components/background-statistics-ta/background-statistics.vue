<template src="./background-statistics.html"></template>
<style src="./background-statistics.scss" lang="scss"></style>

<script>
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
      const ta_list = this.ta_dict['.value'];
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
      const ta_list = this.ta_dict['.value'];
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
      const ta_list = this.ta_dict['.value'];
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
      const ta_list = this.ta_dict['.value'];
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
      const ta_list = this.ta_dict['.value'];
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
    cap() {
      const cap_list = [];
      const ta_list = this.ta_dict['.value'];
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          cap_list.push(ta.cap);
        }
      }
      return cap_list;
    },
    count() {
      let counter = 0;
      const ta_list = this.ta_dict['.value'];
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          counter += 1;
        }
      }
      return counter;
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
