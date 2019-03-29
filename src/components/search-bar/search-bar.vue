<template src="./search-bar.html"></template>
<style src="./search-bar.scss" lang="scss"></style>

<script>
import db from '@/firebase';

export default {
  name: 'SearchBar',
  props: {
    sub_title: {
      default: 'Search for Company',
    },
    data_dict: {
      type: Object,
      required: true,
    },
    name_field: {
      default: 'company_name',
    },
    secondary_field: {
      default: undefined,
    },
    search_field: {
      default: 'company_name',
    },
    id_field: {
      default: 'id',
    },
    parent_route: {
      default: '',
    },
  },
  data() {
    return {
      input: null,
      colors: [
        'teal',
        'red',
        'brown',
        'blue',
      ],
    };
  },
  computed: {
    data() {
      const results = [];
      for (const item_id in this.data_dict) {
        if (typeof this.data_dict[item_id] !== 'object') continue;
        const results_item = {
          name: this.data_dict[item_id][this.name_field],
          search: this.data_dict[item_id][this.search_field],
          image_url: this.data_dict[item_id].image_url,
          id: this.data_dict[item_id][this.id_field],
          secondary: this.data_dict[item_id][this.secondary_field],
        };
        results.push(results_item);
      }
      return results;
    },
  },
};
</script>
