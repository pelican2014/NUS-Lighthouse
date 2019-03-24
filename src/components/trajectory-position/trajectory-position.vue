<template src="./trajectory-position.html"></template>
<style src="./trajectory-position.scss" lang="scss"></style>

<script>
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';


export default{
  name: 'trajectory-position',
  components: {
    Lines,
    Pie,
    Wordcloud,
    Bar,
  },
  data() {
    return {
      number: 170,
      gender: [{
        name: 'Male',
        y: 60,
      }, {
        name: 'Female',
        y: 40,
      }],
      major: [{
        name: 'CS',
        y: 30,
      }, {
        name: 'BA',
        y: 50,
      }, {
        name: 'IS',
        y: 20,
      }],
      race: [
        ['Chinese', 60],
        ['Malay', 20],
        ['Indian', 30],
        ['Others', 15],
      ],
      salaryX: [2014, 2015, 2016, 2017],
      salary: [{
        name: 'avergae',
        data: [3000, 4000, 4500, 4700],
      }, {
        name: 'median',
        data: [3200, 4200, 4700, 2600],
      }],
      university: [{
        name: 'UCLA',
        weight: 2 },
      {
        name: 'NUS',
        weight: 5,
      },
      {
        name: 'NTU',
        weight: 4,
      },
      {
        name: 'SMU',
        weight: 2,
      },
      {
        name: 'THU',
        weight: 3,
      },
      {
        name: 'PKU',
        weight: 1,
      },
      {
        name: 'MIT',
        weight: 3,
      },
      {
        name: 'CMU',
        weight: 6,
      },
      {
        name: 'NYU',
        weight: 3,
      },
      {
        name: 'Oxford',
        weight: 1,
      }],
      researchArea: [{
        name: 'ML',
        weight: 1,
      }, {
        name: 'AI',
        weight: 2,
      }, {
        name: 'Economics',
        weight: 3,
      }, {
        name: 'Marketing',
        weight: 4,
      }, {
        name: 'Time Series',
        weight: 5,
      }, {
        name: 'NLP',
        weight: 2,
      }],
    };
  },
};
</script>
