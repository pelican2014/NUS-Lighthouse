<template src = './company-home.html'></template>
<style src = './company-home.scss' lang = 'scss'></style>

<script>
import db from '@/firebase';
import Header from '@/components/top-header/top-header';
import Subheader from '@/components/subheader/subheader';
import Company from '@/components/company/company';
// import Stats from '@/components/position-stats/position-stats';
import OpeningPosition from '@/components/opening-positions/opening-positions';


export default {
  name: 'company-name',
  components: {
  	Header,
  	Subheader,
  	Company,
    // Stats,
    OpeningPosition,
  },
  props: {
  	company_id: {
  		type: String,
  		required: true,
    },
  },
  computed: {
  },
  // firebase: {
  // 	internship_dict: {
  // 		source: db.ref('internship'),
  // 		asObject: true,
  // 	},
  // 	company_dict: {
  // 		source: db.ref('company'),
  // 		asObject: true,
  // 	},
  // },
};
</script>
