<template>
  <view class="overflow-hidden text-sm">
    <!-- 荣誉榜 -->
    <view class="p-4">
      <view class="flex items-center">
        <view class="text-base font-bold flex-1">荣誉榜</view>
        <uni-data-select :clear="false" v-model="value" :localdata="range" @change="change"></uni-data-select>
      </view>

      <view class="my-2">
        <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
          <template #="{ active, tab, index }">
            <view :class="['h-6 text-sm flex items-center', {
          'font-bold': active,
          'mr-4': index !== tabs.length - 1
        }]">
              {{ tab?.year.toString().substring(2, 4) }}年{{ tab?.month }}月
            </view>
          </template>
        </slider-tab>
      </view>

      <view class="grid grid-cols-2 gap-[24rpx]">
        <view v-if="honorBoard?.kingOfRecommender" class="p-2 w-full mr-4 border-solid border-[1rpx] border-repeat-79">
          <view class="font-bold">引荐王：</view>
          <view class="mt-2 flex">
            <image mode="aspectFill" class="w-10.5 h-10.5 border-solid border-repeat-79 border-[1rpx]"
              :src="honorBoard.kingOfRecommender?.mainImg">
            </image>
            <view class="text-xs ml-2 flex flex-col">
              <view class="flex-1">{{ honorBoard.kingOfRecommender?.name }}</view>
              <view class="flex-1">引荐数量：{{ honorBoard.kingOfRecommender?.recommendNum }}</view>
            </view>
          </view>
        </view>
        <view v-if="honorBoard?.kingOfRecommendMoney"
          class="p-2 w-full mr-4 border-solid border-[1rpx] border-repeat-79">
          <view class="font-bold">成交金额王：</view>
          <view class="mt-2 flex">
            <image mode="aspectFill" class="w-10.5 h-10.5 border-solid border-repeat-79 border-[1rpx]"
              :src="honorBoard.kingOfRecommendMoney?.mainImg">
            </image>
            <view class="text-xs ml-2 flex flex-col">
              <view class="flex-1">{{ honorBoard.kingOfRecommendMoney?.name }}</view>
              <view class="flex-1">引荐金额：{{ honorBoard.kingOfRecommendMoney?.harvestedMoney }}</view>
            </view>
          </view>
        </view>
        <view v-if="honorBoard?.kingOfGuest" class="p-2 w-full mr-4 border-solid border-[1rpx] border-repeat-79">
          <view class="font-bold">嘉宾王：</view>
          <view class="mt-2 flex">
            <image mode="aspectFill" class="w-10.5 h-10.5 border-solid border-repeat-79 border-[1rpx]"
              :src="honorBoard.kingOfGuest?.mainImg">
            </image>
            <view class="text-xs ml-2 flex flex-col">
              <view class="flex-1">{{ honorBoard.kingOfGuest?.name }}</view>
              <view class="flex-1">邀约嘉宾：{{ honorBoard.kingOfGuest?.guestNum }}</view>
            </view>
          </view>
        </view>
        <view v-if="honorBoard?.kingOfVisit" class="p-2 w-full mr-4 border-solid border-[1rpx] border-repeat-79">
          <view class="font-bold">走访王：</view>
          <view class="mt-2 flex">
            <image mode="aspectFill" class="w-10.5 h-10.5 border-solid border-repeat-79 border-[1rpx]"
              :src="honorBoard.kingOfVisit?.mainImg">
            </image>
            <view class="text-xs ml-2 flex flex-col">
              <view class="flex-1">{{ honorBoard.kingOfVisit?.name }}</view>
              <view class="flex-1">走访数量：{{ honorBoard.kingOfVisit?.visitNum }}</view>
            </view>
          </view>
        </view>
      </view>

      <view
        v-if="!honorBoard?.kingOfRecommender && !honorBoard?.kingOfRecommendMoney && !honorBoard?.kingOfGuest && !honorBoard?.kingOfVisit"
        class="text-center text-repeat-79">
        暂无数据</view>

      <view v-if="presentPerson?.goldenList && presentPerson?.goldenList.length > 0" class="font-bold mt-4">全勤金奖：</view>
      <view class="flex flex-wrap">
        <view v-for="(item, index) in presentPerson?.goldenList" :key="index" class="flex items-center mt-2 mr-3">
          <image mode="aspectFill" class="w-6 h-6 border-solid border-repeat-79 border-[1rpx]" :src="item?.avatar">
          </image>
          <view class="ml-2">{{ item?.name }}</view>
        </view>
      </view>

      <view v-if="presentPerson?.silverList && presentPerson?.silverList.length > 0" class="font-bold mt-4">全勤银奖：</view>
      <view class="flex flex-wrap">
        <view v-for="(item, index) in presentPerson?.silverList" :key="index" class="flex items-center mt-2 mr-3">
          <image mode="aspectFill" class="w-6 h-6 border-solid border-repeat-79 border-[1rpx]" :src="item?.avatar">
          </image>
          <view class="ml-2">{{ item?.name }}</view>
        </view>
      </view>

      <view v-if="presentPerson?.gronzeList && presentPerson?.gronzeList.length > 0" class="font-bold mt-4">全勤铜奖：</view>
      <view class="flex flex-wrap">
        <view v-for="(item, index) in presentPerson?.gronzeList" :key="index" class="flex items-center mt-2 mr-3">
          <image mode="aspectFill" class="w-6 h-6 border-solid border-repeat-79 border-[1rpx]" :src="item?.avatar">
          </image>
          <view class="ml-2">{{ item?.name }}</view>
        </view>
      </view>
    </view>

    <!-- 功勋会员榜 -->
    <view class="p-4 border-solid border-t-[1rpx] border-repeat-79">
      <view class="text-base font-bold">功勋会员榜</view>
      <view class="flex mt-3 text-center">
        <view class="ml-12 w-20">会员姓名</view>
        <view class="ml-8 w-32">介绍入会人数</view>
      </view>

      <view :class="{ 'overflow-hidden max-h-40': hide5 }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in nvitePersonBoard" :key="index">
          <image mode="aspectFill" class="w-5 h-5 border-solid border-repeat-79 border-[1rpx]" :src="item?.mainImg">
          </image>
          <view class="ml-6.5 w-20">{{ item?.name }}</view>
          <view class="w-32 ml-8">{{ item?.invitePersonNum }}</view>
        </view>
      </view>
      <view v-if="nvitePersonBoard && nvitePersonBoard?.length > 5" class="text-center my-2" @tap="hide5 = !hide5">
        {{ hide5 ? '展开全部 ∨' : "收起全部 ∧" }}</view>
    </view>

    <!-- 综合得分榜 -->
    <view
      v-if="memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3"
      class="p-4 border-solid border-t-[1rpx] border-repeat-79">
      <view class="text-base font-bold">综合得分榜</view>
      <view class="my-2">
        <slider-tab v-model="curValue1" :tabs="tabs" @change="onChange1">

          <template #="{ active, tab, index }">
            <view :class="['h-6 text-sm flex items-center', {
          'font-bold': active,
          'mr-4': index !== tabs.length - 1
        }]">
              {{ tab?.year.toString().substring(2, 4) }}年{{ tab?.month }}月
            </view>
          </template>
        </slider-tab>
      </view>
      <view class="text-xs flex mt-3 mb-2 text-center">
        <view class="w-16">姓名</view>
        <view class="flex-1" @tap="averageBoardSort(1)" :class="{ 'font-bold': sort1 == 1 }">总分↓</view>
        <view class="flex-1" @tap="averageBoardSort(2)" :class="{ 'font-bold': sort1 == 2 }">引荐↓</view>
        <view class="flex-1" @tap="averageBoardSort(3)" :class="{ 'font-bold': sort1 == 3 }">嘉宾↓</view>
        <view class="flex-1" @tap="averageBoardSort(4)" :class="{ 'font-bold': sort1 == 4 }">走访↓</view>
        <view class="flex-1" @tap="averageBoardSort(5)" :class="{ 'font-bold': sort1 == 5 }">出勤↓</view>
        <view class="flex-1" @tap="averageBoardSort(6)" :class="{ 'font-bold': sort1 == 6 }">金额↓</view>
      </view>
      <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in averageBoard" :key="index">
          <view class="w-16">
            {{ item?.name }}
          </view>
          <view class="flex-1">
            {{ item?.score || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.recommenderNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.guestNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.visitNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.presentNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.money || 0 }}
          </view>
        </view>
      </view>
      <view v-if="averageBoard && averageBoard?.length > 5" class="text-center my-2" @tap="hide = !hide">
        {{ hide ? '展开全部 ∨'
          : "收起全部 ∧" }}
      </view>

      <!-- 给出引荐数量实时排行榜 -->
      <view class="flex items-center mt-4">
        <view class="text-base font-bold flex-1">给出引荐数量实时排行榜</view>
        <uni-data-select :clear="false" v-model="value1" :localdata="range1" @change="onChange2"></uni-data-select>
      </view>
      <view class="text-xs flex mt-3 mb-2 text-center">
        <view class="w-16">姓名</view>
        <view class="flex-1" @tap="recommandBoardSort(1)" :class="{ 'font-bold': sort2 == 1 }">总引荐↓</view>
        <view class="flex-1" @tap="recommandBoardSort(2)" :class="{ 'font-bold': sort2 == 2 }">外部引荐数↓</view>
        <view class="flex-1" @tap="recommandBoardSort(3)" :class="{ 'font-bold': sort2 == 3 }">内部引荐数↓</view>
      </view>
      <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide1 }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in recommandBoard" :key="index">
          <view class="w-16">
            {{ item?.name }}
          </view>
          <view class="flex-1">
            {{ item?.recommendNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.outerRecommendNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.innerRecommendNum || 0 }}
          </view>
        </view>
      </view>
      <view v-if="recommandBoard && recommandBoard?.length > 5" class="text-center my-2" @tap="hide1 = !hide1">
        {{ hide1 ? '展开全部 ∨' : "收起全部 ∧" }}</view>

      <!-- 给出引荐金额实时排行榜 -->
      <view class="flex items-center mt-4">
        <view class="text-base font-bold flex-1">给出引荐金额实时排行榜</view>
        <uni-data-select :clear="false" v-model="value2" :localdata="range1" @change="onChange3"></uni-data-select>
      </view>
      <view class="text-xs flex mt-3 mb-2 text-center">
        <view class="w-16">姓名</view>
        <view class="flex-1" @tap="recommandMoneyBoardSort(1)" :class="{ 'font-bold': sort3 == 1 }">总成交金额↓</view>
        <view class="flex-1" @tap="recommandMoneyBoardSort(2)" :class="{ 'font-bold': sort3 == 2 }">外部成交金额↓</view>
        <view class="flex-1" @tap="recommandMoneyBoardSort(3)" :class="{ 'font-bold': sort3 == 3 }">内部成交金额↓</view>
      </view>
      <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide2 }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in recommandMoneyBoard" :key="index">
          <view class="w-16">
            {{ item?.name }}
          </view>
          <view class="flex-1">
            {{ item?.harvestedMoney || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.outerHarvestedMoney || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.innerHarvestedMoney || 0 }}
          </view>
        </view>
      </view>
      <view v-if="recommandMoneyBoard && recommandMoneyBoard?.length > 5" class="text-center my-2"
        @tap="hide2 = !hide2">
        {{ hide2 ? '展开全部 ∨' : "收起全部 ∧" }}</view>

      <!-- 邀约嘉宾排行榜 -->
      <view class="flex items-center mt-4">
        <view class="text-base font-bold flex-1">邀约嘉宾排行榜</view>
        <uni-data-select :clear="false" v-model="value3" :localdata="range1" @change="onChange4"></uni-data-select>
      </view>
      <view class="text-xs flex mt-3 mb-2 text-center">
        <view class="w-16">姓名</view>
        <view class="w-16 ml-12">嘉宾数</view>
      </view>
      <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide3 }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in inviteGuestBoard" :key="index">
          <view class="w-16">
            {{ item?.name }}
          </view>
          <view class="w-16 ml-12">
            {{ item?.guestNum || 0 }}
          </view>
        </view>
      </view>
      <view v-if="inviteGuestBoard && inviteGuestBoard?.length > 5" class="text-center my-2" @tap="hide3 = !hide3">
        {{ hide3 ? '展开全部 ∨' : "收起全部 ∧" }}</view>

      <!-- 走访实时排行榜 -->
      <view class="flex items-center mt-4">
        <view class="text-base font-bold flex-1">走访实时排行榜</view>
        <uni-data-select :clear="false" v-model="value4" :localdata="range1" @change="onChange5"></uni-data-select>
      </view>
      <view class="text-xs flex mt-3 mb-2 text-center">
        <view class="w-16">姓名</view>
        <view class="flex-1" @tap="visitBoardSort(1)" :class="{ 'font-bold': sort4 == 1 }">总走访↓</view>
        <view class="flex-1" @tap="visitBoardSort(2)" :class="{ 'font-bold': sort4 == 2 }">点对点走访↓</view>
        <view class="flex-1" @tap="visitBoardSort(3)" :class="{ 'font-bold': sort4 == 3 }">内组织走访↓</view>
      </view>
      <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide4 }">
        <view class="h-8 flex text-center items-center" v-for="(item, index) in visitBoard" :key="index">
          <view class="w-16">
            {{ item?.name }}
          </view>
          <view class="flex-1">
            {{ item?.visitNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.pointToPointNum || 0 }}
          </view>
          <view class="flex-1">
            {{ item?.organizeNum || 0 }}
          </view>
        </view>
      </view>
      <view v-if="visitBoard && visitBoard?.length > 5" class="text-center my-2" @tap="hide4 = !hide4">
        {{ hide4 ? '展开全部 ∨' : "收起全部 ∧" }}</view>


    </view>
  </view>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { ref } from 'vue';
