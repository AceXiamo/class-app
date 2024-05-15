<template>
  <view
    :id="`${canvasId}-crooper`"
    ref="niceCropper"
    class="nice-cropper relative w-full h-full bg-black overflow-hidden"
    :style="{
      height: typeof height === 'string' ? height : `${height}px`,
      width: typeof width === 'string' ? width : `${width}px`,
      background: background
    }"
    @touchstart="start"
    @touchmove.stop="move"
    @touchcancel="end"
    @touchend="end"
  >
    <image
      class="absolute left-0 top-0 origin-center"
      :src="src"
      :style="{
        transform: transformMeta, 
        width: image.width + 'px', 
        height: image.height + 'px'
      }"
    />
    <view
      class="absolute border border-white shadow-inner"
      :class="[
        showCtrlBorder ? 'border-solid' : 'border-dotted'
      ]"
      :style="ctrlStyle"
    >
      <view
        class="absolute bg-repeat-ef opacity-50 h-full w-0.125 left-1/3"
      />
      <view
        class="absolute bg-repeat-ef opacity-50 h-full w-0.125 left-2/3"
      />
      <view
        class="absolute bg-repeat-ef opacity-50 w-full h-0.125 top-1/3"
      />
      <view
        class="absolute bg-repeat-ef opacity-50 w-full h-0.125 top-2/3"
      />
      <view
        class="absolute w-3.75 h-3.75 left-0 top-0 border-0 border-t-2 border-l-2 border-solid border-white"
        :class="{
          'bg-transparent': hideCropper
        }"
        @touchstart="setCutMode(DirectionType.lt)"
      >
        <view class="absolute -left-1.25 -top-1.25 -right-1.25 -bottom-1.25" />
      </view>
      <view
        class="absolute w-3.75 h-3.75 right-0 top-0 border-0 border-t-2 border-r-2 border-solid border-white"
        :class="{
          'bg-transparent': hideCropper
        }"
        @touchstart="setCutMode(DirectionType.rt)"
      >
        <view class="absolute -left-1.25 -top-1.25 -right-1.25 -bottom-1.25" />
      </view>
      <view
        class="absolute w-3.75 h-3.75 right-0 bottom-0 border-0 border-b-2 border-r-2 border-solid border-white"
        :class="{
          'bg-transparent': hideCropper
        }"
        @touchstart="setCutMode(DirectionType.rb)"
      >
        <view class="absolute -left-1.25 -top-1.25 -right-1.25 -bottom-1.25" />
      </view>
      <view
        class="absolute w-3.75 h-3.75 left-0 bottom-0 border-0 border-b-2 border-l-2 border-solid border-white"
        :class="{
          'bg-transparent': hideCropper
        }"
        @touchstart="setCutMode(DirectionType.lb)"
      >
        <view class="absolute -left-1.25 -top-1.25 -right-1.25 -bottom-1.25" />
      </view>
    </view>
    <canvas
      v-if="canvasReady"
      :id="canvasId"
      :canvas-id="canvasId"
      style="position: absolute;left:-500000px;top: -500000px"
      :style="{width: ctrlWidth * canvasZoom+'px', height: ctrlHeight * canvasZoom + 'px'}"
    />
  </view>
</template>

<script lang="ts">
export default {
  name: 'ImageCropper'
}
</script>

<script lang="ts" setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue';

import cropperUtils from './cropper';

enum DirectionType {
  'lt' = 'lt',
  'rt' = 'rt',
  'lb' = 'lb',
  'rb' = 'rb'
}

type TMeta = {
  zoom: number;
  deltaX: number;
  deltaY: number;
  diffX: number;
  diffY: number;
  angle: number;
}

type TTransform = {
  angle: number,
  translate: {
      x: number,
      y: number
  },
  zoom: number
}

