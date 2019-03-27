<template src="./trajectory-position.html"></template>
<style src="./trajectory-position.scss" lang="scss"></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Histogram from '@/components/charts/histogram';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';


export default{
  name: 'trajectory-position',
  components: {
    Histogram,
    Pie,
    Wordcloud,
    Bar,
  },
  props: {
    position_id: {
      type: String,
      required: true,
    },
  },
  computed: {
    internships() {
      const results = [];
      for (const internship_id in this.internship_dict) {
        if (internship_id && this.internship_dict[internship_id].position_id === this.position_id) {
          results.push(internship_id);
        }
      }
      return results;
    },
    number() {
      if (!this.internships) {
        return null;
      } else {
        return this.internships.length;
      }
    },
    path() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_path = this.internship_dict[internship_id].path;
        if (!each_path) {
          continue;
        } else if (each_path in result) {
          result[each_path] += 1;
        } else {
          result[each_path] = 1;
        }
      }
      const output = [];
      for (const path in result) {
        if (path) {
          output.push({ name: path, y: result[path] });
        }
      }
      return output;
    },
    industry() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_industry = this.internship_dict[internship_id].graduate_industry;
        if (!each_industry) {
          continue;
        } else if (each_industry in result) {
          result[each_industry] += 1;
        } else {
          result[each_industry] = 1;
        }
      }
      const output = [];
      for (const industry in result) {
        if (industry) {
          output.push({ name: industry, y: result[industry] });
        }
      }
      return output;
    },
    course() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_course = this.internship_dict[internship_id].graduate_course;
        if (!each_course) {
          continue;
        } else if (each_course in result) {
          result[each_course] += 1;
        } else {
          result[each_course] = 1;
        }
      }
      const output = [];
      for (const course in result) {
        if (course) {
          output.push({ name: course, y: result[course] });
        }
      }
      return output;
    },
    university() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_university = this.internship_dict[internship_id].phd_university;
        if (!each_university) {
          continue;
        } else if (each_university in result) {
          result[each_university] += 1;
        } else {
          result[each_university] = 1;
        }
      }
      const output = [];
      for (const uni in result) {
        if (uni) {
          output.push({ name: uni, weight: result[uni] });
        }
      }
      return output;
    },
    research_area() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_area = this.internship_dict[internship_id].research_area;
        if (!each_area) {
          continue;
        } else if (each_area in result) {
          result[each_area] += 1;
        } else {
          result[each_area] = 1;
        }
      }
      const output = [];
      for (const area in result) {
        if (area) {
          output.push({ name: area, weight: result[area] });
        }
      }
      return output;
    },
    salary() {
      const results = [];
      for (const internship_id of this.internships) {
        if (this.internship_dict[internship_id].starting_salary) {
          results.push(this.internship_dict[internship_id].starting_salary);
        }
      }
      return results;
    },
    salary_hist() {
      const breakpoints = [1000, 2000, 3000, 4000, 5000, 6000];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.salary, (o) => {
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
          const next_point = breakpoints[breakpoints.indexOf(current_point) + 1];
          return { name: current_point + ' to ' + next_point, y: count };
        }
      });
      return counts;
    },
  },
  firebase: {
    internship_dict: {
      source: db.ref('internship'),
      asObject: true,
    },
  },
};
</script>
