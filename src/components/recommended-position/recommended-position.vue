<template src="./recommended-position.html"></template>
<style src="./recommended-position.scss" lang="scss"></style>
<script>
export default {
  name: 'Home',
  data() {
    return {
      items: [
        {
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
          name: 'Google Singapore Software Engineer',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEU6VZ////82Up4zUJ1UbKx4ibswTpyMmsQ5V6EtTJupss8nSJnN0+WVosgqSpo3U56eqcz3+PxwgbaDksDj5vAeQ5eJmMPX3OvByN5hdrFFXaNQaKpJYqfr7va7wtp1hbekrs3FzODb3+sCPONHAAADD0lEQVR4nO3c23KbMBCAYVfgAxZBxocmOD7Eef+HbJ3pZUsEqthd5v9vM+PhGxsE1jqLBRERERERERERERERERGR8kJwrihWVW+F9FGOzlV+dS73y8P6pbelSWIovNvv6mP74/tevfTRDs/55lDH4L6qzQmLprvF6iwKXbN/HeIzJ/TdQJ8xYeEHfT7tCf09+vJiUhia7QifIaELg89AW8Lich0HtCJcdWNOQUPCohwNtCF05/FAE8KwGXsOGhGGpk4AWhD6XQrQgLDokoAGhFXKSWhB2HykAdUL3XvCQmFC6N8SgdqF7j0VqF045pHXlDBskoHKhVXaYm9A6I8zF7rE2xn9wuTVXr/wc+bCkPLga0JY7P8DULWwGnIatvVt+9fWivcP/SP+jVpWJ9+Y2wP2sd8BH/e+CNJHO6Ym8kJTrzS/Tz2FJg74OJl8/xbPzfoo4KfND+izcI4SlkY/oovYp9+b4uXuu1wZI7w46eMcX5TwepI+zISihLdG+jATihLuVtKHmVCU8GD3ShoptDmX9yeECPWHEKH+ECLUH0KE+kOIUH8IEeoPIUL9zUPoVv+uitmZufueV/hKdu/NdeueYobatj/7XuHZRpRYjfs52qCquQtb2c2pCYTCP1afQPg2e+G2mrtQePttAmEnu88/gfAsu+LnF7aivimER+G7tvzCWnhWI79Qeholv/BFeBolv1D6+TG/UHg5zC9sL8LDp9mFV+np2uzCo/T0aXbhY/bCrfRwZnbhWno4M7vwLv11anZhKT0FnlvYSgOzC+Xn3HML5f/vZW6h9LNTfuGH7FeJEwjlJ/lzC0vpG+/sQuk7muxC4X2nCYTiz07ZhQp+ip9ZeBNfLBZh01OImsVwfa8gfin9Tez5W9y0Sd/lUgGwt3nM0/SFEKH+ECLUH0KE+kOIUH8IEeoPIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQfwgR6g8hQv0hRKg/hAj1hxCh/hAi1B9ChPpDiFB/CBHqDyFC/SFEqD+ECPWHEKH+ECLUH0KE+kOIcEC/AMZ0SE9medLTAAAAAElFTkSuQmCC',
          name: 'Facebook Software Engineer',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/062015/jpmorgan-vector-logo_0.png?itok=aviS6FnY',
          name: 'JP Morgan Data Analyst',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'data:image/png;base64,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',
          name: 'OCBC Data Analyst',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'https://cdn.worldvectorlogo.com/logos/gic.svg',
          name: 'GIC Data Science Intern',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Shopee-logo.jpg',
          name: 'Shopee Software Engineer',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        {
          image_url: 'data:image/png;base64,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',
          name: 'Goldman Sachs Software Engineer',
          position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        },
        // {
        //   image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
        //   name: 'Google Singapore Software Engineer',
        //   position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        // },
        // {
        //   image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
        //   name: 'Google Singapore Software Engineer',
        //   position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        // },
        // {
        //   image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
        //   name: 'Google Singapore Software Engineer',
        //   position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        // },
        // {
        //   image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
        //   name: 'Google Singapore Software Engineer',
        //   position_id: '06da1f29cfde34b3bfd6d213c595b5094a134adfafe0af80d552abc0a433f9f2',
        // },
      ],
    };
  },
};
</script>
