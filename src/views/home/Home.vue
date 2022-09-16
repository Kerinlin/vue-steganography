<template>
  <div class="home">
    <h1 class="text-center">steganography</h1>
    <div class="home-wrapper">
      <div class="card-wrapper">
        <div class="tab-wrapper flex-start mb-20">
          <router-link class="btn-item" to="/steganography/encode" active-class="active-item">加密</router-link>
          <router-link class="btn-item" to="/steganography/decode" active-class="active-item">解密</router-link>
        </div>
        <div class="card-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <!-- <h1 class="text-center pt-10">图片隐藏文本</h1> -->
    <!-- <div class="home-wrapper p-40">
      <div class="encode item">
        <div class="upload">
          <label for="uploadPic">上传图片</label>
          <input id="file" type="file" name="uploadPic" accept="image/jpeg, image/png" @change="previewFiles" />
        </div>
        <div class="preview-wrapper flex-start mt-40">
          <div v-show="imgSrc" class="origin-pic">
            <img ref="previewImg" :src="imgSrc" />
          </div>
          <div v-if="encodeImgSrc" class="decode-pic text-center">
            <img :src="encodeImgSrc" />
            <a :href="computedHref" class="download" download="encode.png" rel="nofollow">下载加密后的图片</a>
          </div>
        </div>
        <div class="input-encode flex-start-nocenter mt-40">
          <span class="title mr-20">加密内容</span>
          <textarea v-model="encodeContent" class="content" name=""></textarea>
        </div>
        <div class="input-encode flex-start-nocenter mt-40">
          <span class="title mr-20">密码(可选)</span>
          <input v-model="password" type="password" class="content" name="" />
        </div>
        <div v-if="decodeContent" class="input-encode flex-start-nocenter mt-40">
          <span class="title mr-20">图片隐藏信息</span>
          <textarea v-model="decodeContent" readonly class="content" name=""></textarea>
        </div>
        <div class="btn-wrapper text-center">
          <button class="init-btn operation-btn mr-20" @click="encodePic">加密</button>
          <button class="init-btn operation-btn" @click="decodePic">解密</button>
        </div>
      </div>
    </div> -->
    <!-- <div class="home-wrapper">
      <router-view></router-view>
    </div> -->
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
.home {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/bg.jpg');
  background-size: cover;
  position: relative;
  h1 {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 40px;
    letter-spacing: 1px;
    font-family: 'schools-out';
    // color: rgb(210, 204, 204);
    color: #b8b4b4;
  }
  .home-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    color: #4f555f;
    .card-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding: 0px 20px 20px 20px;
      width: 400px;
      height: 540px;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgb(0 0 0 / 50%);
      transition: 0.3s;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .tab-wrapper {
        width: 100%;
        height: 44px;
        .btn-item {
          width: 50%;
          margin: 10px 0px;
          text-align: center;
          &:first-child {
            border-right: 1px solid #4f555f;
          }
        }
        .active-item {
          color: #b8b4b4;
        }
      }
      .card-content {
        width: 100%;
        height: calc(100% - 64px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}

// .home-wrapper {
//   font-size: 14px;
//   .item {
//     width: 60%;
//     margin: 0 auto;
//     .upload {
//       width: 100%;
//       height: 200px;
//       line-height: 100px;
//       position: relative;
//       cursor: pointer;
//       input {
//         display: block;
//         opacity: 0;
//         width: 100%;
//         height: 100%;
//         overflow: hidden;
//       }
//       label {
//         width: 100%;
//         height: 200px;
//         line-height: 200px;
//         position: absolute;
//         font-size: 14px;
//         text-align: center;
//         background: #ffffff;
//         border: 1px dashed #eee;
//       }
//       span {
//         position: absolute;
//         color: #000;
//       }
//     }

//     .preview-wrapper {
//       a {
//         display: inline-block;
//         width: 200px;
//         padding: 5px 0px;
//         border: 1px solid #eee;
//       }
//     }
//     .input-encode {
//       width: 100%;
//       .title {
//         white-space: nowrap;
//       }
//       .content {
//         width: 100%;
//         padding: 10px;
//         border: 1px solid #eee;
//       }
//     }
//     .operation-btn {
//       width: 250px;
//       margin-top: 40px;
//       padding: 4px 0px;
//       border: 1px solid #eee;
//     }
//   }
// }
.hide {
  display: none;
}
</style>