import SliderTab from '@/components/sliderTab/index.vue';
import { getTabs } from '@/utils/tools';
import { onLoad, onShow } from '@dcloudio/uni-app';
import * as databoard from '@/api/app/databoard'
import { useMemberStore } from '@/stores'

let memberStore = useMemberStore()


let curValue = ref(1);
let curValue1 = ref(1);
// let tabs: any = ref(getTabs(new Date(2023, 3)))
let tabs: any = ref([])

const change = async (e: any) => {
  tabs.value = []
  const result = await databoard.AppDateBoard({ session: e })
  if (result.data && result.data.length > 0) {
    tabs.value = result.data.reverse().map((value, index) => ({
      ...value,
      key: index + 1
    }))
  }
  if (tabs.value && tabs.value.length > 0) {
    getAppHonorBoard(tabs.value[0].year, tabs.value[0].month)
    getAppAverageBoard(tabs.value[0].year, tabs.value[0].month)
    GetPresentPerson(tabs.value[0].year, tabs.value[0].month)
    getAppInvitePersonBoard(tabs.value[0].year, tabs.value[0].month)
  }
}

//荣誉榜切换日期
const onChange = (e: any) => {
  // console.log('change事件:', e);
  getAppHonorBoard(e.year, e.month)
  GetPresentPerson(e.year, e.month)
  getAppInvitePersonBoard(e.year, e.month)
}

