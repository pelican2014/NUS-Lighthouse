import About from '@/components/about/about';
import Contact from '@/components/contact/contact';
import RAChart from '@/components/ra-main-charts/ra-main-charts';
import Histogram from '@/components/charts/histogram';
import Home from '@/components/home/home';
import Company from '@/components/company/company';
import TopHeader from '@/components/top-header/top-header';
import Subheader from '@/components/subheader/subheader';
import Pie from '@/components/charts/pie';
import Lines from '@/components/charts/line';
import Bar from '@/components/charts/bar';
import HBar from '@/components/charts/horizontal-bar';
import Wordcloud from '@/components/charts/word-cloud';
import Area from '@/components/charts/area';
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
import Insights from '@/components/industry-insight/industry-insight';
import InternshipHomePage from '@/components/internship-homepage/internship-homepage';
import OpeningPositions from '@/components/opening-positions/opening-positions';
import CompanyHome from '@/components/company-home/company-home';
import Recommended from '@/components/recommended/recommended';
import Background from '@/components/background-statistics/background-statistics';
import InitialPage from '@/components/initial-page/initial-page';
import PositionInfo from '@/components/basic-information/position-info';
import BackgroundPosition from '@/components/background-position/background-position';
import PositionPage from '@/components/position-page/position-page';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // component: CompanyHome,
      // props: {
      //   company_id: '02eb568a3d2b51986946b727abb94db3439070cf46453797427ca29f1fcb22e6',
      // },
      component: PositionPage,
      props: {
        position_id: '034bbae6bf3f89bc9f7bdce01130c03248b362d94c6e8266299e124573626133',
        username: 'Anonymous',
      },
    },
    {
      path: '/current-projects',
      name: 'current-projects',
      component: CurrentProjects,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/ra-charts',
      name: 'ra-charts',
      component: RAChart,
    },
    {
      path: '/position-stats',
      name: 'position-stats',
      component: PositionStats,
      props: {
        company_id: 'e4e98f1268b629c48766c024861cff696c3fecb89396c622d609dd88f5ccae8e',
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/JobPostSearch',
      name: 'JobPostSearch',
      component: JobPostSearch,
    },
    {
      path: '/trajectory',
      name: 'trajectory',
      component: TrajectoryPosition,
      props: {
        position_id: 'a02701c0af33df2553ec613bf1255d9b48b80043a466cf65af84961da4e3451c',
      },
    },
    {

      path: '/RecentPublications',
      name: 'RecentPublications',
      component: RecentPublications,
    },
    {
      path: '/BasicInformationInternship',
      name: 'BasicInformationInternship',
      component: BasicInformation,
      props: {
        section: 'Internship',
      },
    },
    {
      path: '/BasicInformationResearch',
      name: 'BasicInformationResearch',
      component: BasicInformation,
      props: {
        section: 'Research',
      },
    },
    {
      path: '/BasicInformationTeaching',
      name: 'BasicInformationTeaching',
      component: BasicInformation,
      props: {
        section: 'Teaching',
      },
    },
    {
      path: '/company-description',
      name: 'company-description',
      component: Company,
      props: {
        company_id: '02eb568a3d2b51986946b727abb94db3439070cf46453797427ca29f1fcb22e6',
        image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
      },
    },
    {
      path: '/searchBar',
      name: 'searchBar',
      component: SearchBar,
    },
    {
      path: '/filteredSearch',
      name: 'filteredSearch',
      component: FilteredSearch,
    },
    {
      path: '/positionDetails',
      name: 'positionDetails',
      component: PositionDetails,
      props: {
        position_id: '034bbae6bf3f89bc9f7bdce01130c03248b362d94c6e8266299e124573626133',
      },
    },
    {
      path: '/topHeader',
      name: 'topHeader',
      component: TopHeader,
      props: {
        username: 'Anonymous',
      },
    },
    {
      path: '/subheader',
      name: 'subheader',
      component: Subheader,
      props: {
        field: 'Internship Opportunities',
      },
    },
    {
      path: '/recommended',
      name: 'recommended',
      component: Recommended,
    },
    {
      path: '/industry-insight',
      name: 'industry-insight',
      component: Insights,
    },
    {
      path: '/background-statistics',
      name: 'background-statistics',
      component: Background,
    },
  ],
});
