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
// import TrajectoryPosition from '@/components/trajectory-ta/trajectory-position';
// import PositionStats from '@/components/position-stats/position-stats';
// import Insights from '@/components/industry-insight/industry-insight';
// // import InternshipHomePage from '@/components/internship-homepage/internship-homepage';
// import OpeningPositions from '@/components/opening-positions/opening-positions';
// import CompanyHome from '@/components/company-home/company-home';
// import Recommended from '@/components/recommended/recommended';
import ModulePage from '@/components/module-ta-page/module-ta-page';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ModulePage,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: About,
    // },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: Contact,
    // },
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
    //     company_id: '05c2639182d92e2ca4e455bfc9e8afe1c6f7d722e7477e20482c5b961bfdcb48',
    //   },
    // },
    // {
    //   path: '/company-description',
    //   name: 'company-description',
    //   component: Company,
    //   props: {
    //     company_name: 'UOB',
    //     image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
    //   },
    // },
    // {
    //   path: '/searchBar',
    //   name: 'searchBar',
    //   component: SearchBar,
    // },
    // {
    //   path: '/filteredSearch',
    //   name: 'filteredSearch',
    //   component: FilteredSearch,
    // },
    // {
    //   path: '/positionDetails',
    //   name: 'positionDetails',
    //   component: PositionDetails,
    // },
    // {
    //   path: '/topHeader',
    //   name: 'topHeader',
    //   component: TopHeader,
    //   props: {
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
    //   path: '/module-page',
    //   name: 'module-page',
    //   component: ModulePage,
    // },
  ],
});