//得分榜切换日期
const onChange1 = (e: any) => {
  getAppAverageBoard(e.year, e.month)
}

//引荐榜切换
const onChange2 = (e: any) => {
  getAppRecommandBoard()
}

//引荐金额榜切换
const onChange3 = (e: any) => {
  getAppRecommandMoneyBoard()
}

//邀约嘉宾榜切换
const onChange4 = (e: any) => {
  getAppInviteGuestBoard()
}

//走访榜切换
const onChange5 = (e: any) => {
  getAppVisitBoard()
}

let value = ref(1);
let range = ref([]);
let hide = ref(true);
let hide1 = ref(true);
let hide2 = ref(true);
let hide3 = ref(true);
let hide4 = ref(true);
let hide5 = ref(true);

//得分榜排序
let sort1 = ref(1)
const averageBoardSort = (s: number) => {
  sort1.value = s
  if (averageBoard.value && averageBoard.value.length > 0) {
    if (sort1.value == 1) {
      averageBoard.value.sort((a: any, b: any) => b.score - a.score)
    } else if (sort1.value == 2) {
      averageBoard.value.sort((a: any, b: any) => b.recommenderNum - a.recommenderNum)
    } else if (sort1.value == 3) {
      averageBoard.value.sort((a: any, b: any) => b.guestNum - a.guestNum)
    } else if (sort1.value == 4) {
      averageBoard.value.sort((a: any, b: any) => b.visitNum - a.visitNum)
    } else if (sort1.value == 5) {
      averageBoard.value.sort((a: any, b: any) => b.presentNum - a.presentNum)
    } else {
      averageBoard.value.sort((a: any, b: any) => b.money - a.money)
    }
  }
}

