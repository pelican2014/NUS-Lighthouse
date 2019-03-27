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
import InternshipHomePage from '@/components/internship-homepage/internship-homepage';
// import OpeningPositions from '@/components/opening-positions/opening-positions';
import CompanyHome from '@/components/company-home/company-home';
// import Recommended from '@/components/recommended/recommended';
// import ExplorerSearch from '@/components/explorer-search/explorer-search';
// import BackgroundStatistics from '@/components/background-statistics/background-statistics';
import IndustryPage from '@/components/pages/industry-page/industry-page';
import RAPage from '@/components/pages/ra-homepage/ra-homepage';
// import InitialPage from '@/components/initial-page/initial-page';
// import PositionInfo from '@/components/basic-information/position-info';
// import BackgroundPosition from '@/components/background-position/background-position';
import PositionPage from '@/components/position-page/position-page';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: null,
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
    {
      path: '/industryPage',
      name: 'industryPage',
      component: IndustryPage,
    },
    {
      path: '/internship-homepage',
      name: 'internship-homepage',
      component: InternshipHomePage,
    },
    {
      path: '/raPage',
      name: 'raPage',
      component: RAPage,
    },
    {
      path: '/company-page',
      name: 'company-page',
      component: CompanyHome,
      props: {
        company_id: '05c2639182d92e2ca4e455bfc9e8afe1c6f7d722e7477e20482c5b961bfdcb48',
      },
    },
    {
      path: '/position-page/:position_id',
      name: 'position-page',
      component: PositionPage,
      props: true,
    },
  ],
});
