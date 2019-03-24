<template src='./basic-information.html'></template>
<style src='./basic-information.scss' lang='scss'></style>
<script>
export default {
  name: 'BasicInformation',
  props: {
    section: {
      required: true,
    },
  },
  data() {
    return {
      internship_position: {
        position_title: 'Software Engineer',
        position_start: 'May 2019',
        position_end: 'Aug 2019',
        position_description: 'In this project, you will be working with other engineers to facilitate the development of Google Drive. Detailed job description can be found here: https://www.google.com',
        position_company: 'Google',
        position_icon_link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
      },
      research_prof: {
        prof_photo_link: 'https://www.comp.nus.edu.sg/images/resources/content/about/HAHN-Jungpil-2-IMG.png',
        prof_name: 'HAHN Jungpil',
        prof_title: 'Associate Professor',
        prof_department: 'Head, Department of Information Systems and Analytics',
        prof_office: 'COM2-0224',
        prof_tel: '85246738',
        prof_research_focus: 'Professor Hahn\'s research focuses on open innovation, organizational learning and knowledge management, software development processes, software project management and human-computer interaction. ',
      },
      module: {
        module_code: 'CS1010S',
        module_name: 'Programming Methodology',
        module_course: 'Computer Science',
        module_MC: '4MC',
        module_sem: 'AY1819 Sem2',
        module_description: 'This module introduces the fundamental concepts of problem solving by computing and programming using an imperative programming language. It is the first and foremost introductory course to computing and is equivalent to CS1010 and CS1010E Programming Methodology. Topics covered include problem solving by computing, writing pseudo-codes, basic problem formulation and problem solving, program development, coding, testing and debugging, fundamental programming constructs (variables, types, expressions, assignments, functions, control structures, etc.), fundamental data structures: arrays, strings and structures, simple file processing, and basic recursion. This module is appropriate for FoS students.',
      },
    };
  },
};

</script>