interface IProps {
  src: string
  width?: string | number
  height?: string | number
  cutWidth?: string | number
  cutHeight?: string | number
  cutRatio?: number
  minWidth?: number
  minHeight?: number
  center?: boolean
  disableScale?: boolean
  disableRotate?: boolean
  disableTranslate?: boolean
  // disable to resize the cutter
  disableCtrl?: boolean
  // open boundary detection
  boundDetect?: boolean
  freeBoundDetect?: boolean
  // keep the ratio of the cutter
  keepRatio?: boolean
  // disable preview after cutting
  disablePreview?: boolean
  // show cutter border
  showCtrlBorder?: boolean
  // reset cut while img change
  resetCut?: boolean
  fit?: boolean
  // auto center/middle for image
  imageCenter?: boolean
  // can not be Infinity in baidu-MiniProgram
  // maximum scaling factor
  maxZoom?: number
  // minimum scaling factor
  minZoom?: number
  // initial angle of rotation
  angle?: number
  // initial scaling factor
  zoom?: number
  // initial offset relative to the cutter left border
  offset?: Array<number>;
  background?: string
  // background for the exported image
  canvasBackground?: string
  canvasZoom?: number
  fileType?: 'png'|'jpg'
  quality?: number
  maskType?: 'shadow' | 'outline'
  circleView?: boolean
  hideCropper?: boolean
  cropperSvgImg?: string
}

const props = withDefaults(defineProps<IProps>(), {
  width: '100%',
  height: '100%',
  cutWidth: '80%',
  cutHeight: 0,
  cutRatio: 1,
  minWidth: 50,
  minHeight: 50,
  center: true,
  disableScale: false,
  disableRotate: true,
  disableTranslate: true,
  disableCtrl: false,
  boundDetect: false,
  freeBoundDetect: false,
  keepRatio: false,
  disablePreview: false,
  showCtrlBorder: true,
  resetCut: false,
  fit: true,
  imageCenter: true,
  maxZoom: 10,
  minZoom: 0,
  angle: 0,
  zoom: 1,
  offset: () => [0, 0],
  background: '#000',
  canvasBackground: '#fff',
  canvasZoom: 1,
  fileType: 'png',
  quality: 1,
  maskType: 'shadow',
  circleView: false,
  hideCropper: false,
  cropperSvgImg: ''
});

const emits = defineEmits(['doubleTap', 'beforeDraw','afterDraw','cropped','load','error']);

const transform = ref<TTransform>({
  angle: 0,
  translate: {
    x: 0,
    y: 0
  },
  zoom: 1
});

const corner = ref({
  left: 50,
  right: 50,
  bottom: 50,
  top: 50
});

const image = ref({
  originWidth: 0,
  originHeight: 0,
  width: 0,
  height: 0
});

const img = ref('');

const ctrlWidth = ref(0);
const ctrlHeight = ref(0);
const view = ref(false);
const canvasId = ref('');
const ratio = ref(1);
const curCutRatio = ref(1);
const windowHeight = ref(0);
const windowWidth = ref(0);
const containerWidth = ref(360);
const containerHeight = ref(746);

// 初始化参数
const pretouch = ref({
  startX: 0,
  startY: 0,
  time: 0
});
const touch = ref({
  startX: 0,
  startY: 0,
  startTime: 0
});
const handles = ref({});
const preVector = ref({
  x: 0,
  y: 0
});
const distance = ref(30);

const movetouch = ref({
  x: 0,
  y: 0
})
const cutMode = ref(false);
const params = ref<TMeta>({
  zoom: 1,
  deltaX: 0,
  deltaY: 0,
  diffX: 0,
  diffY: 0,
  angle: 0
});

const previewTimer = ref<NodeJS.Timeout|null>(null);
const doubleTap = ref(false);
const startDistance = ref(0);
const cutDirection = ref<DirectionType|null>(null);
const canvasReady = ref(false);

const transformMeta = computed(() =>{
  return `translate3d(${transform.value.translate.x}px, ${transform.value.translate.y}px, 0) rotate(${transform.value.angle}deg) scale(${transform.value.zoom})`;
});

