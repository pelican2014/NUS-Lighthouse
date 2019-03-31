<template src='./basic-information.html'></template>
<style src='./basic-information.scss' lang='scss'></style>
<script>
import db from '@/firebase';

export default {
  name: 'BasicInformation',
  props: {
    module_name: {
      type: String,
      required: true,
    },
  },
  computed: {
    module() {
      const mod = this.module_dict[this.module_name]; // change to this.module
      if (!mod) return null;
      const result = {
        module_code: this.module_name, // change to this.module
        module_name: mod['course_title'],
        module_course: mod['major'],
        module_MC: mod['module_credits'],
        module_description: mod['module_description'],
      };
      return result;
    },
  },
  firebase: {
    module_dict: {
      source: db.ref('modules'),
      asObject: true,
    },
  },
};

</script>