//引荐榜排序
let sort2 = ref(1)
const recommandBoardSort = (s: number) => {
  sort2.value = s
  if (recommandBoard.value && recommandBoard.value.length > 0) {
    if (sort2.value == 1) {
      recommandBoard.value.sort((a: any, b: any) => b.recommendNum - a.recommendNum)
    } else if (sort2.value == 2) {
      recommandBoard.value.sort((a: any, b: any) => b.outerRecommendNum - a.outerRecommendNum)
    } else {
      recommandBoard.value.sort((a: any, b: any) => b.innerRecommendNum - a.innerRecommendNum)
    }
  }
}

//引荐金额榜排序
let sort3 = ref(1)
const recommandMoneyBoardSort = (s: number) => {
  sort3.value = s
  if (recommandMoneyBoard.value && recommandMoneyBoard.value.length > 0) {
    if (sort3.value == 1) {
      recommandMoneyBoard.value.sort((a: any, b: any) => b.harvestedMoney - a.harvestedMoney)
    } else if (sort3.value == 2) {
      recommandMoneyBoard.value.sort((a: any, b: any) => b.outerHarvestedMoney - a.outerHarvestedMoney)
    } else {
      recommandMoneyBoard.value.sort((a: any, b: any) => b.innerHarvestedMoney - a.innerHarvestedMoney)
    }
  }
}