const ctrlStyle = computed(() => {
  let cssStr = `left: ${corner.value.left}px;top: ${corner.value.top}px;right: ${corner.value.right}px;bottom: ${corner.value.bottom}px;`
  if (props.maskType !== 'outline') {
    cssStr += `box-shadow: 0 0 0 50000rpx rgba(0,0,0, ${view.value ? 0.8 : 0.4});`
  } else {
    cssStr += `outline: rgba(0,0,0, ${view.value ? 0.8 : 0.4}) solid 5000px;`
  }
  return cssStr
})

const init = () => {
  pretouch.value = {
    startX: 0,
    startY: 0,
    time: 0
  }
  handles.value = {}
  preVector.value = {
    x: 0,
    y: 0
  }
  distance.value = 30
  touch.value = {
    startX: 0,
    startY: 0,
    startTime: 0
  }
  movetouch.value = {
    x: 0,
    y: 0
  }
  cutMode.value = false
  params.value = {
    zoom: 1,
    deltaX: 0,
    deltaY: 0,
    diffX: 0,
    diffY: 0,
    angle: 0
  }
}

const preview = () => {
  if (previewTimer.value) {
    clearTimeout(previewTimer.value);
    previewTimer.value = null;
  }
  previewTimer.value = setTimeout(() => {
    view.value = true
  }, 500)
}

const saveToCroper = (transform:TTransform, canvasZoom:number, zoom:number) => {
  nextTick(() => {
    uni.canvasToTempFilePath({
      canvasId: canvasId.value,
      quality: props.quality,
      fileType: props.fileType,
      success: (res) => {
        let path = res.tempFilePath;
        // #ifdef H5
        path = cropperUtils.dataURItoBlob(path);
        // #endif
        emits('cropped', path, {
          originWidth: image.value.originWidth,
          originHeight: image.value.originHeight,
          width: ctrlWidth.value * canvasZoom,
          height: ctrlHeight.value * canvasZoom,
          scale: zoom,
          translate: {
            x: transform.translate.x,
            y: transform.translate.y
          },
          rotate: transform.angle
        })
        // draw callback
      },
      fail: () => {
        saveToCroper(transform, canvasZoom, zoom)
      }
    }, instance)
  })
}

const draw = () => {
  let context:UniApp.CanvasContext|null = null
  // #ifdef MP-ALIPAY
  context = uni.createCanvasContext(canvasId.value)
  // #endif
  // #ifndef MP-ALIPAY
  context = uni.createCanvasContext(canvasId.value, instance)
  // #endif

  context.save();
  context.setFillStyle(props.canvasBackground);
  // beforeDraw hook
  emits('beforeDraw', context, transform);
  const zoom = transform.value.zoom
  // clear canvas
  context.fillRect(0, 0, ctrlWidth.value * props.canvasZoom, ctrlHeight.value * props.canvasZoom);
  // translate the canvas's orgin to the image center
  context.translate((transform.value.translate.x - corner.value.left + image.value.width / 2) * props.canvasZoom, (transform.value.translate.y - corner.value.top + image.value.height / 2) * props.canvasZoom);
  context.rotate(transform.value.angle * Math.PI / 180);
  context.translate(-image.value.width * zoom * 0.5 * props.canvasZoom, -image.value.height * zoom * 0.5 * props.canvasZoom);
  context.drawImage(img.value, 0, 0, image.value.width * zoom * props.canvasZoom, image.value.height * zoom * props.canvasZoom);
  context.restore()
  emits('afterDraw', context, {
    width: ctrlWidth.value * props.canvasZoom,
    height: ctrlHeight.value * props.canvasZoom
  }) 
  // afterDraw hook
  context.draw(false, () => {
    saveToCroper(transform.value, props.canvasZoom, zoom)
  })
}

const setCutMode = (type:DirectionType) => {
  if (!props.src) return
  cutMode.value = true
  cutDirection.value = type
}

