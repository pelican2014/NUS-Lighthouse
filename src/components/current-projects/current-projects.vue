<template src="./current-projects.html"></template>
<style src="./current-projects.scss"></style>
<script>
import db from '@/firebase';
import eachProject from './each-project';

export default {
  name: 'CurrentProjects',
  components: {
    eachProject,
  },
  computed: {
    projects() {
      const profs = this.prof_dict['.value'];
      const prof_id = 1; // change to prof id
      const prof = profs[prof_id];
      return prof.Projects;
    },
  },
  firebase: {
    prof_dict: {
      source: db.ref('professor'),
      asObject: true,
    },
  },
};

</script>
