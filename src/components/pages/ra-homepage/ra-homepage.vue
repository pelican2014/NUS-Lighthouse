<template src='./internship-homepage.html'></template>
<style src='./internship-homepage.scss' lang='scss'></style>
<script>

import topHeader from '../top-header/top-header';
import subheader from '../subheader/subheader';
import searchBar from '../search-bar/search-bar';
import industryExplorer from '../industry-explorer/industry-explorer';
import db from './../../firebase/firebase';

export default {
  name: 'InternshipHomepage',
  components: {
    topHeader,
    subheader,
    searchBar,
    industryExplorer,
  },
  // props: {
  //   data: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {
    getIndustryData() {
      return {
        num_interns: {
          title: 'Number of Interns by Industry',
          yname: 'No. of interns',
          data: this.numInternBy('Industry'),
        },
        starting_salary: {
          title: 'Starting Salary of Graduates by Industry',
          yname: 'S$',
          data: this.startingSalaryBy('Industry'),
        },
        cap: {
          title: 'CAP of successful applicants',
          yname: 'Cumulative Average Point (CAP)',
          data: this.capBy('Industry'),
        },
        accept_rate: {
          title: 'Internship Acceptance Rate by Major',
          yname: 'Acceptance rate (%)',
          data: this.acceptRateBy('Industry'),
        },
        opening_positions: {
          title: 'Opening Positions by Industry',
          yname: 'No. of positions',
          data: this.openPositionBy('Industry'),
        },
      };
    },
  },

  methods: {
    numInternBy(typestring) {
      return [
        ['Tongyao', '1'],
        ['a', 2]
      ];
    },
    startingSalaryBy(typestring) {
      return;
    },
    capBy(typestring) {
      return;
    },
    acceptRateBy(typestring) {
      return;
    },
    openPositionBy(typestring) {
      return;
    },
  },
};

</script>
