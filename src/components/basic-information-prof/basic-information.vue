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
        prof_photo_link: 'https://www.shu.ac.uk/~/media/home/about-us/our-people/staff-profiles/vc.jpg?la=en&hash=E5D6639C51259E7A340997A1121F5C1D36367EEE',
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
