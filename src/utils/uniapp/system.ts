import { defineStore } from 'pinia'
import { ref } from 'vue'
import { refresh } from '@/api/user'
import { useMemberStore } from '@/stores'

const systemModule = defineStore('system', () => {
  // 状态栏高度
  const statusBar = ref(0);
  // 自定义导航栏高度
  const customBar = ref(0);
  // 自定义导航栏右侧按钮宽度
  const customEnd = ref(0);
  // 屏幕高度
  const screenHeight = ref(0);
  // 屏幕宽度
  const screenWidth = ref(0);
  // 键盘高度
  const keyHeight = ref(0);
  // 网络连接
  const isConnected = ref(true);
  // 小程序菜单栏高度
  const menuBarHeight = ref(0);
  // 屏幕dpi
  const screenDpi = ref(0);

  /**
   * 刷新令牌
   */
  const memberStore = useMemberStore()
  const refreshToken = async () => {
    if (memberStore.profile) {
      const { data } = await refresh({ refreshToken: memberStore.profile.refreshToken })
      if (data == null) {
        memberStore.clearProfile()
      }
      memberStore.setProfile(data)
    }
  }

  /**
     * 更新网络状态
     * @param res 
     */
  const updateNetworkStatus = (res: { isConnected: boolean }) => {
    isConnected.value = res.isConnected;
  }

  /**
     * 监听网络状态
     */
  const actionOnNetworkStatus = () => {
    uni.getNetworkType({
      success: function (res) {
        if (res.networkType === 'none') {
          isConnected.value = false;
        } else {
          isConnected.value = true;
        }
      }
    });
    uni.onNetworkStatusChange(updateNetworkStatus);
  }

  /**
     * 取消监听网络状态
     */
  const actionOffNetworkStatus = () => {
    uni.offNetworkStatusChange(updateNetworkStatus);
  }

  /**
     * 监听键盘高度变化
     */
  const actionOnKeyboardChange = () => {
    if (uni.onKeyboardHeightChange) {
      uni.onKeyboardHeightChange(res => {
        keyHeight.value = res.height
      })
    }
  }

  /**
     * 计算安全区域高度
     * @param fullScreen 
     * @param hasTopBar 
     * @param hasTabBar 
     * @param tabBarHeight 
     * @param gap 
     * @returns 
     */
  const actionCalcSafeHeight = (
    fullScreen: boolean,
    hasTopBar: boolean,
    hasTabBar = false,
    tabBarHeight = 50,
    gap = 0
  ) => {
    let pageHeight = fullScreen ? screenHeight.value + statusBar.value : screenHeight.value;
    if (hasTopBar) {
      pageHeight -= customBar.value;
    }
    if (hasTabBar) {
      pageHeight -= tabBarHeight;
    }
    return pageHeight - gap;
  }

  const actionSynAppSize = () => {
    uni.getSystemInfo({
      success: (e) => {
        let sysCustomBar = 0;
        let sysCustomEnd = 0;
        let sysMenuBarHeight = 0;
        // #ifndef MP
        if (e.platform === 'android') {
          sysCustomBar = Math.max(e.statusBarHeight || 0, 50);
        } else {
          sysCustomBar = Math.max(e.statusBarHeight || 0, 45);
        }
        // #endif

        // #ifdef MP-WEIXIN
        const custom = uni.getMenuButtonBoundingClientRect();
        sysCustomBar = (custom.top - (e.statusBarHeight || 0)) * 2 + custom.height;
        sysCustomEnd = custom.right - custom.left;
        sysMenuBarHeight = custom.height;
        // #endif

        // #ifdef MP-ALIPAY
        sysCustomBar = sysCustomBar || 0 + (e.titleBarHeight || 0);
        // #endif
        statusBar.value = e.statusBarHeight || 0;
        customEnd.value = sysCustomEnd;
        customBar.value = sysCustomBar;
        screenHeight.value = e.safeArea ? e.safeArea.height : 0;
        screenWidth.value = e.safeArea ? e.safeArea.width : 0;
        keyHeight.value = e.screenHeight - e.windowHeight;
        menuBarHeight.value = sysMenuBarHeight;
        screenDpi.value = 750 / e.screenWidth;
      }
    })
  }

  return {
    isConnected,
    statusBar,
    customBar,
    menuBarHeight,
    customEnd,
    screenHeight,
    screenWidth,
    keyHeight,
    screenDpi,
    actionCalcSafeHeight,
    actionOnNetworkStatus,
    actionOffNetworkStatus,
    actionOnKeyboardChange,
    actionSynAppSize,
    refreshToken
  }
})

export default systemModule;
