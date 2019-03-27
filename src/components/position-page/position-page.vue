<template src="./position-page.html"></template>
<style src = './position-page.scss' lang = 'scss'></style>

<script>
import TopHeader from '@/components/top-header/top-header';
import SubHeader from '@/components/subheader/subheader';
import PositionInfo from '@/components/basic-information/position-info';
import PositionDetails from '@/components/position-details/position-details';
import BackgroundStats from '@/components/background-position/background-position';
import TrajectoryPosition from '@/components/trajectory-position/trajectory-position';

export default{
  name: 'position-page',
  components: {
    TopHeader,
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
