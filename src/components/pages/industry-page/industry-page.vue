<template src="./industry-page.html"></template>
<style src="./industry-page.scss" lang="scss"></style>

<script>
import Recommended from '@/components/recommended/recommended';
import SearchBar from '@/components/search-bar/search-bar';
import IndustryExplorer from '@/components/industry-explorer/industry-explorer';
import ExplorerSearch from '@/components/explorer-search/explorer-search';

export default {
  name: 'PositionDetails',
  components: {
    Recommended,
    SearchBar,
    IndustryExplorer,
    ExplorerSearch,
  },
  data() {
  	return {
  		data: [
  	 	[760, 801, 848, 895, 965],
        [733, 853, 939, 980, 1080],
        [714, 762, 817, 870, 918],
        [724, 802, 806, 871, 950],
        [834, 836, 864, 882, 910],
      ],
      outliers: [ // x, y positions where 0 is the first category
        [0, 644],
        [4, 718],
        [4, 951],
        [4, 969],
      ],
      category: ['CS', 'BA', 'IS', 'ISC', 'DSC'],
  	};
  },
};


</script>
