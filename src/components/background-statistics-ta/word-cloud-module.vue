<template>
  <highcharts :options="options" ref="word-cloud-chart" class="word-cloud"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import loadWordcloud from 'highcharts/modules/wordcloud';

loadWordcloud(Highcharts);


const cloud = {
  series: [{
    type: 'wordcloud',
    data: [{
      name: 'CS2040',
      weight: 2 },
    {
      name: 'CS2103',
      weight: 5,
    },
    {
      name: 'CS2010',
      weight: 4,
    },
    {
      name: 'CS3244',
      weight: 2,
    },
    {
      name: 'BT3103',
      weight: 3,
    },
    {
      name: 'CS2030',
      weight: 1,
    },
    {
      name: 'MA1521',
      weight: 3,
    },
    {
      name: 'CS2105',
      weight: 6,
    }],
    name: 'Occurrences',
  }],
  title: {
    text: 'Modules they have taken',
  },
  subtitle: {
    text: 'Source: NUS Data Lake',
  },
};

export default {
  components: {
    HighchartsVue,
  },
  data() {
    return {
      options: cloud,
    };
  },
};
</script>

<style scoped>
.word-cloud{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