const setMeta = (direction:DirectionType|null, meta:TMeta) => {
  switch (direction) {
  case DirectionType.lt:
    if (meta.deltaX > 0 || meta.deltaY > 0) {
      meta.deltaX = Math.min(meta.deltaX, ctrlWidth.value - props.minWidth)
      meta.deltaY = Math.min(meta.deltaY, ctrlHeight.value - props.minHeight)
    }
    break
  case DirectionType.rt:
    if (meta.deltaX < 0 || meta.deltaY > 0) {
      meta.deltaX = Math.max(meta.deltaX, props.minWidth - ctrlWidth.value)
      meta.deltaY = Math.min(meta.deltaY, ctrlHeight.value - props.minHeight)
    }
    break
  case DirectionType.rb:
    if (meta.deltaX < 0 || meta.deltaY < 0) {
      meta.deltaX = Math.max(meta.deltaX, props.minWidth - ctrlWidth.value)
      meta.deltaY = Math.max(meta.deltaY, props.minHeight - ctrlHeight.value)
    }
    break
  case DirectionType.lb:
    if (meta.deltaX > 0 || meta.deltaY < 0) {
      meta.deltaX = Math.min(meta.deltaX, ctrlWidth.value - props.minWidth)
      meta.deltaY = Math.max(meta.deltaY, props.minHeight - ctrlHeight.value)
    }
    break
  }
}

const setCut = () => {
  // correct cutter position
  setMeta(cutDirection.value, params.value);
  if (props.keepRatio) {
    if (cutDirection.value === DirectionType.lt || cutDirection.value === DirectionType.rb) {
      params.value.deltaY = params.value.deltaX * curCutRatio.value;
    } else {
      params.value.deltaX = params.value.deltaY / curCutRatio.value;
    }
  }
  switch (cutDirection.value) {
  case 'lt':
    corner.value.top += params.value.deltaY;
    corner.value.left += params.value.deltaX;
    break
  case 'rt':
    corner.value.top += params.value.deltaY;
    corner.value.right -= props.keepRatio ? -params.value.deltaX : params.value.deltaX;
    break
  case 'rb':
    corner.value.right -= params.value.deltaX;
    corner.value.bottom -= params.value.deltaY;
    break
  case 'lb':
    corner.value.bottom -= params.value.deltaY;
    corner.value.left += props.keepRatio ? -params.value.deltaX : params.value.deltaX;
    break
  }
  ctrlWidth.value = containerWidth.value - corner.value.left - corner.value.right;
  ctrlHeight.value = containerHeight.value - corner.value.top - corner.value.bottom;
}

const pinch = () => {
  transform.value.zoom *= params.value.zoom;
}

const rotate = () => {
  transform.value.angle += params.value.angle;
}

const translate = () => {
  transform.value.translate.x += params.value.deltaX
  transform.value.translate.y += params.value.deltaY
}

const setBoundary = () => {
  let zoom = transform.value.zoom;
  zoom = zoom < props.minZoom ? props.minZoom : (
    zoom > props.maxZoom ? 
      props.maxZoom :
      zoom
  );
  transform.value.zoom = zoom;
  if ((!props.boundDetect || !props.disableRotate) && !props.freeBoundDetect) {
    return true;
  }
  const translate = transform.value.translate;
  const minX = corner.value.left - image.value.width + ctrlWidth.value - image.value.width * (zoom - 1) / 2
  const maxX = corner.value.left + image.value.width * (zoom - 1) / 2
  const minY = corner.value.top - image.value.height + ctrlHeight.value - image.value.height * (zoom - 1) / 2
  const maxY = corner.value.top + image.value.height * (zoom - 1) / 2
  translate.x = Math.floor(translate.x < minX ? minX : (translate.x > maxX ? maxX : translate.x))
  translate.y = Math.floor(translate.y < minY ? minY : (translate.y > maxY ? maxY : translate.y))
}


