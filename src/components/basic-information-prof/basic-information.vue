<template src='./basic-information.html'></template>
<style src='./basic-information.scss' lang='scss'></style>
<script>
import db from '@/firebase';

export default {
  name: 'BasicInformation',
  props: {
    prof_id: {
      type: Number,
      // required: true,
    },
  },
  computed: {
    research_prof() {
      const profs = this.prof_dict;
      if (!profs || !profs[this.prof_id]) return null;
      const prof = profs[this.prof_id];
      const result = {
        prof_photo_link: 'https://www.comp.nus.edu.sg/images/resources/content/about/HAHN-Jungpil-2-IMG.png',
        prof_name: prof['Prof Name'],
        prof_title: prof['Status'],
        prof_department: prof['Title'],
        prof_office: prof['Office'],
        prof_tel: prof['Phone'],
        prof_research_focus: prof['Focus'],
      };
      return result;
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
