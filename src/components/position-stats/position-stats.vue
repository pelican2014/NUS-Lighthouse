<template src="./position-stats.html"></template>
<style src="./position-stats.scss" lang="scss"></style>

<script>
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Bar from '@/components/charts/bar';
import Histogram from '@/components/charts/histogram';

export default{
  name: 'position-stats',
  components: {
    Lines,
    Pie,
    Bar,
    Histogram,
  },
  props: {
    company_id: {
      type: String,
      required: true,
    },
  },
  // methods: {
  //   get_gender(internship_dict) {
  //     let male = 0;
  //     let female = 0;
  //     for (const internship_id in this.internship_dict) {
  //       if (this.internship_dict[internship_id]) {
  //         const internship = this.internship_dict[internship_id];
  //         if (internship.company_id === this.company_id) {
  //           if (internship.gender === 'F') {
  //             female += 1;
  //           } else {
  //             male += 1;
  //           }
  //         }
  //       }
  //     }
  //     return [{ name: 'male', y: male }, { name: 'female', y: female }];
  //   },
  // },
  data() {
    return {
      number: 170,
      // gender: [
      //   {
      //     name: 'Male',
      //     y: 1,
      //     sliced: true,
      //     selected: true,
      //   },
      //   {
      //     name: 'Female',
      //     y: 1,
      //   },
      // ],
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
      CAP: [4.1, 4.1, 4.2, 4.2, 4.2, 4.33, 4.3, 4.7, 4.7, 4.7,
        4.5, 4.7, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.9, 4.6, 4.6, 4.6, 4.6, 4.6, 4.6],
      xlabel: [2015, 2016, 2017, 2018],
      interns: [
        {
          name: 'Interns',
          data: [5, 12, 8, 10],
        },
      ],
    };
  },
  computed: {
    // id() {
    //   for (const item_id in this.company_dict) {
    //     if (this.company_dict[item_id].company_name === this.company_name) {
    //       return this.company_dict[item_id].company_id;
    //     }
    //   }
    //   return null;
    // },
    gender() {
      let male = 0;
      let female = 0;
      for (const internship_id in this.internship_dict) {
        if (this.internship_dict[internship_id]) {
          const internship = this.internship_dict[internship_id];
          if (internship.company_id === this.company_id) {
            if (internship.gender === 'F') {
              female += 1;
            } else {
              male += 1;
            }
          }
        }
      }
      return [{ name: 'male', y: male }, { name: 'female', y: female }];
    },
    // major() {
    //   const results = {};
    //   for(const internship_id in this.internship_dict) {
    //     if (this.internship_dict[internship_id]) {
    //       const internship = this.internship_dict[internship_id];
    //       if (internship.company_id === this.id) {
    //         if (internship.major in results){
    //           results[internship.major] += 1;
    //         }
    //         else {
    //           results[internship.major] = 1;
    //         }
    //       }
    //     }
    //   }
    //   const output = [];
    //   for(major in results){
    //     output.push()
    //   }

    // },
  },
  firebase: {
    internship_dict: {
      source: db.ref('internship'),
      asObject: true,
    },
    // company_dict: {
    //   source: db.ref('company'),
    //   asObject: true,
    // },
  },
};
</script>
