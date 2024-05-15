/**
 * @file: uniapp, app初始化生命周期钩子
 * @description: 对小程序开始的逻辑进行封装
 * @author: Oneadds
 */
import SystemStore from '@/utils/uniapp/system';

const useApp = () => {

  function updateNetworkStatus(res: { isConnected: boolean }) {
    SystemStore().isConnected = res.isConnected;
  }

  /**
   * @description: 小程序初始化时触发
   */
  function onLaunch() {
    SystemStore().actionSynAppSize();

    SystemStore().refreshToken()
  }

  /**
   * @description: 每次进入程序都会触发
   */
  async function onShow() {
    // 检查并监听网络状态
    uni.getNetworkType({
      success: function (res) {
        if (res.networkType === 'none') {
          SystemStore().isConnected = false;
        } else {
          SystemStore().isConnected = true;
        }
      }
    })
    uni.onNetworkStatusChange(updateNetworkStatus);

  }

  /**
   * @description: 每次离开程序都会触发
   */
  function onHide() {
    uni.offNetworkStatusChange(updateNetworkStatus);
  }

  function onResize() {
    SystemStore().actionSynAppSize();
  }

  return {
    onLaunch,
    onShow,
    onHide,
    onResize
  }

}

export default useApp;