//走访榜排序
let sort4 = ref(1)
const visitBoardSort = (s: number) => {
  sort4.value = s
  if (visitBoard.value && visitBoard.value.length > 0) {
    if (sort4.value == 1) {
      visitBoard.value.sort((a: any, b: any) => b.visitNum - a.visitNum)
    } else if (sort4.value == 2) {
      visitBoard.value.sort((a: any, b: any) => b.pointToPointNum - a.pointToPointNum)
    } else {
      visitBoard.value.sort((a: any, b: any) => b.organizeNum - a.organizeNum)
    }
  }
}


let value1 = ref(0);
let value2 = ref(0);
let value3 = ref(0);
let value4 = ref(0);
let range1 = ref([
  { value: 0, text: '本月' },
  { value: 1, text: '本届' },
]);

//荣誉榜
let honorBoard: any = ref()
const getAppHonorBoard = async (year: number, month: number) => {
  const { data } = await databoard.AppHonorBoard({ averageBoardYear: year, averageBoardMonth: month })
  honorBoard.value = data
}

//得分榜
let averageBoard: any = ref([])
const getAppAverageBoard = async (year: number, month: number) => {
  if (memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3) {
    const { data } = await databoard.AppAverageBoard({ averageBoardYear: year, averageBoardMonth: month })
    averageBoard.value = data
    averageBoardSort(sort1.value)
  }
}

//引荐榜
let recommandBoard: any = ref([])
const getAppRecommandBoard = async () => {
  if (memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3) {
    const { data } = await databoard.AppRecommandBoard({ queryType: value1.value })
    recommandBoard.value = data
    recommandBoardSort(sort2.value)
  }
}

//引荐金额榜
let recommandMoneyBoard: any = ref([])
const getAppRecommandMoneyBoard = async () => {
  if (memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3) {
    const { data } = await databoard.AppRecommandMoneyBoard({ queryType: value2.value })
    recommandMoneyBoard.value = data
    recommandMoneyBoardSort(sort3.value)
  }
}

//邀约嘉宾榜
let inviteGuestBoard: any = ref([])
const getAppInviteGuestBoard = async () => {
  if (memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3) {
    const { data } = await databoard.AppInviteGuestBoard({ queryType: value3.value })
    inviteGuestBoard.value = data
    if (inviteGuestBoard.value && inviteGuestBoard.value.length > 0) {
      inviteGuestBoard.value.sort((a: any, b: any) => b.guestNum - a.guestNum)
    }
  }
}

//走访实时排行榜
let visitBoard: any = ref([])
const getAppVisitBoard = async () => {
  if (memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3) {
    const { data } = await databoard.AppVisitBoard({ queryType: value4.value })
    visitBoard.value = data
    visitBoardSort(sort4.value)
  }
}

//全勤
let presentPerson: any = ref()
const GetPresentPerson = async (year: number, month: number) => {
  const { data } = await databoard.getPresentPerson({ averageYear: year, averageMonth: month })
  presentPerson.value = data
}

//功勋榜
let nvitePersonBoard: any = ref([])
const getAppInvitePersonBoard = async (year: number, month: number) => {
  const { data } = await databoard.AppInvitePersonBoard({ averageYear: year, averageMonth: month })
  nvitePersonBoard.value = data
}

const getHonorAndAverage = async () => {
  const result = await databoard.AppSessionBoard()
  if (result.data && result.data.length > 0) {
    range.value = result.data.map((value, index) => ({
      value: value,
      text: `第${value}届`,
    }));
    const result1 = await databoard.AppDateBoard({ session: range.value[0].value })
    if (result1.data && result1.data.length > 0) {
      tabs.value = result1.data.reverse().map((value, index) => ({
        ...value,
        key: index + 1
      }))
    }
    if (tabs.value && tabs.value.length > 0) {
      getAppHonorBoard(tabs.value[0].year, tabs.value[0].month)
      getAppAverageBoard(tabs.value[0].year, tabs.value[0].month)
      GetPresentPerson(tabs.value[0].year, tabs.value[0].month)
      getAppInvitePersonBoard(tabs.value[0].year, tabs.value[0].month)
    }
  }


}

onShow(() => {
  getHonorAndAverage()

  getAppRecommandBoard()
  getAppRecommandMoneyBoard()
  getAppInviteGuestBoard()
  getAppVisitBoard()
})
</script>

<style lang="scss"></style>