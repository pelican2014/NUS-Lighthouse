<template src="./opening-positions.html"></template>
<style src="./opening-positions.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import eachPosition from '@/components/company-position/company-position';

export default {
  name: 'OpeningPositions',
  components: {
    eachPosition,
  },
  props: {
    company_name: {
      type: String,
      required: true,
    },
  },
  // data() {
  //   return {
  //     positions: [
  //       'Data Centre Technician Internship',
  //       'Financial Analyst, Media Incentives',
  //       'Global Marketing Analyst, Media Lab',
  //       'Operations Specialist, Google People Service',
  //       'Software Engineer, Front End Development',
  //     ],
  //   };
  // },
  computed: {
    positions() {
      const results = [];
      for (const item_id in this.company_dict) {
        // if (typeof this.company_dict[item_id] !== 'object') continue;
        if (this.company_dict[item_id].company_name === this.company_name) {
          const openings = this.company_dict[item_id].positions;
          for (const position_id in openings) {
            if (openings[position_id]) {
              results.push(openings[position_id].position_name);
            }
          }
        }
      }
      return results;
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
