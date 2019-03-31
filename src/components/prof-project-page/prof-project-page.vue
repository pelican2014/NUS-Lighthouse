<template src="./prof-project-page.html"></template>
<style src="./prof-project-page.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import Navbar from '@/components/nav-bar/nav-bar';
import SubHeader from '@/components/subheader/subheader';
import BasicInfo from '@/components/basic-information-prof/basic-information';
import Background from '@/components/background-statistics-ra/background-statistics-ra';
import Trajectory from '@/components/trajectory-ra/trajectory-ra';
// import CurrentProjects from '@/components/current-projects/current-projects';
import EachProject from '@/components/current-projects/each-project';
import EachPublication from '@/components/recent-publications/each-publication'
// import RecentPublications from '@/components/recent-publications/recent-publications';

export default{
  name: 'prof-project-page',
  components: {
    Navbar,
    SubHeader,
    BasicInfo,
    Background,
    Trajectory,
    // CurrentProjects,
    EachProject,
    EachPublication,
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

  computed: {
    projects() {
      // const profs = this.prof_dict;
      // const prof_id = 1; // change to prof id
      // const prof = profs[this.prof_id];
      // return prof.Projects;

      const professors = this.prof_dict;
      if (professors === null) {
        return [];
      }
      const prof = professors[this.prof_id];
      if (prof && 'Projects' in prof) {
        return prof.Projects;
      }
      return [];
    },
    publications() {
      const professors = this.prof_dict;
      if (professors === null) {
        return [];
      }
      const prof = professors[this.prof_id];
      if (prof && 'Publications' in prof) {
        return prof.Publications;
      }
      return [];
    },
  },

  data() {
    return {

    };
  },

  firebase: {
    prof_dict: {
      source: db.ref('professor'),
      asObject: true,
    },
  },
};
</script>
