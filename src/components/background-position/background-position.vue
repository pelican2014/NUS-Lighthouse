<template src = './background-position.html'></template>
<style src = './background-position.scss' lang = 'scss'></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Pie from '@/components/charts/pie';
import Histogram from '@/components/charts/histogram';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';
import Pyramid from '@/components/charts/population-pyramid';

export default{
  name: 'background-position',
  components: {
    Histogram,
    Pie,
    Wordcloud,
    Bar,
    Pyramid,
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
    female() {
      const result = [0, 0, 0, 0];
      if (!this.internships) {
        return null;
      } else {
        for (const internship_id of this.internships) {
          if (this.internship_dict[internship_id].gender === 'F') {
            if (this.internship_dict[internship_id].student_year === 1) {
              result[0] += 1;
            } else if (this.internship_dict[internship_id].student_year === 2) {
              result[1] += 1;
            } else if (this.internship_dict[internship_id].student_year === 3) {
              result[2] += 1;
            } else {
              result[3] += 1;
            }
          }
        }
        return result;
      }
    },
    male() {
      const result = [0, 0, 0, 0];
      if (!this.internships) {
        return null;
      } else {
        for (const internship_id of this.internships) {
          if (this.internship_dict[internship_id].gender === 'M') {
            if (this.internship_dict[internship_id].student_year === 1) {
              result[0] -= 1;
            } else if (this.internship_dict[internship_id].student_year === 2) {
              result[1] -= 1;
            } else if (this.internship_dict[internship_id].student_year === 3) {
              result[2] -= 1;
            } else {
              result[3] -= 1;
            }
          }
        }
        return result;
      }
    },
    number() {
      if (!this.internships) {
        return null;
      } else {
        return this.internships.length;
      }
    },
    // gender() {
    //   let male = 0;
    //   let female = 0;
    //   if (!this.internships) {
    //     return null;
    //   } else {
    //     for (const internship_id of this.internships) {
    //       if (this.internship_dict[internship_id].gender === 'F') {
    //         female += 1;
    //       } else {
    //         male += 1;
    //       }
    //     }
    //   }
    //   return [{ name: 'male', y: male }, { name: 'female', y: female }];
    // },
    faculty() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_faculty = this.internship_dict[internship_id].faculty;
        if (!each_faculty) {
          continue;
        } else if (each_faculty in result) {
          result[each_faculty] += 1;
        } else {
          result[each_faculty] = 1;
        }
      }
      const output = [];
      for (const faculty in result) {
        if (faculty) {
          output.push({ name: faculty, y: result[faculty] });
        }
      }
      return _.sortBy(output, 'y').slice(-10);
    },
    year() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_year = this.internship_dict[internship_id].student_year;
        if (!each_year) {
          continue;
        } else if (each_year in result) {
          result[each_year] += 1;
        } else {
          result[each_year] = 1;
        }
      }
      const output = [];
      for (const year in result) {
        if (year) {
          const string = 'Year ' + year;
          output.push({ name: string, y: result[year] });
        }
      }
      return output;
    },
    major() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_major = this.internship_dict[internship_id].major;
        if (!each_major) {
          continue;
        } else if (each_major in result) {
          result[each_major] += 1;
        } else {
          result[each_major] = 1;
        }
      }
      const output = [];
      for (const major in result) {
        if (major) {
          output.push({ name: major, y: result[major] });
        }
      }
      return _.sortBy(output, 'y').slice(-10);
    },
    CAP() {
      const result = [];
      for (const internship_id of this.internships) {
      	result.push(this.internship_dict[internship_id].cap);
      }
      return result;
    },
    CAP_hist() {
      const breakpoints = [0, 1, 2, 3, 4, 5];
      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.CAP, (o) => {
        if (o > last) {
          return 5;
        } else if (o < first) {
          return 0;
        } else {
          return Math.floor(o);
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point;
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
    modules() {
      let lst = [];
      for (const internship_id of this.internships) {
        const module_list = this.internship_dict[internship_id].modules_taken;
        if (!module_list) {
          continue;
        } else {
        	lst = lst.concat(module_list);
        }
      }
      const result = {};
      for (const each_module of lst) {
      	if (each_module in result) {
      		result[each_module] += 1;
      	} else {
      		result[each_module] = 1;
      	}
      }
      const output = [];
      for (const mod in result) {
        if (mod) {
          output.push({ name: mod, weight: result[mod] });
        }
      }
      return output;
    },
    race() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_race = this.internship_dict[internship_id].race;
        if (!each_race) {
          continue;
        } else if (each_race in result) {
          result[each_race] += 1;
        } else {
          result[each_race] = 1;
        }
      }
      const output = [];
      for (const race in result) {
        if (race) {
          output.push([race, result[race]]);
        }
      }
      return output;
    },
    nationality() {
      const result = {};
      for (const internship_id of this.internships) {
        const each_nation = this.internship_dict[internship_id].nationality;
        if (!each_nation) {
          continue;
        } else if (each_nation in result) {
          result[each_nation] += 1;
        } else {
          result[each_nation] = 1;
        }
      }
      const output = [];
      for (const nation in result) {
        if (nation) {
          output.push([nation, result[nation]]);
        }
      }
      return _.sortBy(output, 1).slice(-3);
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
