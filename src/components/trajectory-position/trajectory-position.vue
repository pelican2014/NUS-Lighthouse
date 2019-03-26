<template src="./trajectory-position.html"></template>
<style src="./trajectory-position.scss" lang="scss"></style>

<script>
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
    prof_id: {
      type: Number,
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
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '2') { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
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
    salary() {
      const salary_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
          const ra = this.ra_dict[item_id];
          if (ra.starting_salary) {
            salary_list.push(ra.starting_salary);
          }
        }
      }
      return salary_list;
    },
    university() {
      const uni = [];
      const freq = [];
      let prev;
      const uni_list = [];
      for (const item_id in this.ra_dict) {
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
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
        if (this.ra_dict[item_id].prof_id === '1') { // change to prof id
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
      asObject: true,
    },
  },
};
</script>
