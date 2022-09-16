<template>
  <div class="upload">
    <label for="uploadPic">点击上传图片</label>
    <input id="file" type="file" name="uploadPic" accept="image/jpeg, image/png" @change="previewFiles" />
  </div>
</template>

<script setup>
import { getPreviewPic } from '@/utils/index';
const emit = defineEmits(['uploadData']);

// 获取上传的图片base64
const previewFiles = async e => {
  let data = await getPreviewPic(e);
  emit('uploadData', data);
};
</script>

<style lang="scss" scoped>
.upload {
  cursor: pointer;
  width: 100%;
  height: 100px;
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
    line-height: 100px;
    position: absolute;
    font-size: 14px;
    text-align: center;
    border: 1px dashed rgba(79, 85, 95, 0.5);
    border-radius: 12px;
  }
}
</style>
