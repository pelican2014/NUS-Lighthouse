<template src='./internship-homepage.html'></template>
<style src='./internship-homepage.scss' lang='scss'></style>
<script>

import NavBar from '@/components/nav-bar/nav-bar';
import subheader from '@/components/subheader/subheader';
import searchBar from '@/components/search-bar/search-bar';
import industryExplorer from '@/components/industry-explorer/industry-explorer';
import recommended from '@/components/recommended-position/recommended-position';
import majorExplorer from '@/components/major-explorer/major-explorer';
import db from '@/firebase';


export default {
  name: 'InternshipHomepage',
  components: {
    NavBar,
    subheader,
    searchBar,
    industryExplorer,
    majorExplorer,
    recommended,
  },
  computed: {
    professor_search() {
      const results = [];
      for (const prof_id in this.professor) {
        if (typeof this.professor[prof_id] !== 'object') continue;
        const search_string = this.professor[prof_id]['Prof Name'] + ' '
          + this.professor[prof_id]['Focus'];
        for (const project of this.professor[prof_id]['Projects']) {
          results.push({
            title: project['title'],
            id: prof_id,
            search: search_string + ' ' + project['title'],
            // image_url: "https://www.comp.nus.edu.sg/images/resources/content/about/HAHN-Jungpil-2-IMG.png",
            'Prof Name': this.professor[prof_id]['Prof Name'],
          });
        }
      }
      return results;
    },
    position_search() {
      const results = [];
      for (const company_id in this.company) {
        if (typeof this.company[company_id] !== 'object') continue;
        const search_string = this.company[company_id]['company_name'] + ' '
          + this.company[company_id]['company_description'];
        for (const position_id in this.company[company_id]['positions']) {
          if (typeof this.company[company_id]['positions'][position_id]
            !== 'object'
          ) {
            continue;
          }
          const position = this.company[company_id]['positions'][position_id];
          results.push({
            id: position_id,
            search: search_string + ' '
              + position['position_name']
              + position['position_description'],
            company_name: this.company[company_id]['company_name'],
            position_name: position['position_name'],
          });
        }
      }
      return results;
    },
  },
  firebase: {
    internship: {
      source: db.ref('internship'),
      asArray: true,
    },
    company: {
      source: db.ref('company'),
      asObject: true,
    },
  },

  methods: {
  },
};
</script>
