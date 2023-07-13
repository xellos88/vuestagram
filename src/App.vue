<template>

<!-- 헤더 -->
  <div class="header">
    <ul>
      <li class="header-button header-button-left" v-if="$store.state.tabFlg !== 0" @click="$store.commit('changeTabFlg',0), $store.commit('clearState')">취소</li>
      <li> 
        <!-- <img class="logo" alt="Vue logo" src="./assets/logo.png"> -->
        <img class="logo" alt="insta" src="https://t1.daumcdn.net/cfile/tistory/2677863D5737D65D09">
      </li>
      <li class="header-button header-button-right" v-if="$store.state.tabFlg == 1" @click="$store.commit('changeTabFlg',2)" >다음</li>
      <li class="header-button header-button-right" v-if="$store.state.tabFlg == 2" @click="$store.dispatch('writeContent'); $store.commit('changeTabFlg',0)">작성</li>
    </ul>
  </div>
  {{ $store.state.lastId }}
<!-- 컨텐츠 -->
<ContainerComponent/>

<button v-if="$store.state.addBtnFlg && $store.state.tabFlg==0" @click="$store.dispatch('getMoreList');">더보기</button>

<!-- 푸터 -->
  <div class="footer">
    <div class="footer-button-store">
      <label for="file" class="label-store">+</label>
      <input @change="updateImg" accept="image/*" type="file" id="file" class="input-file">
    </div>
  </div>

</template>

<script>
import ContainerComponent from './components/ContainerComponent.vue'
export default {
  name: 'App',
  created(){
    this.$store.dispatch('getMainList');
  },
  methods: {
    updateImg(e){
      let file= e.target.files;
      let imgUrl = URL.createObjectURL(file[0]);
      this.$store.commit('changeImgUrl', imgUrl);
      this.$store.commit('changeImg', file[0]);
      this.$store.commit('changeTabFlg',1);
      e.target.value='';
    }  
  },
  components: {
    ContainerComponent,
  }
}
</script>

<style>
@import url('./assets/css/common.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
