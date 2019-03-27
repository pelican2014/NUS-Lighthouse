import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
// import Donut from '@/components/charts/donut';
// import RAChart from '@/components/ra-main-charts/ra-main-charts';
// import Histogram from '@/components/charts/histogram';
import Home from '@/components/home/home';
// import Company from '@/components/company/company';
// import TopHeader from '@/components/top-header/top-header';
// import Subheader from '@/components/subheader/subheader';
// import Pie from '@/components/charts/pie';
// import Lines from '@/components/charts/line';
// import Bar from '@/components/charts/bar';
// import HBar from '@/components/charts/horizontal-bar';
// import Wordcloud from '@/components/charts/word-cloud';
// import Area from '@/components/charts/area';
// import SearchBar from '@/components/search-bar/search-bar';
// import IndustryExplorer from '@/components/industry-explorer/industry-explorer';
import Vue from 'vue';
import Router from 'vue-router';
// import RecentPublications from '@/components/recent-publications/recent-publications';
// import JobPostSearch from '@/components/job-post-search/job-post-search';
// import Modal from '@/components/modal/modal';
// import CurrentProjects from '@/components/current-projects/current-projects';
// import FilteredSearch from '@/components/filtered-search/filtered-search';
// import PositionDetails from '@/components/position-details/position-details';
// import BasicInformation from '@/components/basic-information/basic-information';
// import TrajectoryPosition from '@/components/trajectory-position/trajectory-position';
// import PositionStats from '@/components/position-stats/position-stats';
// import Insights from '@/components/industry-insight/industry-insight';
// import InternshipHomePage from '@/components/internship-homepage/internship-homepage';
// import OpeningPositions from '@/components/opening-positions/opening-positions';
// import CompanyHome from '@/components/company-home/company-home';
// import Recommended from '@/components/recommended/recommended';
// import Background from '@/components/background-statistics/background-statistics';
import ProfPage from '@/components/prof-project-page/prof-project-page';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProfPage,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    // {
    //   path: '/industryPage',
    //   name: 'industryPage',
    //   component: IndustryPage,
    // },
    // {
    //   path: '/internship-homepage',
    //   name: 'internship-homepage',
    //   component: InternshipHomePage,
    // },
    // {
    //   path: '/raPage',
    //   name: 'raPage',
    //   component: RAPage,
    // },
    // {
    //   path: '/company-page',
    //   name: 'company-page',
    //   component: CompanyHome,
    //   props: {
    //     company_id: 'd2cdfd11ed2669239a7dc3d70e7a0d277f1531b1bc99650b005f5a944e2e5351',
    //   },
    // },
    // {
    //   path: '/position-page',
    //   name: 'position-page',
    //   component: PositionPage,
    //   props: {
    //     position_id: '034bbae6bf3f89bc9f7bdce01130c03248b362d94c6e8266299e124573626133',
    //     username: 'Anonymous',
    //   },
    // },
    // {
    //   path: '/subheader',
    //   name: 'subheader',
    //   component: Subheader,
    //   props: {
    //     field: 'Internship Opportunities',
    //   },
    // },
    // {
    //   path: '/recommended',
    //   name: 'recommended',
    //   component: Recommended,
    // },
    // {
    //   path: '/industry-insight',
    //   name: 'industry-insight',
    //   component: Insights,
    // },
    // {
    //   path: '/background-statistics',
    //   name: 'background-statistics',
    //   component: Background,
    // },
    // {
    //   path: '/prof_project',
    //   name: 'prof_project',
    //   component: ProfPage,
    // },
  ],
});
