import NavBar from '@/components/nav-bar/nav-bar';
import subheader from '@/components/subheader/subheader';
import searchBar from '@/components/search-bar/search-bar';
import industryExplorer from '@/components/industry-explorer/industry-explorer';
import recommended from '@/components/recommended-position/recommended-position';
import db from '@/firebase';


export default {
  name: 'InternshipHomepage',
  components: {
    NavBar,
    subheader,
    searchBar,
    industryExplorer,
    recommended,
  },
  // props: {
  //   data: {
  //     type: Object,
  //     required: true,
  //   },
  // },
  computed: {


  },
  firebase: {
    internship: {
      source: db.ref('internship'),
      asArray: true,
    },
  },
  methods: {

  },
};
