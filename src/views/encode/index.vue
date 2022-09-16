<template>
  <div class="top-content">
    <upload @upload-data="getUploadData"></upload>
    <div v-if="imgSrc" class="preview-wrapper space-between mt-15">
      <div class="left-wrapper flex-start">
        <div class="img-wrapper mr-20">
          <img ref="previewImg" :src="imgSrc" />
        </div>
        <div class="img-info">
          <p class="name">{{ file.name }}</p>
          <p class="size">{{ computedFileSize }}</p>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="operation-item" @click="deleteFile">
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

    <div v-if="encodeImgSrc" class="preview-wrapper space-between mt-15">
      <div class="left-wrapper flex-start">
        <div class="img-wrapper mr-20">
          <img ref="previewImg" :src="encodeImgSrc" />
        </div>
        <div class="img-info">
          <p class="name">点击下载加密后的图片</p>
          <p class="name">encode-{{ file.name }}</p>
        </div>
      </div>
      <div class="right-wrapper">
        <a class="operation-item" :href="computedHref" :download="`encode-${file.name}`" rel="nofollow">
          <svg
            t="1663341847822"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2450"
            width="20"
            height="20"
          >
            <path
              d="M498.346667 824.32L201.386667 527.36c-11.946667-11.946667-3.413333-34.133333 13.653333-34.133333H375.466667c11.946667 0 20.48-8.533333 20.48-20.48V54.613333c0-11.946667 8.533333-20.48 20.48-20.48h189.44c11.946667 0 20.48 8.533333 20.48 20.48v418.133334c0 11.946667 8.533333 20.48 20.48 20.48h160.426666c18.773333 0 27.306667 22.186667 13.653334 34.133333L525.653333 824.32c-6.826667 6.826667-20.48 6.826667-27.306666 0zM916.48 989.866667H107.52c-18.773333 0-35.84-15.36-35.84-35.84 0-18.773333 15.36-35.84 35.84-35.84h810.666667c18.773333 0 35.84 15.36 35.84 35.84-1.706667 20.48-17.066667 35.84-37.546667 35.84z"
              p-id="2451"
            ></path>
          </svg>
        </a>
      </div>
    </div>

    <div class="encode-message mt-15">
      <textarea v-model="encodeContent" placeholder="请输入加密信息" class="content"></textarea>
      <input v-model="password" placeholder="请输入密码(可选)" type="password" class="password mt-10" />
    </div>
  </div>

  <div class="btn-wrapper" @click="encodePic">
    <button>加密</button>
  </div>

  <canvas id="canvas" ref="canvas" class="hide"></canvas>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatFile, base64ToBlobUrl, encodeMessage, genarateImageFromBase64 } from '@/utils/index';
import upload from '@/components/upload.vue';
let encodeContent = ref('');
let imgSrc = ref('');
let encodeImgSrc = ref('');
let password = ref('');
let message = ref('');
let file = ref({});
// 获取节点
const previewImg = ref(null);
const canvas = ref(null);

let ctx = ref();

// 将文字加密到图片中
const encodePic = async () => {
  ctx.value = canvas.value.getContext('2d');
  let originPic = await genarateImageFromBase64(imgSrc.value);
  ctx.value.canvas.width = originPic.width;
  ctx.value.canvas.height = originPic.height;
  ctx.value.drawImage(originPic, 0, 0);
  let imgData = ctx.value.getImageData(0, 0, ctx.value.canvas.width, ctx.value.canvas.height);
  // 将隐藏信息置入imgData
  encodeMessage(imgData.data, computedHash.value, computedMessage.value);
  ctx.value.putImageData(imgData, 0, 0);
  encodeImgSrc.value = canvas.value.toDataURL();
};

// 获取下载的blob链接
const computedHref = computed(() => {
  return base64ToBlobUrl(encodeImgSrc.value);
});

const computedHash = computed(() => {
  return window?.sjcl?.hash?.sha256.hash(password.value);
});

// 计算文件大小
const computedFileSize = computed(() => {
  if (file.value?.size) {
    return formatFile(file.value.size);
  } else {
    return '';
  }
});

const computedMessage = computed(() => {
  if (password.value?.length > 0) {
    message = window?.sjcl?.encrypt(password.value, encodeContent.value);
  } else {
    message = JSON.stringify({ text: encodeContent.value });
  }
  return message;
});

const getUploadData = data => {
  console.log(data);
  file.value = data?.file;
  imgSrc.value = data?.imgSrc;
};

const deleteFile = () => {
  imgSrc.value = '';
  file.value = {};
  encodeImgSrc.value = '';
};
</script>

<style lang="scss" scoped>
.top-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
          // object-position: center;
          width: 100%;
          height: 100%;
        }
      }
      .img-info {
        p {
          font-size: 12px;
        }
      }
    }
    .right-wrapper {
      .operation-item {
        display: inline-block;
        cursor: pointer;
        width: 40px;
        height: 40px;
        position: relative;
        color: #b8b4b4;
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

  .encode-message {
    .content {
      width: 100%;
      height: 60px;
      background-color: transparent;
      outline: none;
      border: 1px solid rgba(79, 85, 95, 0.1);
      font-size: 12px;
      padding: 10px;
      resize: none;
    }
    .password {
      width: 100%;
      height: 32px;
      background-color: transparent;
      outline: none;
      border: 1px solid rgba(79, 85, 95, 0.1);
      font-size: 12px;
      padding: 10px;
    }
    input::placeholder,
    textarea::placeholder {
      color: rgba(79, 85, 95, 0.7);
    }
  }
}

.btn-wrapper {
  width: 100%;
  height: 40px;
  border: 1px solid rgba(79, 85, 95, 0.3);
  border-radius: 2px;
  button {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #b8b4b4;
  }
}
.hide {
  display: none;
}
</style>
