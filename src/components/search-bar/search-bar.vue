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
    multiple: {
      default: false,
    },
    value: {
      default: null,
    },
    show_sec: {
      default: false,
    },
    query_name: {
      default: undefined,
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
  watch: {
    value() {
      if (this.value !== null) this.input = this.value;
    },
  },
  methods: {
    get_route() {
      if (typeof this.query_name !== 'undefined') {
        return this.input
          ? {path: parent_route + '?' + this.query_name + '=' + this.input}
          : undefined;
      }
      return this.input ? {path: parent_route + '/' + this.input} : undefined;
    },
    remove(id) {
      if (this.multiple && this.input) {
        const index = this.input.indexOf(id);
        if (index !== -1) this.input.splice(index, 1);
      }
    },
    updateValue() {
      if (this.value !== null) this.$emit('input', this.input);
    },
  },
  computed: {
    data() {
      const results = [];
      let count = 0;
      for (const item_id in this.data_dict) {
        if (typeof this.data_dict[item_id] !== 'object') continue;
        const results_item = {
          name: this.data_dict[item_id][this.name_field],
          search: this.data_dict[item_id][this.search_field],
          image_url: this.data_dict[item_id].image_url,
          id: this.data_dict[item_id][this.id_field],
          secondary: this.data_dict[item_id][this.secondary_field],
        };
        count += 1;
        results.push(results_item);
      }
      return results;
    },
  },
};
</script>
