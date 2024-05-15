let debugLevel = true as boolean | string[];

export const setDebugLevel = (level: boolean | string[]) => {
  debugLevel = level;
}

/**
 * 打印log信息,全局配置debug为false时不输出
 */
export const log = (debugLevel !== false ? console.log : () => null);

/**
 * 打印成功信息,全局配置debug为false时不输出
 */
export const success = (debugLevel !== false ? console.log.bind(this, '\x1B[32m%s\x1B[0m') : () => null);

/**
 * 打印错误信息,全局配置debug为false时不输出
 * @param args
 */
export const error = (debugLevel !== false ? console.log.bind(this, '\x1B[31m%s\x1B[0m') : () => null);

/**
 * 打印info信息,全局配置debug为false时不输出
 */
export const info = (debugLevel !== false ? console.info.bind(this, '🐱') : () => null);

/**
 * 模块类型的log, 可以通过配置文件配置是否输出
 * @param module 模块名称，请尽量和模块文件夹名称保持一致
 * @param prefix 可添加前缀
 * @returns 
 */
export const moduleLog = (module: string, prefix?: string) => {
  if (debugLevel === false || Array.isArray(debugLevel)) {
    if (debugLevel === false || debugLevel.indexOf(module) === -1) {
      return {
        log: () => null,
        success: () => null,
        error: () => null,
        info: () => null,
      }
    }
  }
  return {
    log: log.bind(this, `${prefix || ''}[${module}]`),
    success: success.bind(this, `[${prefix || ''}${module}] %s`),
    error: error.bind(this, `[${prefix || ''}${module}] %s`),
    info: info.bind(this, `${prefix || ''}[${module}]`),
  }
}

/**
 * 显示成功信息
 * @param message
 */
export const showSuccess = (message: string) => {
  uni.showToast({
    title: message,
    icon: 'none',
  })
}

/**
 * 显示失败信息
 * @param message 
 */
export const showFail = (message: string) => {
  uni.showToast({
    title: message,
    icon: 'none',
  })
}

/**
 * 处理异常抛出
 * @param error 异常
 * @param needReport 是否需要上报
 */
export const catchErrorHandler = (error: any, options?: {
  needReport?: boolean,
  message?: string
}) => {
  return new Promise((resolve, reject) => {
    let message = '';
    if (Array.isArray(error) && error[0].errorMessage) {
      message = error[0].errorMessage;
    } else {
      message = error && error.message ? error.message : JSON.stringify(error);
    }
    if (options?.needReport) {
      // TODO: 处理服务器错误上传
    }
    uni.showToast({
      title: options?.message || message,
      icon: 'none',
      success: () => {
        resolve(null)
      },
      fail: (e) => {
        reject(e)
      }
    })
  })
}
