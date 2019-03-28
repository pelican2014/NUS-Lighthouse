<template src="./filtered-search.html"></template>
<style src="./filtered-search.scss" lang="scss"></style>

<script>
import db from '@/firebase';

export default {
  name: 'FilteredSearch',
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
      filter_a_value: '(Unrestricted)',
      filter_b_value: '(Unrestricted)',
      colors: [
        'teal',
        'red',
        'brown',
        'blue',
      ],
      // data: [
      //   {
      //     item_id: '1',
      //     name: 'Google',
      //     image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/150px-Google_%22G%22_Logo.svg.png',
      //   },
      //   {
      //     item_id: '2',
      //     name: 'Amazon',
      //   },
      //   {
      //     item_id: '3',
      //     name: 'Facebook',
      //   },
      //   {
      //     item_id: '4',
      //     name: 'DRW',
      //   },
      // ],
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
          secondary: this.data_dict[item_id][this.secondary_field]
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
