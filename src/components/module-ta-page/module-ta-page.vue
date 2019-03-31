<template src="./module-ta-page.html"></template>
<style src="./module-ta-page.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import Navbar from '@/components/nav-bar/nav-bar';
import SubHeader from '@/components/subheader/subheader';
import BasicInfo from '@/components/basic-information-ta/basic-information';
import Background from '@/components/background-statistics-ta/background-statistics-ta';
import Trajectory from '@/components/trajectory-ta/trajectory-position';

export default{
  name: 'module-ta-page',
  components: {
    Navbar,
    SubHeader,
    BasicInfo,
    Background,
    Trajectory,
  },
  props: {
    username: {
      Type: String,
    },
    module_name: {
      Type: String,
      required: true,
      default: 'CS1010S',
    },
  },
};
</script>
