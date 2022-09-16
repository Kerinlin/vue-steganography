<template>
  <div>
    <div class="upload">
      <label for="uploadPic">上传图片</label>
      <input id="file" type="file" name="uploadPic" accept="image/jpeg, image/png" @change="previewFiles" />
    </div>
    <div class="preview-wrapper space-between mt-10">
      <div class="left-wrapper flex-start">
        <div class="img-wrapper mr-20">
          <img ref="previewImg" src="../../assets/bg.jpg" />
        </div>
        <div class="img-info">
          <p class="name">xxxx</p>
          <p class="size">xxxx</p>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="operation-item">
          <svg
            t="1663315688719"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3196"
            width="16"
            height="16"
          >
            <path
              d="M382.320274 405.357714v384a20.626286 20.626286 0 0 1-21.577143 21.284572H317.44256a20.626286 20.626286 0 0 1-21.577143-21.357715v-384a20.626286 20.626286 0 0 1 21.577143-21.284571h43.154286a20.626286 20.626286 0 0 1 21.577143 21.357714h0.073142z m172.909715 0v384a20.626286 20.626286 0 0 1-21.650286 21.284572h-43.154286a20.626286 20.626286 0 0 1-21.577143-21.357715v-384a20.626286 20.626286 0 0 1 21.577143-21.284571h43.154286a20.626286 20.626286 0 0 1 21.577143 21.357714z m172.909714 0v384a20.626286 20.626286 0 0 1-21.650286 21.284572h-43.154286a20.626286 20.626286 0 0 1-21.577142-21.357715l-0.073143-384a20.626286 20.626286 0 0 1 21.577143-21.284571h43.227428a20.626286 20.626286 0 0 1 21.577143 21.357714z m86.381714 482.669715V256H209.483703v631.954286a74.825143 74.825143 0 0 0 14.482286 45.056c3.364571 3.803429 5.778286 5.632 7.094857 5.632h561.883428c1.316571 0 3.657143-1.828571 7.094857-5.632a74.825143 74.825143 0 0 0 14.555429-44.982857zM360.743131 170.642286h302.518858l-32.402286-77.970286a19.017143 19.017143 0 0 0-11.483429-7.314286H405.287131a19.017143 19.017143 0 0 0-11.483428 7.314286l-33.060572 77.970286zM987.431131 192v42.642286a20.626286 20.626286 0 0 1-21.577142 21.357714h-64.877715v631.954286c0 36.937143-10.532571 68.754286-31.744 95.744-21.211429 26.843429-46.592 40.301714-76.288 40.301714H231.060846c-29.696 0-55.149714-13.019429-76.288-38.985143-21.211429-26.038857-31.744-57.490286-31.744-94.354286V256H58.151131A20.626286 20.626286 0 0 1 36.573989 234.642286v-42.642286a20.626286 20.626286 0 0 1 21.577142-21.357714h208.676572L314.151131 59.318857c6.729143-16.457143 18.870857-30.427429 36.425143-41.984 17.554286-11.556571 35.401143-17.334857 53.394286-17.334857h216.064c17.993143 0 35.84 5.778286 53.394286 17.334857 17.554286 11.556571 29.696 25.6 36.425143 41.984l47.323428 111.323429h208.676572a20.626286 20.626286 0 0 1 21.577142 21.357714z"
              p-id="3197"
              data-spm-anchor-id="a313x.7781069.0.i2"
              class="selected"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <canvas id="canvas" ref="canvas" class="hide"></canvas>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getPreviewPic, base64ToBlobUrl, encodeMessage, decodeMessage } from '@/utils/index';
let encodeContent = ref();
let decodeContent = ref();
let imgSrc = ref();
let encodeImgSrc = ref();
let password = ref('');
let message = ref();
const previewImg = ref(null);
const canvas = ref(null);
let ctx = ref();

// 将文字加密到图片中
const encodePic = () => {
  ctx.value = canvas.value.getContext('2d');
  ctx.value.canvas.width = previewImg.value.width;
  ctx.value.canvas.height = previewImg.value.height;
  ctx.value.drawImage(previewImg.value, 0, 0);
  let imgData = ctx.value.getImageData(0, 0, ctx.value.canvas.width, ctx.value.canvas.height);
  // 将隐藏信息置入imgData
  encodeMessage(imgData.data, computedHash.value, computedMessage.value);
  ctx.value.putImageData(imgData, 0, 0);
  encodeImgSrc.value = canvas.value.toDataURL();
};

// 解密图片
const decodePic = () => {
  ctx.value = canvas.value.getContext('2d');
  ctx.value.canvas.width = previewImg.value.width;
  ctx.value.canvas.height = previewImg.value.height;
  ctx.value.drawImage(previewImg.value, 0, 0);
  let imgData = ctx.value.getImageData(0, 0, ctx.value.canvas.width, ctx.value.canvas.height);
  let message = decodeMessage(imgData.data, computedHash.value);
  console.log(message);
  decodeContent.value = JSON.parse(message).text;
};

// 获取下载的blob链接
const computedHref = computed(() => {
  return base64ToBlobUrl(encodeImgSrc.value);
});

const computedHash = computed(() => {
  return window?.sjcl?.hash?.sha256.hash(password.value);
});

const computedMessage = computed(() => {
  if (password.value?.length > 0) {
    message = window?.sjcl?.encrypt(password.value, encodeContent.value);
  } else {
    message = JSON.stringify({ text: encodeContent.value });
  }
  return message;
});

// 获取上传的图片base64
const previewFiles = async e => {
  imgSrc.value = await getPreviewPic(e);
};
</script>

<style lang="scss" scoped>
.upload {
  cursor: pointer;
  width: 100%;
  height: 180px;
  position: relative;
  input {
    display: block;
    opacity: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  label {
    width: 100%;
    height: 100%;
    line-height: 180px;
    position: absolute;
    font-size: 14px;
    text-align: center;
    border: 1px dashed #4f555f;
    border-radius: 12px;
  }
}
.preview-wrapper {
  box-sizing: border-box;
  padding: 5px 10px;
  width: 100%;
  height: 64px;
  cursor: pointer;
  .left-wrapper {
    .img-wrapper {
      width: 64px;
      height: 48px;
      border-radius: 4px;
      overflow: hidden;
      img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .right-wrapper {
    .operation-item {
      cursor: pointer;
      width: 40px;
      height: 40px;
      position: relative;
      svg {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        fill: #b8b4b4;
      }
      &:hover {
        background-color: rgba(79, 85, 95, 0.5);
        border-radius: 50%;
      }
    }
  }
  &:hover {
    box-shadow: 0 5px 8px rgb(0 0 0 / 30%);
  }
}
</style>
