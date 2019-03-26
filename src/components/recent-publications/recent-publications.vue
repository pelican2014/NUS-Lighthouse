<template src="./recent-publications.html"></template>
<style src="./recent-publications.scss" lang="scss"></style>
<script>
import db from '@/firebase';
import eachPublication from './each-publication';

export default {
  name: 'RecentPublications',
  components: {
    eachPublication,
  },
  props: {
    prof_id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    data() {
      // const prof_id = 2;
      const professors = this.data_dict['.value'];
      if (professors == null) {
        return [];
      }
      const prof = professors[this.prof_id];
      if (prof && 'Publications' in prof) {
        return prof.Publications;
      }
      return [];
    },
  },
  firebase: {
    data_dict: {
      source: db.ref('professor'),
      asObject: true,
    },
  },
};

</script>
