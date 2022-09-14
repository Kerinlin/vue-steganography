<template>
  <div class="home">
    <h1 class="text-center mt-10">图片隐藏文本</h1>
    <div class="home-wrapper p-40">
      <div class="encode item">
        <div class="upload">
          <label for="uploadPic">上传图片</label>
          <input id="file" type="file" name="uploadPic" accept="image/jpeg, image/png" @change="previewFiles" />
        </div>
        <div class="preview-wrapper flex-start mt-40">
          <div v-if="imgSrc" class="origin-pic">
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
        <div v-if="decodeContent" class="input-encode flex-start-nocenter mt-40">
          <span class="title mr-20">图片隐藏信息</span>
          <textarea v-model="decodeContent" readonly class="content" name=""></textarea>
        </div>
        <div class="btn-wrapper text-center">
          <button class="init-btn operation-btn mr-20" @click="encodePic">加密</button>
          <button class="init-btn operation-btn" @click="decodePic">解密</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useEncode, getPreviewPic, useDecode } from './js/index';
let encodeContent = ref();
let decodeContent = ref();
let imgSrc = ref();
let encodeImgSrc = ref();
const previewImg = ref(null);

// 将文字加密到图片中
const encodePic = () => {
  encodeImgSrc.value = useEncode(encodeContent.value, previewImg.value);
};

// 解密图片
const decodePic = () => {
  decodeContent.value = useDecode(previewImg.value);
};

// 下载图片
const computedHref = computed(() => {
  return encodeImgSrc.value.replace('image/png', 'image/octet-stream');
});

// 获取上传的图片base64
const previewFiles = async e => {
  imgSrc.value = await getPreviewPic(e);
};
</script>

<style lang="scss" scoped>
.home-wrapper {
  font-size: 14px;
  .item {
    width: 60%;
    margin: 0 auto;
    .upload {
      width: 100%;
      height: 200px;
      line-height: 100px;
      position: relative;
      cursor: pointer;
      input {
        display: block;
        opacity: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      label {
        width: 100%;
        height: 200px;
        line-height: 200px;
        position: absolute;
        font-size: 14px;
        text-align: center;
        background: #ffffff;
        border: 1px dashed #eee;
      }
      span {
        position: absolute;
        color: #000;
      }
    }

    .preview-wrapper {
      a {
        display: inline-block;
        width: 200px;
        padding: 5px 0px;
        border: 1px solid #eee;
      }
    }
    .input-encode {
      width: 100%;
      .title {
        white-space: nowrap;
      }
      .content {
        width: 100%;
        padding: 10px;
        border: 1px solid #eee;
      }
    }
    .operation-btn {
      width: 250px;
      margin-top: 40px;
      padding: 4px 0px;
      border: 1px solid #eee;
    }
  }
}
</style>
