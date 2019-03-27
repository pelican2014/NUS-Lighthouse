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
  methods: {
    map(number) {
      if (number === 1) {
        return 'Januaray';
      } else if (number === 2) {
        return 'February';
      } else if (number === 3) {
        return 'March';
      } else if (number === 4) {
        return 'April';
      } else if (number === 5) {
        return 'May';
      } else if (number === 6) {
        return 'June';
      } else if (number === 7) {
        return 'July';
      } else if (number === 8) {
        return 'August';
      } else if (number === 9) {
        return 'September';
      } else if (number === 10) {
        return 'October';
      } else if (number === 11) {
        return 'November';
      } else {
        return 'December';
      }
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
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.company_dict[this.companyID].company_name;
    },
    position_description() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.company_dict[this.companyID].positions[this.position_id].position_description;
    },
    position_title() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.company_dict[this.companyID].positions[this.position_id].position_name;
    },
    start() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.map(this.company_dict[this.companyID].positions[this.position_id].starting_month);
    },
    end() {
      if (!this.companyID || !(this.companyID in this.company_dict)) return null;
      return this.map(this.company_dict[this.companyID].positions[this.position_id].ending_month);
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
