<template>
  <highcharts :options="options" ref="histogram-chart" class="histogram"></highcharts>
</template>

<script>
import HighchartsVue from 'highcharts-vue';
import loadTreemap from 'highcharts/modules/treemap';
import Highcharts from 'highcharts';

loadTreemap(Highcharts);

const data = {
  series: [{
    type: 'treemap',
    layoutAlgorithm: 'stripes',
    alternateStartingDirection: true,
    levels: [{
      level: 1,
      layoutAlgorithm: 'sliceAndDice',
      dataLabels: {
        enabled: true,
        align: 'left',
        verticalAlign: 'top',
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
        },
      },
    }],
    data: [{
      id: 'A',
      name: 'Apples',
      color: '#EC2500',
    }, {
      id: 'B',
      name: 'Bananas',
      color: '#ECE100',
    }, {
      id: 'O',
      name: 'Oranges',
      color: '#EC9800',
    }, {
      name: 'Anne',
      parent: 'A',
      value: 5,
    }, {
      name: 'Rick',
      parent: 'A',
      value: 3,
    }, {
      name: 'Peter',
      parent: 'A',
      value: 4,
    }, {
      name: 'Anne',
      parent: 'B',
      value: 4,
    }, {
      name: 'Rick',
      parent: 'B',
      value: 10,
    }, {
      name: 'Peter',
      parent: 'B',
      value: 1,
    }, {
      name: 'Anne',
      parent: 'O',
      value: 1,
    }, {
      name: 'Rick',
      parent: 'O',
      value: 3,
    }, {
      name: 'Peter',
      parent: 'O',
      value: 3,
    }, {
      name: 'Susanne',
      parent: 'Kiwi',
      value: 2,
      color: '#9EDE00',
    }],
  }],
  title: {
    text: 'Fruit consumption',
  },
};

export default {
  components: {
    HighchartsVue,
  },
  data() {
    return {
      options: data,
    };
  },
};
</script>

<style scoped>
.line{
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
</style>
