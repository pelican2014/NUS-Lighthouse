<template src = './background-position.html'></template>
<style src = './background-position.scss' lang = 'scss'></style>

<script>
import _ from 'lodash';
import db from '@/firebase';
import Color from 'color';
import Math from 'mathjs';
import Pie from '@/components/charts/pie';
import Histogram from '@/components/charts/histogram';
import Wordcloud from '@/components/charts/word-cloud';
import Bar from '@/components/charts/bar';
import Treemap from '@/components/charts/treemap';
import Pyramid from '@/components/charts/population-pyramid';

export default{
  name: 'background-position',
  components: {
    Histogram,
    Pie,
    Wordcloud,
    Bar,
    Treemap,
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
      const breakpoints = [];
      for (let i = 0; Math.round(i * 10) / 10 <= 5; i += 0.2) {
        breakpoints.push(Math.round(i * 10) / 10);
      }

      const first = breakpoints[0];
      const last = breakpoints.slice(-1)[0];
      const trimmed = _.map(this.CAP, (o) => {
        if (o > last) {
          return 5;
        } else if (o < first) {
          return 0;
        } else {
          return Math.round(Math.floor(o * 5) / 5 * 10) / 10;
        }
      });
      const counts = _.map(_.countBy(trimmed), (count, point) => {
        const current_point = point;
        if (current_point < first) {
          return { name: '<' + first, y: count };
        } else if (current_point >= last) {
          return { name: '>=' + last, y: count };
        } else {
          const next_point = Math.round((Number(current_point) + 0.2) * 5) / 5;
          return {
            name: current_point + ' to ' + next_point,
            y: count,
            start: current_point,
          };
        }
      });
      return _.map(_.sortBy(counts, 'start'), o => ({ name: o.name, y: o.y }));
    },
    modules() {
      for (const c in this.company_dict) {
        if (!(this.position_id in this.company_dict[c]['positions'])) continue;
        const p = this.company_dict[c]['positions'][this.position_id];
        const tfidf = p['tfidf'];
        const module_list = [];
        const tfidf_list = [];
        for (const mod in tfidf) {
          if (tfidf[mod] !== 0) {
            module_list.push(mod);
            tfidf_list.push(tfidf[mod]);
          }
        }
        const max_tfidf = Math.max(tfidf_list);
        const norm_tfidf = _.map(tfidf_list, n => Math.round(n / max_tfidf * 100));
        const result = [];
        for (let i = 0; i < module_list.length; i += 1) {
          result.push({ name: module_list[i].toUpperCase(), weight: norm_tfidf[i] });
        }
        return result;
      }
    },
    // mods() {
    //   let lst = [];
    //   for (const internship_id of this.internships) {
    //     const module_list = this.internship_dict[internship_id].modules_taken;
    //     if (!module_list) {
    //       continue;
    //     } else {
    //     	lst = lst.concat(module_list);
    //     }
    //   }
    //   const result = {};
    //   for (const each_module of lst) {
    //   	if (each_module in result) {
    //   		result[each_module] += 1;
    //   	} else {
    //   		result[each_module] = 1;
    //   	}
    //   }
    //   const output = [];
    //   for (const mod in result) {
    //     if (mod) {
    //       output.push({ name: mod, weight: result[mod] });
    //     }
    //   }
    //   return output;
    // },
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
    major_faculty() {
      const child_list = [];
      const faculty_list = [];
      const major_list = [];
      const id_list = [];
      for (const item_id in this.internship_dict) {
        if (this.internship_dict[item_id].position_id === this.position_id) {
          id_list.push(item_id);
          const internship = this.internship_dict[item_id];
          if (!major_list.includes(internship.major)) {
            major_list.push(internship.major);
          }
          if (!faculty_list.includes(internship.faculty)) {
            faculty_list.push(internship.faculty);
          }
        }
      }

      for (let i = 0; i < faculty_list.length; i += 1) {
        const fac = faculty_list[i];
        for (let j = 0; j < major_list.length; j += 1) {
          const major = major_list[j];
          let freq = 0;
          for (let k = 0; k < id_list.length; k += 1) {
            const id_faculty = this.internship_dict[id_list[k]].faculty;
            const id_major = this.internship_dict[id_list[k]].major;
            if ((id_faculty === fac) && (id_major === major)) {
              freq += 1;
            }
          }
          if (freq !== 0) {
            child_list.push({ name: major, parent: fac, value: freq });
          }
        }
      }

      const color_list = ['#f9ee0e', '#eded10', '#ff9500', '#5c7a1c', '#a1af31', '#1e3c70', '#ff7d00'];
      const result = [];
      for (let i = 0; i < faculty_list.length; i += 1) {
        const fac = faculty_list[i];
        const major = [];
        const values = [];
        const random_color = color_list[Math.floor(Math.random() * color_list.length)];
        result.push({ id: faculty_list[i], name: faculty_list[i] });
        for (let j = 0; j < child_list.length; j += 1) {
          if (child_list[j].parent === fac) {
            major.push(child_list[j].name);
            values.push(child_list[j].value);
          }
        }
        const freq_min = Math.min(values);
        const freq_max = Math.max(values);
        if (freq_max === freq_min) {
          result.push({ name: major[0], parent: fac, value: values[0], color: random_color });
        } else {
          for (let k = 0; k < values.length; k += 1) {
            const normalised_value = (((values[k] - freq_min) * 1) / (freq_max - freq_min)) - 0.5;
            const normalised_color = Color(random_color).blacken(normalised_value).hex();
            result.push({ name: major[k], parent: fac, value: values[k], color: normalised_color });
          }
        }
      }
      return result;
    },
  },
  firebase: {
  	internship_dict: {
  		source: db.ref('internship'),
  		asObject: true,
  	},
    company_dict: {
      source: db.ref('company'),
  		asObject: true,
    },
  },
};
</script>
