<template src="./search-bar.html"></template>
<style src="./search-bar.scss" lang="scss"></style>

<script>
import db from '../../firebase/firebase';

export default {
  name: 'SearchBar',
  props: {
    sub_title: {
      default: 'Search for Company',
    },
    table_name: {
      default: 'company',
    },
    name_field: {
      default: 'company_name',
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
        const results_item = {
          item_id,
          name: this.data_dict[item_id][this.name_field],
        };
        if ('image_url' in this.data_dict[item_id]) {
          results_item.image_url = this.data_dict[item_id].image_url;
        }
        results.push(results_item);
      }
      return results;
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
