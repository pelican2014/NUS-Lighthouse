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
    company_id: {
      type: String,
      required: true,
    },
  },
  computed: {
    positions() {
      const results = [];
      if (this.company_dict[this.company_id]) {
        const position_dict = this.company_dict[this.company_id].positions;
        for (const position_id in position_dict) {
          if (position_dict[position_id]) {
            results.push({ title: position_dict[position_id].position_name, position_id });
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
