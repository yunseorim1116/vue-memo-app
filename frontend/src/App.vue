<template>

  <div class="app">
    <div v-if="state.account.mid"> 안녕하세요 ? {{state.account.memberName}} 님!</div>

    <div v-else>
    <label for="loginId">
    <input type="text" id="loginId"/>
  </label>

     <label for="loginPw">
    <input type="password" id="loginPw"/>
  </label>

  <br/>
  <button>로그인</button>

</div>
  </div>

</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';

const state = reactive({
  account:{
   mid:null,
   memberName : ""
   } ,
loggedIn : false})
console.log(state)

axios.get('/api/account').then((res)=>{
  console.log(res.data)
  state.account = res.data
})

</script>