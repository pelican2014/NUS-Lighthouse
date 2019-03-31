<template src="./nav-bar.html"></template>
<style src="./nav-bar.scss" lang="scss"></style>
<script>
export default {
  name: 'nav-bar',
  methods: {


    update_recommended() {
      const xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'https://n8cdcjqay1.execute-api.us-east-1.amazonaws.com/default/SOMEfunciton', true);
      xhttp.send();
      this.alert('Updated Recommendation!');
    },

    // var request = new XMLHttpRequest()
    // request.open('POST', 'https://n8cdcjqay1.execute-api.us-east-1.amazonaws.com/default/SOMEfunciton', true)
    // request.onload = function() {
    //   // Begin accessing JSON data here
    //   var data = JSON.parse(this.response)

    //   if (request.status >= 200 && request.status < 400) {
    //     data.forEach(movie => {
    //       console.log(movie.title)
    //     })
    //   } else {
    //     console.log('error')
    //   }
    // }

    // request.send()


  },
};

</script>