const start = (e:any) => {
  if (!props.src) e.preventDefault()
  const point:Touch = e.touches ? e.touches[0] : {
    pageX: e.pageX || 0,
    pageY: e.pageY || 0
  }

  const now = Date.now()
  touch.value.startX = point.pageX
  touch.value.startY = point.pageY
  touch.value.startTime = now
  doubleTap.value = false
  view.value = false
  if (previewTimer.value) {
    clearTimeout(previewTimer.value)
    previewTimer.value = null
  }
  if (e.touches.length > 1) {
    const point2 = e.touches[1]
    preVector.value = {
      x: point2.pageX - touch.value.startX,
      y: point2.pageY - touch.value.startY
    }
    startDistance.value = cropperUtils.calcLen(preVector.value);
  } else {
    doubleTap.value = !!pretouch.value.time && now - pretouch.value.time < 300 && Math.abs(touch.value.startX - pretouch.value.startX) < 30 && Math.abs(touch.value.startY - pretouch.value.startY) < 30 && Math.abs(touch.value.startTime - pretouch.value.time) < 300
    // reserve the last touch
    pretouch.value = { 
      startX: touch.value.startX,
      startY: touch.value.startY,
      time: touch.value.startTime
    };
  }
}

const move = (e:any) => {
  if (!props.src) return
  const point:Touch = e.touches ? e.touches[0] : {
    pageX: e.pageX || 0,
    pageY: e.pageY || 0
  }
  // multi touch
  if (e.touches.length > 1) { 
    const point2 = e.touches[1]
    const v = {
      x: point2.pageX - point.pageX,
      y: point2.pageY - point.pageY
    }

    if (preVector.value.x !== null) {
      if (startDistance.value) { // zoom
        const len = cropperUtils.calcLen(v)
        params.value.zoom = cropperUtils.calcLen(v) / startDistance.value
        startDistance.value = len
        cutMode.value && !props.disableCtrl ? setCut() : !props.disableScale && pinch()
      }
      // rotate
      params.value.angle = cropperUtils.calcAngle(v, preVector.value)
      cutMode.value && !props.disableCtrl ? setCut() : !props.disableRotate && rotate()
    }
    preVector.value.x = v.x;
    preVector.value.y = v.y;
  } else { // translate
    const diffX = point.pageX - touch.value.startX;
    const diffY = point.pageY - touch.value.startY;
    params.value.diffY = diffY;
    params.value.diffX = diffX;
    if (movetouch.value.x) {
      params.value.deltaX = point.pageX - movetouch.value.x
      params.value.deltaY = point.pageY - movetouch.value.y
    } else {
      params.value.deltaX = params.value.deltaY = 0;
    }
    if (Math.abs(diffX) > 30 || Math.abs(diffY) > 30) {
      doubleTap.value = false
    }
    cutMode.value && !props.disableCtrl ? setCut() : !props.disableTranslate && translate()
    movetouch.value.x = point.pageX
    movetouch.value.y = point.pageY
  }
  !cutMode.value && setBoundary()
  if (e.touches.length > 1) {
    e.preventDefault()
  }
}

const end = () => {
  doubleTap.value && emits('doubleTap')
  cutMode.value && setBoundary()
  init()
  !props.disablePreview && preview()
  draw()
}

// 将各类表示长度数据转化为像素单位
const toPx = (str:string|number) => {
  str = str.toString();
  if (str.indexOf('%') !== -1) {
    return Math.floor(Number(str.replace('%', '')) / 100 * containerWidth.value);
  }
  if (str.indexOf('rpx') !== -1) {
    return Math.floor(Number(str.replace('rpx', '')) * ratio.value);
  }
  return Math.floor(Number(str.replace('px', '')));
}

// init size and position of the cutter
const resetCutReact = () => {
  ctrlWidth.value = Math.min(toPx(props.cutWidth), containerWidth.value * 0.95);
  if (props.cutHeight) {
    ctrlHeight.value = Math.min(toPx(props.cutHeight), containerHeight.value);
  } else if(props.cutRatio) {
    ctrlHeight.value = Math.min(ctrlWidth.value, parseInt((ctrlWidth.value * props.cutRatio).toString()));
  } else { // 默认为正方形
    ctrlHeight.value = Math.min(ctrlWidth.value, containerHeight.value);
  }
  const cornerStartX = props.center ? Math.floor((containerWidth.value - ctrlWidth.value) / 2) : 0;
  const cornerStartY = props.center ? Math.floor((containerHeight.value - ctrlHeight.value) / 2) : 0;
  curCutRatio.value = ctrlHeight.value / ctrlWidth.value;
  corner.value = {
    left: cornerStartX,
    right: containerWidth.value - ctrlWidth.value - cornerStartX,
    top: cornerStartY,
    bottom: containerHeight.value - ctrlHeight.value - cornerStartY
  }
}

