<template src="./company.html"></template>
<style src="./company.scss" lang="scss"></style>

<script>
import db from '@/firebase';

export default{
  name: 'company',
  props: {
    company_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  computed: {
    description() {
      let description = null;
      if (this.company_id in this.company_dict) {
        description = this.company_dict[this.company_id].company_description;
      }
      return description;
    },
    name() {
      let name = null;
      if (this.company_id in this.company_dict) {
        name = this.company_dict[this.company_id].company_name;
      }
      return name;
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
