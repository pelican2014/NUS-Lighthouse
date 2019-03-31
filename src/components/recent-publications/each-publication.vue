<template>
  <div>
<!--     <img src="@/assets/publication-icon.png" alt="Recent Publication"
    align='left'
    class = 'publication-icon'> -->
    <span class = 'publication-title'>{{description}}</span>
  </div>
</template>

<script>
export default {
  name: 'EachPublication',
  props: {
    description: {
      type: String,
      required: true,
    },
  },
};

</script>

<style>

.publication-title {
  /*margin-bottom:-0.6em;*/
  color:black;
}

</style>
