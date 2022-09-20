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
  </div>
</template>

<script setup></script>

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
</style>
