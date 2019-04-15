<template src="./nav-bar.html"></template>
<style src="./nav-bar.scss" lang="scss"></style>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'nav-bar',
  methods: {
    ...mapActions('account', ['logout']),
    handle_logout() {
      this.logout();
      this.$router.go();
    },
  },
};

</script>
