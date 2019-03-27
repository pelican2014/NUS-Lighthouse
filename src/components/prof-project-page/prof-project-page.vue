<template src="./prof-project-page.html"></template>
<!-- <style src="./prof-project-page.scss" lang="scss"></style> -->

<script>
import db from '@/firebase';
import TopHeader from '@/components/top-header/top-header';
import SubHeader from '@/components/subheader/subheader';
import BasicInfo from '@/components/basic-information-prof/basic-information';
import Background from '@/components/background-statistics-ra/background-statistics-ra';
import Trajectory from '@/components/trajectory-ra/trajectory-ra';
import CurrentProjects from '@/components/current-projects/current-projects';
import RecentPublications from '@/components/recent-publications/recent-publications';

export default{
  name: 'prof-project-page',
  components: {
    TopHeader,
    SubHeader,
    BasicInfo,
    Background,
    Trajectory,
    CurrentProjects,
    RecentPublications,
  },
  props: {
    username: {
      Type: String,
    },
    prof_id: {
      Type: Number,
      required: true,
    },
  },

  data() {
    return {

    };
  },
};
</script>
