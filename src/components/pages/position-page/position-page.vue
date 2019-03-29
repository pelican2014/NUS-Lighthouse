<template src="./position-page.html"></template>
<style src = './position-page.scss' lang = 'scss'></style>

<script>
import NavBar from '@/components/nav-bar/nav-bar';
import SubHeader from '@/components/subheader/subheader';
import PositionInfo from '@/components/basic-information/position-info';
import PositionDetails from '@/components/position-details/position-details';
import BackgroundStats from '@/components/background-position/background-position';
import TrajectoryPosition from '@/components/trajectory-position/trajectory-position';

import db from '@/firebase';

export default{
  name: 'position-page',
  components: {
    NavBar,
    SubHeader,
    PositionInfo,
    PositionDetails,
    BackgroundStats,
    TrajectoryPosition,
  },
  props: {
    username: {
      type: String,
    },
    position_id: {
      type: String,
      required: true,
    },
  },
};
</script>
