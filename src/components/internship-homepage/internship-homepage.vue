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
  data() {
    return {
      data: {
        name:"haha",
        bar_data: [
          ['China', 24.2],
          ['Singapore', 20.8],
          ['India', 14.9],
          ['Thailand', 13.7],
          ['Malaysia', 13.1],
          ['Indonesia', 12.7],
          ['Hong Kong', 12.4],
          ['Russia', 12.2],
          ['Brazil', 12.0],
          ['Mexico', 11.7],
          ['Kenya', 11.5],
        ],
      },
    };
  },
};

</script>
