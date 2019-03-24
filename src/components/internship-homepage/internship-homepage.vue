<template src='./internship-homepage.html'></template>
<style src='./internship-homepage.scss' lang='scss'></style>
<script>
import topHeader from '../top-header/top-header';
import subheader from '../subheader/subheader';
import searchBar from '../search-bar/search-bar';
import industryExplorer from '../industry-explorer/industry-explorer';

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
};

</script>
