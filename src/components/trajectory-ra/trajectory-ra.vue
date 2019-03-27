<template src="./trajectory-ra.html"></template>
<style src="./trajectory-ra.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Histogram from '@/components/charts/histogram';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';


export default{
  name: 'trajectory-ra',
  components: {
    Histogram,
    Pie,
    Wordcloud,
    Bar,
  },
  props: {
    prof_id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalNum() {
      let counter = 0;
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p1') { // change to prof id
          counter += 1;
        }
      }
      return counter;
    },
    path() {
      const path = [];
      const freq = [];
      let prev;
      const path_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.path !== '') {
            path_list.push(ra.path);
          }
        }
      }

      path_list.sort();
      for (let i = 0; i < path_list.length; i += 1) {
        if (path_list[i] !== prev) {
          path.push(path_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = path_list[i];
      }

      const result = [];
      for (let j = 0; j < path.length; j += 1) {
        const dict = { name: path[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    industry() {
      const industry = [];
      const freq = [];
      let prev;
      const industry_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.industry !== '') {
            industry_list.push(ra.industry);
          }
        }
      }

      industry_list.sort();
      for (let i = 0; i < industry_list.length; i += 1) {
        if (industry_list[i] !== prev) {
          industry.push(industry_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = industry_list[i];
      }

      const result = [];
      for (let j = 0; j < industry.length; j += 1) {
        const dict = { name: industry[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    graduate() {
      const course = [];
      const freq = [];
      let prev;
      const course_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.graduate_course !== '') {
            course_list.push(ra.graduate_course);
          }
        }
      }

      course_list.sort();
      for (let i = 0; i < course_list.length; i += 1) {
        if (course_list[i] !== prev) {
          course.push(course_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = course_list[i];
      }

      const result = [];
      for (let j = 0; j < course.length; j += 1) {
        const dict = { name: course[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    salary_hist() {
      const salary_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.starting_salary) {
            salary_list.push(ra.starting_salary);
          }
        }
      }
      const breakpoints = [1000, 2000, 3000, 4000, 5000, 6000];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(salary_list, (o) => {
        if (o > last) {
          return 6;
        } else if (o < first) {
          return 1;
        } else {
          return Math.floor(o / 1000);
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point * 1000;
        if (current_point < first) {
          return { name: '<' + first, y: count };
        } else if (current_point >= last) {
          return { name: '>=' + last, y: count };
        } else {
          const next_point = Number(current_point) + 1;
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },
    university() {
      const uni = [];
      const freq = [];
      let prev;
      const uni_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.phd_university !== '') {
            uni_list.push(ra.phd_university);
          }
        }
      }

      uni_list.sort();
      for (let i = 0; i < uni_list.length; i += 1) {
        if (uni_list[i] !== prev) {
          uni.push(uni_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = uni_list[i];
      }

      const result = [];
      for (let j = 0; j < uni.length; j += 1) {
        const dict = { name: uni[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
    research() {
      const research = [];
      const freq = [];
      let prev;
      const research_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === 'p2') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.research_area !== '') {
            research_list.push(ra.research_area);
          }
        }
      }

      research_list.sort();
      for (let i = 0; i < research_list.length; i += 1) {
        if (research_list[i] !== prev) {
          research.push(research_list[i]);
          freq.push(1);
        } else {
          freq[freq.length - 1] += 1;
        }
        prev = research_list[i];
      }

      const result = [];
      for (let j = 0; j < research.length; j += 1) {
        const dict = { name: research[j], y: freq[j] };
        result.push(dict);
      }
      return result;
    },
  },

  firebase: {
    ra_dict: {
      source: db.ref('ra'),
      asObject: true,
    },
    prof_dict: {
      source: db.ref('professor'),
    },
  },
};
</script>
