import { mapState, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      message: 'Please check your password and try again',
    };
  },
  computed: {
    ...mapState({
      alert: state => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    },
  },
};
