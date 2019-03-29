<template src="./company-position.html"></template>
<style src="./company-position.scss" lang="scss"></style>


<script>
export default {
  name: 'eachPosition',
  props: {
    title: {
      type: String,
      required: true,
    },
    position_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'Discover the art of planning and executing a new level',
    },
  },
};
</script>
