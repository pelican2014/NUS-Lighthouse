<template src="./company.html"></template>
<style src="./company.scss" lang="scss"></style>

<script>
import db from '@/firebase';

export default{
  name: 'company',
  props: {
    company_name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      company: {
        name: 'Google',
        description: 'Google is an American multinational technology company hat specializes in Internet-related services and product, which nclude online advertising technologies, search engine, cloud omputing, software and hardware.',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
      },
    };
  },
  computed: {
    description() {
      for (const item_id in this.company_dict) {
        if (typeof this.company_dict[item_id] !== 'object') continue;
        if (this.company_dict[item_id].company_name === this.company_name) {
          return this.company_dict[item_id].company_description;
        }
      }
      return null;
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
