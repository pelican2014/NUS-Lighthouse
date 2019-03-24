<template src="./position-stats.html"></template>
<style src="./position-stats.scss" lang="scss"></style>

<script>
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Bar from '@/components/charts/bar';


export default{
  name: 'position-stats',
  components: {
    Lines,
    Pie,
    Bar,
  },
  data() {
    return {
      number: 170,
      gender: [
        {
          name: 'Male',
          y: 60,
          sliced: true,
          selected: true,
        },
        {
          name: 'Female',
          y: 40,
        },
      ],
      major: [
        {
          name: 'CS',
          y: 30,
          sliced: true,
          selected: true,
        },
        {
          name: 'BZA',
          y: 40,
          sliced: true,
        },
        {
          name: 'IS',
          y: 30,
        },
        {
          name: 'DSC',
          y: 20,
        },
        {
          name: 'ISE',
          y: 10,
        },
        {
          name: 'Stats',
          y: 5,
        },
      ],
      race: [
        ['Chinese', 75],
        ['Malay', 30],
        ['Indian', 40],
        ['Others', 20],
      ],
      nationality: [
        ['Singapore', 120],
        ['China', 80],
        ['India', 60],
        ['Malaysia', 40],
        ['Indonesia', 30],
      ],
      CAP: [
        ['[4,4.1]', 6],
        ['[4.1,4.2]', 5],
        ['[4.2,4.3]', 5],
        ['[4.3,4.4]', 6],
        ['[4.4,4.5]', 10],
        ['[4.5,4.6]', 15],
        ['[4.6,4.7]', 10],
        ['[4.7,4.8]', 12],
        ['[4.8,4.9]', 10],
        ['[4.9,5.0]', 3],
      ],
      xlabel: [2015, 2016, 2017, 2018],
      interns: [
        {
          name: 'Interns',
          data: [5, 12, 8, 10],
        },
      ],
    };
  },
};
</script>
