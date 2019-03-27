<template>
  <div>
    <img src="@/components/assets/publication-icon.png" alt="Recent Publication"
    align='left'
    class = 'publication-icon'>
    <i>{{description}}</i><br /><br />
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
