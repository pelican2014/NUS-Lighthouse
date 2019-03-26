<template src="./position-stats.html"></template>
<style src="./position-stats.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Bar from '@/components/charts/bar';
import Histogram from '@/components/charts/histogram';

export default{
  name: 'position-stats',
  components: {
    Lines,
    Pie,
    Bar,
    Histogram,
  },
  props: {
    company_id: {
      type: String,
      required: true,
    },
  },
  computed: {
    number() {
      let num = 0;
      for (const internship_id in this.internship_dict) {
        if (internship_id && this.internship_dict[internship_id].company_id === this.company_id) {
          num += 1;
        }
      }
      return num;
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
      let output = [];
      for (const major in results) {
        if (major) {
          output.push({ name: major, y: results[major] });
        }
      }
      output.sort((a, b) => (a.y > b.y) ? -1 : 1);
      output = output.slice(0, 10);
      return output;
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
      let output = [];
      for (const nation in results) {
        if (nation) {
          const eachNation = [nation, results[nation]];
          output.push(eachNation);
        }
      }
      output = output.sort(function(a, b) { return b[1] - a[1]; });
      output = output.slice(0, 5);
      return output;
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
  },
};
</script>
