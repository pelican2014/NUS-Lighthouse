import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import RAChart from '@/components/ra-main-charts/ra-main-charts';

// import About from '@/components/about/about';
// import Contact from '@/components/contact/contact';
import Home from '@/components/home/home';
import Company from '@/components/company/company';
import Header from '@/components/header/header';
import Subheader from '@/components/subheader/subheader';
// import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
// import Bar from '@/components/charts/bar';
// import Wordcloud from '@/components/charts/word-cloud';
// import Area from '@/components/charts/area';
import SearchBar from '@/components/search-bar/search-bar';
import IndustryExplorer from '@/components/industry-explorer/industry-explorer';
import Vue from 'vue';
import Router from 'vue-router';
import RecentPublications from '@/components/recent-publications/recent-publications';
import JobPostSearch from '@/components/job-post-search/job-post-search';
import Modal from '@/components/modal/modal';
import CurrentProjects from '@/components/current-projects/current-projects';
import FilteredSearch from '@/components/filtered-search/filtered-search';
import PositionDetails from '@/components/position-details/position-details';
import BasicInformation from '@/components/basic-information/basic-information';
import TrajectoryPosition from '@/components/trajectory-position/trajectory-position';
import PositionStats from '@/components/position-stats/position-stats';

Vue.use(Router);

export default new Router({
  routes: [

    {
      path: './',
      name: 'home',
      component: null,
    },
    {
      path: './current-projects',
      name: 'current-projects',
      component: CurrentProjects,
    },
    {
      path: './about',
      name: 'about',
      component: About,
    },
    {
      path: './ra-charts',
      name: 'ra-charts',
      component: RAChart,
    },
    {
      path: './position-stats',
      name: 'position-stats',
      component: PositionStats,
    },
    {
      path: './contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: './JobPostSearch',
      name: 'JobPostSearch',
      component: JobPostSearch,
    },
    {
      path: './trajectory',
      name: 'trajectory',
      component: TrajectoryPosition,
    },
    {

      path: './RecentPublications',
      name: 'RecentPublications',
      component: RecentPublications,
    },
    {
      path: './BasicInformationInternship',
      name: 'BasicInformationInternship',
      component: BasicInformation,
      props: {
        section: 'Internship',
      },
    },
    {
      path: './BasicInformationResearch',
      name: 'BasicInformationResearch',
      component: BasicInformation,
      props: {
        section: 'Research',
      },
    },
    {
      path: './BasicInformationTeaching',
      name: 'BasicInformationTeaching',
      component: BasicInformation,
      props: {
        section: 'Teaching',
      },
    },
    {
      path: './company-description',
      name: 'company-description',
      component: Company,
    },
    {
      path: './searchBar',
      name: 'searchBar',
      component: SearchBar,
    },
    {
      path: './filteredSearch',
      name: 'filteredSearch',
      component: FilteredSearch,
    },
    {
      path: './positionDetails',
      name: 'positionDetails',
      component: PositionDetails,
    },
    {
      path: './header',
      name: 'header',
      component: Header,
      props: {
        username: 'Anonymous',
      },
    },
    {
      path: './subheader',
      name: 'subheader',
      component: Subheader,
      props: {
        field: 'Internship Opportunities',
      },
    },
  ],
});
