<template src="./top-header.html"></template>
<style src='./top-header.scss' lang='scss'></style>

<script>
export default{
  name: 'header',
  props: {
    username: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      icon_url: 'https://img.icons8.com/metro/26/000000/administrator-male.png',
    };
  },
};
</script>
