<script src="./app.js"></script>
<template src="./app.html"></template>
<script>

import Header from '@/components/top-header/top-header';
import Subheader from '@/components/subheader/subheader';
import Pie from '@/components/charts/pie.vue';
import Bar from '@/components/charts/bar.vue';
import Wordcloud from '@/components/charts/word-cloud.vue';
import Area from '@/components/charts/area.vue'
import Line from '@/components/charts/line';
import Boxplot from '@/components/charts/boxplot.vue';

export default{
	name:'App',
	components:{
		Header,
		Subheader,
		Pie,
		Bar,
		Line,
		Wordcloud,
		Area,
		Boxplot,
	},
};

</script>
