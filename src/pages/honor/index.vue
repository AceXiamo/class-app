<template>
  <view class="overflow-hidden text-sm">
    <!-- 顶部(固定) -->
    <view class="w-full h-[610rpx] pr-[30rpx] pl-[30rpx]" style="background: linear-gradient( 135deg, #D41869, #92003F);">
      <view class="w-full z-30 top-0 overflow-y-hidden flex" :style="{ paddingTop: `${statusBar}px` }">
        <view class="w-full flex items-center justify-center text-white text-base font-medium z-9999"
          :style="{ height: `${customBar}px` }">荣誉榜
        </view>
      </view>
      <view class="flex items-center mt-2 h-[100rpx]">
        <view class="flex-1 text-white text-[60rpx] font-bold">荣誉榜</view>
        <uni-data-select :clear="false" v-model="value" :localdata="range" @change="change"></uni-data-select>
      </view>
      <view class="my-2">
        <slider-tab v-model="curValue" :tabs="tabs" @change="onChange">
          <template #="{ active, tab, index }">
            <view :class="['h-[100rpx] text-sm flex items-center text-white text-[26rpx] relative justify-center', {
              'font-bold': active,
              'text-[30rpx]': active,
              'mr-4': index !== tabs.length - 1
            }]">
              {{ tab?.year.toString().substring(2, 4) }}年{{ tab?.month }}月
              <view v-if="active" class="bg-white w-[30rpx] h-0.75 absolute bottom-2"></view>
            </view>
          </template>
        </slider-tab>
      </view>
    </view>
    <!-- 页面主体 -->
    <view class="-mt-[234rpx] bg-white rounded-t-[46rpx]" style="height: calc(100vh - 376rpx);">
      <scroll-view class="h-full" scroll-y>
        <!-- 荣誉榜 -->
        <view class="p-4">
          <view class="grid grid-cols-2 gap-[24rpx]">
              <view class="w-full mr-4 king-item">
                <view class="font-bold text-white text-base text-center h-[62rpx] leading-[62rpx] relative">
                  <text class="absolute title">引荐王</text>
                  <image src="/static/images/bg-king-title.jpg" class="absolute w-full left-0" mode="widthFix" />
                </view>
                <view class="p-2 flex item-center">
                  <image mode="aspectFill" class="w-10.5 h-10.5 rounded-1/2" :src="honorBoard.kingOfRecommender?.mainImg">
                  </image>
                  <view class="ml-2 flex flex-col">
                    <view class="flex-1">{{ honorBoard?.kingOfRecommender ? honorBoard?.kingOfRecommender : '虚位以待' }}
                    </view>
                    <view v-if="honorBoard?.kingOfRecommender"
                      class="flex-1 text-xs break-all">引荐数量：{{
                        honorBoard.kingOfRecommender?.recommendNum }}</view>
                  </view>
                </view>
              </view>
                <view class="w-full mr-4 king-item">
                  <view class="font-bold text-white text-base text-center h-[62rpx] leading-[62rpx] relative">
                    <text class="absolute title">成交金额王</text>
                    <image src="/static/images/bg-king-title.jpg" class="absolute w-full left-0" mode="widthFix" />
                  </view>
                  <view class="p-2 flex item-center">
                    <image mode="aspectFill" class="w-10.5 h-10.5 rounded-1/2"
                      :src="honorBoard.kingOfRecommendMoney?.mainImg">
                    </image>
                    <view class="ml-2 flex flex-col">
                      <view class="flex-1">{{ honorBoard?.kingOfRecommendMoney ? honorBoard.kingOfRecommendMoney?.name :
                        '虚位以待' }}</view>
                      <view v-if="honorBoard?.kingOfRecommendMoney" class="flex-1 text-xs break-all">引荐金额：{{
                        honorBoard.kingOfRecommendMoney?.harvestedMoney }}</view>
                    </view>
                  </view>
                </view>
                  <view class="w-full mr-4 king-item">
                    <view class="font-bold text-white text-base text-center h-[62rpx] leading-[62rpx] relative">
                      <text class="absolute title">嘉宾王</text>
                      <image src="/static/images/bg-king-title.jpg" class="absolute w-full left-0" mode="widthFix" />
                    </view>
                    <view class="p-2 flex item-center">
                      <image mode="aspectFill" class="w-10.5 h-10.5 rounded-1/2" :src="honorBoard.kingOfGuest?.mainImg">
                      </image>
                      <view class="ml-2 flex flex-col">
                        <view class="flex-1">{{ honorBoard?.kingOfGuest ? honorBoard?.kingOfGuest ?
                          honorBoard.kingOfGuest?.name : '虚位以待' : '虚位以待' }}</view>
                        <view v-if="honorBoard?.kingOfGuest"
                          class="flex-1 text-xs break-all">邀约嘉宾：{{
                            honorBoard.kingOfGuest?.guestNum }}</view>
                      </view>
                    </view>
                  </view>
                    <view class="w-full mr-4 king-item">
                      <view class="font-bold text-white text-base text-center h-[62rpx] leading-[62rpx] relative">
                        <text class="absolute title">走访王</text>
                        <image src="/static/images/bg-king-title.jpg" class="absolute w-full left-0" mode="widthFix" />
                      </view>
                      <view class="p-2 flex item-center">
                        <image mode="aspectFill" class="w-10.5 h-10.5 rounded-1/2" :src="honorBoard.kingOfVisit?.mainImg">
                        </image>
                        <view class="ml-2 flex flex-col">
                          <view class="flex-1">{{ honorBoard?.kingOfVisit ? honorBoard.kingOfVisit?.name : '虚位以待' }}
                          </view>
                          <view v-if="honorBoard?.kingOfVisit" class="flex-1 text-xs break-all">走访数量：{{
                            honorBoard.kingOfVisit?.visitNum }}</view>
                        </view>
                      </view>
                    </view>
                  </view>

                  <view
                    v-if="!honorBoard?.kingOfRecommender && !honorBoard?.kingOfRecommendMoney && !honorBoard?.kingOfGuest && !honorBoard?.kingOfVisit"
                    class="text-center text-repeat-79">
                    暂无数据</view>
                  <view v-if="presentPerson?.goldenList && presentPerson?.goldenList.length > 0"
                    class="mt-[52rpx] flex item-center">
                    <image class="w-6" src="/static/images/icon-gold.png" mode="widthFix" />
                    <view class="flex-1 pl-2 rounded-[54rpx] leading-[54rpx] text-[#D39822] text-base font-bold"
                      style="background: linear-gradient(-90deg, rgba(244,204,110,0), rgba(208,147,27,0.15));">全勤金奖</view>
                  </view>
                  <view class="flex flex-wrap ml-2.75">
                    <view v-for="(item, index) in presentPerson?.goldenList" :key="index"
                      class="flex items-center mt-[30rpx] w-[33.33%]">
                      <image mode="aspectFill" class="w-[68rpx] h-[68rpx] rounded-1/2" :src="item?.avatar">
                      </image>
                      <view class="ml-2">{{ item?.name }}</view>
                    </view>
                  </view>
                  <view v-if="presentPerson?.silverList && presentPerson?.silverList.length > 0"
                    class="mt-6 flex item-center">
                    <image class="w-6" src="/static/images/icon-silver.png" mode="widthFix" />
                    <view class="flex-1 pl-2 rounded-[54rpx] leading-[54rpx] text-[#9E9E9E] text-base font-bold"
                      style="background: linear-gradient(-90deg, rgba(186,186,186,0), rgba(157,157,157,0.15));">全勤银奖
                    </view>
                  </view>
                  <view class="flex flex-wrap ml-2.75">
                    <view v-for="(item, index) in presentPerson?.silverList" :key="index"
                      class="flex items-center mt-[30rpx] w-[33.33%]">
                      <image mode="aspectFill" class="w-[68rpx] h-[68rpx] rounded-1/2" :src="item?.avatar">
                      </image>
                      <view class="ml-2">{{ item?.name }}</view>
                    </view>
                  </view>
                  <view v-if="presentPerson?.gronzeList && presentPerson?.gronzeList.length > 0"
                    class="mt-6 flex item-center">
                    <image class="w-6" src="/static/images/icon-bronze.png" mode="widthFix" />
                    <view class="flex-1 pl-2 rounded-[54rpx] leading-[54rpx] text-[#8A5D46] text-base font-bold"
                      style="background: linear-gradient(-90deg, rgba(178,129,115,0), rgba(138,93,69,0.15));">全勤铜奖</view>
                  </view>
                  <view class="flex flex-wrap ml-2.75">
                    <view v-for="(item, index) in presentPerson?.gronzeList" :key="index"
                      class="flex items-center mt-[30rpx] w-[33.33%]">
                      <image mode="aspectFill" class="w-[68rpx] h-[68rpx] rounded-1/2" :src="item?.avatar">
                      </image>
                      <view class="ml-2">{{ item?.name }}</view>
                    </view>
                  </view>
                </view>

                <!-- 功勋会员榜 -->
                <view class="p-4 border-solid border-t-[1rpx] border-[#F8F8F8]">
                  <view class="relative flex items-center pl-[22rpx]">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] font-bold">功勋会员榜</view>
                  </view>

                  <view class="flex mt-3 text-center font-bold">
                    <view class="ml-12 w-20">会员姓名</view>
                    <view class="ml-8 w-32">介绍入会人数</view>
                  </view>

                  <view :class="{ 'overflow-hidden max-h-40': hide5 }">
                    <view class="h-8 flex text-center items-center" v-for="(item, index) in nvitePersonBoard"
                      :key="index">
                      <image mode="aspectFill" class="w-[68rpx] h-[68rpx] rounded-1/2" :src="item?.mainImg">
                      </image>
                      <view class="ml-6.5 w-20 text-[#666]">{{ item?.name }}</view>
                      <view class="w-32 ml-8 text-[#666]">{{ item?.invitePersonNum }}</view>
                    </view>
                  </view>
                  <view v-if="nvitePersonBoard && nvitePersonBoard?.length > 5" class="text-center py-2"
                    @tap="hide5 = !hide5">
                    {{ hide5 ? '展开全部 ∨' : "收起全部 ∧" }}</view>
                </view>

                <!-- 综合得分榜 -->
                <view class="p-4 border-solid border-t-[1rpx] border-[#F8F8F8]"
                  v-if="memberStore.profile && memberStore.profile.userInfo.status != 0 && memberStore.profile.userInfo.status != 1 && memberStore.profile.userInfo.status != 2 && memberStore.profile.userInfo.status != 3">
                  <view class="relative flex items-center pl-[22rpx] mt-6">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] font-bold">综合得分榜</view>
                  </view>

                  <view class="my-2">
                    <slider-tab v-model="curValue1" :tabs="tabs" @change="onChange1">

                      <template #="{ active, tab, index }">
                        <view :class="['h-12.5 text-[26rpx] flex items-center relative justify-center', {
                          'text-[30rpx]': active,
                          'text-[#666]': !active,
                          'font-bold': active,
                          'mr-4': index !== tabs.length - 1
                        }]">
                          {{ tab?.year.toString().substring(2, 4) }}年{{ tab?.month }}月
                          <view v-if="active" class="bg-[#92003F] w-[30rpx] h-0.75 absolute bottom-2"></view>
                        </view>
                      </template>
                    </slider-tab>
                  </view>

                  <view class="flex mt-3 mb-2 text-center font-bold">
                    <view class="w-10">姓名</view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 1 ? -1 : 1)">
                      总分<text class="sort_icon" :class="{ 'sort_desc': sort1 == 1, 'sort_asc': sort1 == -1 }"></text>
                    </view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 2 ? -2 : 2)">
                      引荐<text class="sort_icon" :class="{ 'sort_desc': sort1 == 2, 'sort_asc': sort1 == -2 }"></text>
                    </view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 3 ? -3 : 3)">
                      嘉宾<text class="sort_icon" :class="{ 'sort_desc': sort1 == 3, 'sort_asc': sort1 == -3 }"></text>
                    </view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 4 ? -4 : 4)">
                      走访<text class="sort_icon" :class="{ 'sort_desc': sort1 == 4, 'sort_asc': sort1 == -4 }"></text>
                    </view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 5 ? -5 : 5)">
                      出勤<text class="sort_icon" :class="{ 'sort_desc': sort1 == 5, 'sort_asc': sort1 == -5 }"></text>
                    </view>
                    <view class="flex-1" @tap="averageBoardSort(sort1 == 6 ? -6 : 6)">
                      金额<text class="sort_icon" :class="{ 'sort_desc': sort1 == 6, 'sort_asc': sort1 == -6 }"></text>
                    </view>
                  </view>
                  <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide }">
                    <view class="h-8 flex text-center items-center text-[#666]" v-for="(item, index) in averageBoard"
                      :key="index">
                      <view class="w-10 text-justify font-bold">
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
                  <view v-if="averageBoard && averageBoard?.length > 5" class="text-center text-xs text-[#333] py-2"
                    @tap="hide = !hide">
                    {{ hide ? '展开全部' : "收起全部" }}<uni-icons :type="hide ? 'bottom' : 'top'" color="#999"></uni-icons>
                  </view>

                  <!-- 给出引荐数量实时排行榜 -->
                  <view class="relative flex items-center pl-[22rpx] mt-6 mb-7">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] flex-1 font-bold">给出引荐数量实时排行榜</view>
                    <uni-data-select :clear="false" v-model="value1" :localdata="range1"
                      @change="onChange2"></uni-data-select>
                  </view>

                  <view class="flex mb-2 text-center">
                    <view class="w-10">姓名</view>
                    <view class="flex-1" @tap="recommandBoardSort(sort2 == 1 ? -1 : 1)"
                      :class="{ 'font-bold': sort2 == 1 || sort2 == -1 }">
                      总引荐<text class="sort_icon" :class="{ 'sort_desc': sort2 == 1, 'sort_asc': sort2 == -1 }"></text>
                    </view>
                    <view class="flex-1" @tap="recommandBoardSort(sort2 == 2 ? -2 : 2)"
                      :class="{ 'font-bold': sort2 == 2 || sort2 == -2 }">
                      外部引荐数<text class="sort_icon" :class="{ 'sort_desc': sort2 == 2, 'sort_asc': sort2 == -2 }"></text>
                    </view>
                    <view class="flex-1" @tap="recommandBoardSort(sort2 == 3 ? -3 : 3)"
                      :class="{ 'font-bold': sort2 == 3 || sort2 == -3 }">
                      内部引荐数<text class="sort_icon" :class="{ 'sort_desc': sort2 == 3, 'sort_asc': sort2 == -3 }"></text>
                    </view>
                  </view>
                  <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide1 }">
                    <view class="h-8 flex text-center items-center text-[#666]" v-for="(item, index) in recommandBoard"
                      :key="index">
                      <view class="w-10 text-justify font-bold">
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
                  <view v-if="recommandBoard && recommandBoard?.length > 5" class="text-center text-xs text-[#333] py-2"
                    @tap="hide1 = !hide1">
                    {{ hide1 ? '展开全部' : "收起全部" }}<uni-icons :type="hide1 ? 'bottom' : 'top'" color="#999"></uni-icons>
                  </view>

                  <!-- 给出引荐金额实时排行榜 -->
                  <view class="relative flex items-center pl-[22rpx] mt-6 mb-7">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] flex-1 font-bold">给出引荐金额实时排行榜</view>
                    <uni-data-select :clear="false" v-model="value2" :localdata="range1"
                      @change="onChange3"></uni-data-select>
                  </view>
                  <view class="flex mb-2 text-center">
                    <view class="w-10">姓名</view>
                    <view class="flex-1" @tap="recommandMoneyBoardSort(sort3 == 1 ? -1 : 1)"
                      :class="{ 'font-bold': sort3 == 1 || sort3 == -1 }">
                      总成交金额<text class="sort_icon" :class="{ 'sort_desc': sort3 == 1, 'sort_asc': sort3 == -1 }"></text>
                    </view>
                    <view class="flex-1" @tap="recommandMoneyBoardSort(sort3 == 2 ? -2 : 2)"
                      :class="{ 'font-bold': sort3 == 2 || sort3 == -2 }">
                      外部成交金额<text class="sort_icon" :class="{ 'sort_desc': sort3 == 2, 'sort_asc': sort3 == -2 }"></text>
                    </view>
                    <view class="flex-1" @tap="recommandMoneyBoardSort(sort3 == 3 ? -3 : 3)"
                      :class="{ 'font-bold': sort3 == 3 || sort3 == -3 }">
                      内部成交金额<text class="sort_icon" :class="{ 'sort_desc': sort3 == 3, 'sort_asc': sort3 == -3 }"></text>
                    </view>
                  </view>
                  <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide2 }">
                    <view class="h-8 flex text-center items-center text-[#666]"
                      v-for="(item, index) in recommandMoneyBoard" :key="index">
                      <view class="w-10 text-justify font-bold">
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
                  <view v-if="recommandMoneyBoard && recommandMoneyBoard?.length > 5"
                    class="text-center text-xs text-[#333] py-2" @tap="hide2 = !hide2">
                    {{ hide2 ? '展开全部' : "收起全部" }}<uni-icons :type="hide2 ? 'bottom' : 'top'" color="#999"></uni-icons>
                  </view>

                  <!-- 邀约嘉宾排行榜 -->
                  <view class="relative flex items-center pl-[22rpx] mt-6 mb-7">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] flex-1 font-bold">邀约嘉宾排行榜</view>
                    <uni-data-select :clear="false" v-model="value3" :localdata="range1"
                      @change="onChange4"></uni-data-select>
                  </view>
                  <view class="flex mb-2 text-center">
                    <view class="w-10">姓名</view>
                    <view class="w-16 ml-12">嘉宾数</view>
                  </view>
                  <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide3 }">
                    <view class="h-8 flex text-center items-center text-[#666]" v-for="(item, index) in inviteGuestBoard"
                      :key="index">
                      <view class="w-10 text-justify font-bold">
                        {{ item?.name }}
                      </view>
                      <view class="w-16 ml-12">
                        {{ item?.guestNum || 0 }}
                      </view>
                    </view>
                  </view>
                  <view v-if="inviteGuestBoard && inviteGuestBoard?.length > 5"
                    class="text-center text-xs text-[#333] py-2" @tap="hide3 = !hide3">
                    {{ hide3 ? '展开全部' : "收起全部" }}<uni-icons :type="hide3 ? 'bottom' : 'top'" color="#999"></uni-icons>
                  </view>

                  <!-- 走访实时排行榜 -->
                  <view class="relative flex items-center pl-[22rpx] mt-6 mb-7">
                    <view class="bg-[#92003F] w-0.75 h-4 absolute left-0"></view>
                    <view class="text-[#92003F] text-[40rpx] flex-1 font-bold">走访实时排行榜</view>
                    <uni-data-select :clear="false" v-model="value4" :localdata="range1"
                      @change="onChange5"></uni-data-select>
                  </view>
                  <view class="flex mb-2 text-center">
                    <view class="w-10">姓名</view>
                    <view class="flex-1" @tap="visitBoardSort(sort4 == 1 ? -1 : 1)"
                      :class="{ 'font-bold': sort4 == 1 || sort4 == -1 }">
                      总走访<text class="sort_icon" :class="{ 'sort_desc': sort4 == 1, 'sort_asc': sort4 == -1 }"></text>
                    </view>
                    <view class="flex-1" @tap="visitBoardSort(sort4 == 2 ? -2 : 2)"
                      :class="{ 'font-bold': sort4 == 2 || sort4 == -2 }">
                      点对点走访<text class="sort_icon" :class="{ 'sort_desc': sort4 == 2, 'sort_asc': sort4 == -2 }"></text>
                    </view>
                    <view class="flex-1" @tap="visitBoardSort(sort4 == 3 ? -3 : 3)"
                      :class="{ 'font-bold': sort4 == 3 || sort4 == -3 }">
                      内组织走访<text class="sort_icon" :class="{ 'sort_desc': sort4 == 3, 'sort_asc': sort4 == -3 }"></text>
                    </view>
                  </view>
                  <view class="text-xs" :class="{ 'overflow-hidden max-h-40': hide4 }">
                    <view class="h-8 flex text-center items-center text-[#666]" v-for="(item, index) in visitBoard"
                      :key="index">
                      <view class="w-10 text-justify font-bold">
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
                  <view v-if="visitBoard && visitBoard?.length > 5" class="text-center text-xs text-[#333] py-2"
                    @tap="hide4 = !hide4">
                    {{ hide4 ? '展开全部' : "收起全部" }}<uni-icons :type="hide4 ? 'bottom' : 'top'" color="#999"></uni-icons>
                  </view>
                </view>
      </scroll-view>
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
import SystemStore from '@/utils/uniapp/system'
import { storeToRefs } from 'pinia'
const { statusBar, customBar } = storeToRefs(SystemStore())

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
  sort1.value = s // 正数降序 负数升序
  if (averageBoard.value && averageBoard.value.length > 0) {
    if (sort1.value == 1) {
      averageBoard.value.sort((a: any, b: any) => b.score - a.score)
    } else if (sort1.value == -1) {
      averageBoard.value.sort((a: any, b: any) => a.score - b.score)
    } else if (sort1.value == 2) {
      averageBoard.value.sort((a: any, b: any) => b.recommenderNum - a.recommenderNum)
    } else if (sort1.value == -2) {
      averageBoard.value.sort((a: any, b: any) => a.recommenderNum - b.recommenderNum)
    } else if (sort1.value == 3) {
      averageBoard.value.sort((a: any, b: any) => b.guestNum - a.guestNum)
    } else if (sort1.value == -3) {
      averageBoard.value.sort((a: any, b: any) => a.guestNum - b.guestNum)
    } else if (sort1.value == 4) {
      averageBoard.value.sort((a: any, b: any) => b.visitNum - a.visitNum)
    } else if (sort1.value == -4) {
      averageBoard.value.sort((a: any, b: any) => a.visitNum - b.visitNum)
    } else if (sort1.value == 5) {
      averageBoard.value.sort((a: any, b: any) => b.presentNum - a.presentNum)
    } else if (sort1.value == -5) {
      averageBoard.value.sort((a: any, b: any) => a.presentNum - b.presentNum)
    } else if (sort1.value == 6) {
      averageBoard.value.sort((a: any, b: any) => b.money - a.money)
    } else {
      averageBoard.value.sort((a: any, b: any) => a.money - b.money)
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
    } else if (sort2.value == -1) {
      recommandBoard.value.sort((a: any, b: any) => a.recommendNum - b.recommendNum)
    } else if (sort2.value == 2) {
      recommandBoard.value.sort((a: any, b: any) => b.outerRecommendNum - a.outerRecommendNum)
    } else if (sort2.value == -2) {
      recommandBoard.value.sort((a: any, b: any) => a.outerRecommendNum - b.outerRecommendNum)
    } else if (sort2.value == 3) {
      recommandBoard.value.sort((a: any, b: any) => b.innerRecommendNum - a.innerRecommendNum)
    } else {
      recommandBoard.value.sort((a: any, b: any) => a.innerRecommendNum - b.innerRecommendNum)
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
    } else if (sort3.value == -1) {
      recommandMoneyBoard.value.sort((a: any, b: any) => a.harvestedMoney - b.harvestedMoney)
    } else if (sort3.value == 2) {
      recommandMoneyBoard.value.sort((a: any, b: any) => b.outerHarvestedMoney - a.outerHarvestedMoney)
    } else if (sort3.value == -2) {
      recommandMoneyBoard.value.sort((a: any, b: any) => a.outerHarvestedMoney - b.outerHarvestedMoney)
    } else if (sort3.value == 3) {
      recommandMoneyBoard.value.sort((a: any, b: any) => b.innerHarvestedMoney - a.innerHarvestedMoney)
    } else {
      recommandMoneyBoard.value.sort((a: any, b: any) => a.innerHarvestedMoney - b.innerHarvestedMoney)
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
    } else if (sort4.value == -1) {
      visitBoard.value.sort((a: any, b: any) => a.visitNum - b.visitNum)
    } else if (sort4.value == 2) {
      visitBoard.value.sort((a: any, b: any) => b.pointToPointNum - a.pointToPointNum)
    } else if (sort4.value == -2) {
      visitBoard.value.sort((a: any, b: any) => a.pointToPointNum - b.pointToPointNum)
    } else if (sort4.value == 3) {
      visitBoard.value.sort((a: any, b: any) => b.organizeNum - a.organizeNum)
    } else {
      visitBoard.value.sort((a: any, b: any) => a.organizeNum - b.organizeNum)
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
    value.value = range.value[0].value
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

<style lang="scss">
.king-item {
  background: linear-gradient(135deg, #FFFCF0, #FFF4DE);
  border-radius: 16rpx;
  color: #5C3B12;
  overflow: hidden;

  .title {
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
  }
}

::v-deep .uni-select {
  border-radius: 9999rpx !important;
  background-color: #fff5f9 !important;
  height: 44rpx !important;
  font-size: 24rpx !important;
  display: flex !important;
  align-items: center !important;
  border: 0 !important;
}

::v-deep .uni-select__input-text,
::v-deep .uni-select .uni-icons {
  color: #92003f !important;
}

::v-deep .uni-collapse-item__title {
  border-bottom: 2rpx solid #F8F8F8;
}

::v-deep .uni-select__selector-item {
  font-size: 24rpx !important;
}

.sort_icon {
  position: relative;
  margin-left: 4rpx;

  &:before {
    content: "";
    position: absolute;
    top: 6rpx;
    border: 8rpx solid;
    border-color: #D8D8D8;
    border-top-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 2rpx;
    border: 8rpx solid;
    border-color: #D8D8D8;
    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;
  }
}

.sort_desc {
  &:after {
    border-color: #8C8C8C;
    border-bottom-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
  }
}

.sort_asc {
  &:before {
    border-color: #8C8C8C;
    border-top-color: transparent !important;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
  }
}</style>