// get Imageinfo by uni api
const getImageInfo = (src:string):Promise<UniApp.GetImageInfoSuccessData> => {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src,
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

const setTranslate = (offset:number[]) => {
  if (Array.isArray(offset)) {
    const x = Number(offset[0])
    const y = Number(offset[1])
    transform.value.translate.x = Number.isNaN(x) ? transform.value.translate.x : corner.value.left + x
    transform.value.translate.y = Number.isNaN(y) ? transform.value.translate.y : corner.value.top + y
  }
}

const setZoom = (scale:number) => {
  scale = Math.min(Math.max(Number(scale) || 1, props.minZoom), props.maxZoom);
  transform.value.zoom = scale;
}

const initImage = async () => {
  if (!props.src) return
  let res:UniApp.GetImageInfoSuccessData|null = null;
  let err = false;
  try {
    res = await getImageInfo(props.src);
    emits('load', res);
  } catch (e) {
    err = true;
    res = {
      path: props.src,
      width: 1,
      height: 1
    }
    emits('error', e);
  }
  // init image size
  image.value.originWidth = err ? ctrlWidth.value : res?.width || 0;
  image.value.originHeight = err ? ctrlHeight.value : res?.height || 0;

  if(props.fit) {
    let tempWidth = ctrlWidth.value
    let tempHeight = res.height / res.width * ctrlWidth.value
    if(tempHeight < ctrlHeight.value) {
      tempWidth = res.width / res.height * ctrlHeight.value
    }
    image.value.width = err ? ctrlWidth.value : tempWidth;
  } else {
    image.value.width = image.value.originWidth;
  }

  image.value.height = err ? ctrlHeight.value : res?.height / res?.width * image.value.width
  img.value = res.path

  const offset = [0, 0];
  if (props.imageCenter) {
    offset[0] = (ctrlWidth.value - image.value.width) / 2
    offset[1] = (ctrlHeight.value - image.value.height) / 2
  }
  offset[0] += offset[0] || 0
  offset[1] += offset[1] || 0

  setTranslate(offset)
  setZoom(props.zoom)
  transform.value.angle = props.freeBoundDetect || !props.disableRotate ? props.angle : 0

  // boundary detect
  setBoundary();
  // preview
  preview();
  draw();
}

const initCut = () => {
  resetCutReact();
  initImage();
}

const instance = getCurrentInstance();
const initCanvas = async () => {
  let query:UniApp.SelectorQuery|null = null
  // #ifdef MP-ALIPAY
  query = uni.createSelectorQuery()
  // #endif
  // #ifndef MP-ALIPAY
  query = uni.createSelectorQuery().in(instance)
  // #endif
  // get contianer size
  nextTick(() => {
    if (query && query.select('.nice-cropper')) {
      const clientRect = query.select('.nice-cropper').boundingClientRect((res) => {
        if(Array.isArray(res)) {
          res = res[0];
        }
        if(res && res.width && res.height) {
          containerWidth.value = res.width;
          containerHeight.value = res.height;
          initCut();
          canvasReady.value = true;
        }
      })
      clientRect.exec && clientRect.exec();
    }
  });
}

watch(() => props.src, () => {
  if (props.resetCut) {
    resetCutReact();
  }
  nextTick(() => {
    if (!canvasReady.value) {
      initCanvas();
    } else {
      initImage();
    }
  });
});

onMounted(() => {
  canvasId.value = cropperUtils.generateCanvasId();
  const systemInfo = uni.getSystemInfoSync();
  ratio.value = systemInfo.windowWidth / 750;
  windowHeight.value = systemInfo.windowHeight;
  windowWidth.value = systemInfo.windowWidth;
  init();
  initCanvas();
})
</script>
