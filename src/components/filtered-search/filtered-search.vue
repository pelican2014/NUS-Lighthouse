<template src="./filtered-search.html"></template>
<style src="./filtered-search.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import SearchBar from '@/components/search-bar/search-bar';

export default {
  name: 'FilteredSearch',
  components: {
    SearchBar,
  },
  props: {
    table_name: {
      default: 'company',
    },
    name_field: {
      default: 'company_name',
    },
    filter_a_key: {
      default: 'industry',
    },
    filter_b_key: {
      default: 'major',
    },
    filter_a_value: {
      default: '(Unrestricted)',
    },
    filter_b_value: {
      default: '(Unrestricted)',
    },
    parent_route: {
      default: 'company-page',
    },
  },
  watch: {
    filter_a_value(val) {
      this.$emit('update-filter-a', val);
    },
    filter_b_value(val) {
      this.$emit('update-filter-b', val);
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
        // filtering results
        if (this.filter_a_value !== '(Unrestricted)'
          && this.data_dict[item_id][this.filter_a_key]
          !== this.filter_a_value) continue;

        if (this.filter_b_value !== '(Unrestricted)'
          && this.data_dict[item_id][this.filter_b_key]
          !== this.filter_b_value) continue;

        const results_item = {
          item_id,
          name: this.data_dict[item_id][this.name_field],
          secondary: this.data_dict[item_id][this.secondary_field],
        };

        if ('image_url' in this.data_dict[item_id]) {
          results_item.image_url = this.data_dict[item_id].image_url;
        }
        results.push(results_item);
      }
      return results;
    },
    filter_a_values() {
      const results = new Set();
      results.add('(Unrestricted)');
      for (const item_id in this.data_dict) {
        if (typeof this.data_dict[item_id] !== 'object') continue;
        results.add(this.data_dict[item_id][this.filter_a_key]);
      }
      return Array.from(results);
    },
    filter_b_values() {
      const results = new Set();
      results.add('(Unrestricted)');
      for (const item_id in this.data_dict) {
        if (typeof this.data_dict[item_id] !== 'object') continue;
        results.add(this.data_dict[item_id][this.filter_b_key]);
      }
      return Array.from(results);
    },
  },
  firebase: {
    data_dict: {
      source: db.ref('company'),
      asObject: true,
    },
  },
};
</script>
