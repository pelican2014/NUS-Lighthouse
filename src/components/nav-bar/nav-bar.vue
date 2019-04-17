<template src="./nav-bar.html"></template>
<style src="./nav-bar.scss" lang="scss"></style>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'nav-bar',
  props: {
    sectionIn: {
      type: String,
      required: false,
    },
  },
  methods: {
    ...mapActions('account', ['logout']),
    handle_logout() {
      this.logout();
      this.$router.go();
    },
  },
  computed: {
    section_path() {
      if (!this.sectionIn) return '';
      if (this.sectionIn === 'internship') {
        return '/internship-homepage';
      }
      if (this.sectionIn === 'ra') {
        return '/raPage';
      }
      if (this.sectionIn === 'ta') {
        return '/ta-page';
      }
    },
    section_name() {
      if (!this.sectionIn) return '';
      if (this.sectionIn === 'internship') {
        return 'Internships';
      }
      if (this.sectionIn === 'ra') {
        return 'Research';
      }
      if (this.sectionIn === 'ta') {
        return 'Teaching';
      }
    },
  },

};

</script>
