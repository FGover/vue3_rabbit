<template>
  <div class="picture">
    <!-- 大图 -->
    <div class="picture1" ref="target">
      <img :src="imgList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图 -->
    <ul class="picture2">
      <li v-for="(img, index) in imgList" :key="index" alt="" :class="index === activeIndex ? 'active' : ''" @mouseenter="enterhandle(index)">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜 -->
    <div
      class="large"
      :style="[
        {
          backgroundImage: `url(${imgList[activeIndex]})`,
          backgroundPositionX: `${positionX}px`,
          backgroundPositionY: `${positionY}px`,
        },
      ]"
      v-show="!isOutside"
    ></div>
  </div>
</template>

<script setup name="imageView">
import { useMouseInElement } from '@vueuse/core'
import { ref, watch } from 'vue'

defineProps({
  imgList: {
    type: Array,
    default: () => [],
  },
})

const activeIndex = ref(0)
const target = ref(null)
// 鼠标在元素内部移动坐标
const left = ref(0)
const top = ref(0)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 放大图的坐标
const positionX = ref(0)
const positionY = ref(0)

const enterhandle = (index) => {
  activeIndex.value = index
}

// 监听鼠标在元素内部移动
watch([elementX, elementY, isOutside], () => {
  if (isOutside.value) return
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  // 处理边界
  if (elementX.value > 300) {
    left.value = 200
  }
  if (elementY.value > 300) {
    top.value = 200
  }
  if (elementX.value < 100) {
    left.value = 0
  }
  if (elementY.value < 100) {
    top.value = 0
  }
  // 控制放大图的显示，大图的移动方向和滑块的相反
  positionX.value = -2 * left.value
  positionY.value = -2 * top.value
})
</script>

<style lang="scss" scoped>
.picture {
  display: flex;
  position: relative;
  width: 480px;
  height: 400px;
  .picture1 {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .picture2 {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    // 放大2倍
    background-size: 800px 800px;
    background-repeat: no-repeat;
    background-color: #f8f8f8;
  }
}
</style>
