<template src='./basic-information-major.html'></template>
<style src='./basic-information-major.scss' lang='scss'></style>
<script>
import db from '@/firebase';

export default {
  name: 'BasicInformation',
  props: {
    major_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shorthand: 'BA',
      faculty: 'SoC',
      description: this.major_name + " is a program in the School of Computing, National University of Singapore. An NUS education provides a strong technical foundation across all areas of computing, meaning that your Business Analytics training will be bolstered by strong general computer skills. Accordingly, a Business Analytics degree from NUS will provide you with the skills and expertise needed to build a career in today's fastest-growing and most exciting profession.",
      url: 'https://www.comp.nus.edu.sg/programmes/ug/ba/',
    };
  },
//   computed: {
//     module() {
//       const mod = this.module_dict[this.module_name]; // change to this.module
//       if (!mod) return null;
//       const result = {
//         module_code: this.module_name, // change to this.module
//         module_name: mod['course_title'],
//         module_course: mod['major'],
//         module_MC: mod['module_credits'],
//         module_description: mod['module_description'],
//       };
//       return result;
//     },
//   },
//   firebase: {
//     module_dict: {
//       source: db.ref('modules'),
//       asObject: true,
//     },
//   },
};

</script>
