<template src="./background-statistics.html"></template>
<style src="./background-statistics.scss" lang="scss"></style>

<script>
import PieChart from '@/components/background-statistics/pie-chart';
import BarChart from '@/components/background-statistics/bar-chart';
import PieChartFaculty from '@/components/background-statistics/pie-chart-faculty';
import PieChartYear from '@/components/background-statistics/pie-chart-year';
// import PieChartMajor from '@/components/background-statistics/pie-chart';
import BarChartRace from '@/components/background-statistics/bar-chart-race';
import BarChartNationality from '@/components/background-statistics/bar-chart-nationality';
import WordCloudModule from '@/components/background-statistics/word-cloud-module';
import HistogramCAP from '@/components/background-statistics/histogram-cap';


import db from '../../firebase/firebase';

export default {
  name: 'Backgroud Statistics',
  components: {
    PieChart,
    BarChart,
    PieChartFaculty,
    PieChartYear,
    BarChartRace,
    BarChartNationality,
    WordCloudModule,
    HistogramCAP,
  },
  props: {
    prof_id: {
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
