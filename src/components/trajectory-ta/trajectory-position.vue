<template src="./trajectory-position.html"></template>
<style src="./trajectory-position.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';
import Histogram from '@/components/charts/histogram';

export default{
  name: 'trajectory-position',
  components: {
    Lines,
    Pie,
    Wordcloud,
    Bar,
    Histogram,
  },
  props: {
    module: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },
  computed: {
    path() {
      const path = [];
      const freq = [];
      let prev;
      const path_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to module
          const ta = ta_list[item_id];
          if (ta.path !== '') {
            path_list.push(ta.path);
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
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.industry !== '') {
            industry_list.push(ta.industry);
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
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.graduate_course !== '1') {
            course_list.push(ta.graduate_course);
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
    university() {
      const uni = [];
      const freq = [];
      let prev;
      const uni_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to module
          const ta = ta_list[item_id];
          if (ta.phd_university !== '') {
            uni_list.push(ta.phd_university);
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
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.research_area !== '') {
            research_list.push(ta.research_area);
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
    count() {
      let counter = 0;
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          counter += 1;
        }
      }
      return counter;
    },
    salary_hist() {
      const salary_list = [];
      const ta_list = this.ta_dict;
      for (const item_id in ta_list) {
        if (ta_list[item_id].module_code === this.module) { // change to prof id
          const ta = ta_list[item_id];
          if (ta.starting_salary) {
            salary_list.push(ta.starting_salary);
          }
        }
      }
      // console.log(salary_list);
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
          const next_point = Number(current_point) + 1000;
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },
  },
  firebase: {
    ta_dict: {
      source: db.ref('ta'),
      asObject: true,
    },
    module_dict: {
      source: db.ref('module'),
      asObject: true,
    },
  },
};
</script>
