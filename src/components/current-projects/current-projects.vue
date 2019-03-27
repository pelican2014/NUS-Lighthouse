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
  props: {
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
      if (professors == null) {
        return [];
      }
      const prof = professors[this.prof_id];
      if (prof && 'Projects' in prof) {
        return prof.Projects;
      }
      return [];
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
