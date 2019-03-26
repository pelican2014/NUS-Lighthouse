<template src = './position-info.html'></template>
<style src = './position-info.scss' lang = 'scss'></style>

<script>
import db from '@/firebase';

export default {
  name: 'BasicInformation',
  props: {
    position_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  computed: {
    companyID() {
      let id = null;
      for (const company_id in this.company_dict) {
        if (company_id) {
          const positions = this.company_dict[company_id].positions;
          for (const position_id in positions) {
            if (position_id === this.position_id) {
              id = company_id;
            }
          }
        }
      }
      return id;
    },
    company_name() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return;
      else return this.company_dict[this.companyID].company_name;
    },
    position_description() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return;
      return this.company_dict[this.companyID].positions[this.position_id].position_description;
    },
    position_title() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return;
      return this.company_dict[this.companyID].positions[this.position_id].position_name;
    },
    start() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return;
      return this.company_dict[this.companyID].positions[this.position_id].starting_month;
    },
    end() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return;
      return this.company_dict[this.companyID].positions[this.position_id].ending_month;
    },
  },
  firebase: {
    company_dict: {
      source: db.ref('company'),
      asObject: true,
    },
  },
};
</script>
