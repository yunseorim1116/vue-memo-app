<template>

  <div class="app">
    <div v-if="state.account.mid"> 안녕하세요 ? {{state.account.memberName}} 님!</div>

    <div v-else>
    <label for="loginId">
     <span>아이디</span>
    <input type="text" id="loginId" v-model="state.form.loginId"/>
  </label>

     <label for="loginPw">
      <span>패스워드</span>
    <input type="password" id="loginPw" v-model="state.form.loginPw"/>
  </label>

  <br/>
  <button @click="handleSubmit">로그인</button>

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
   form:{
   loginId : "",
   loginPw:""
   },
loggedIn : false})

const handleSubmit = () =>{
  console.log('제출')
  const args = {
   loginId: state.form.loginId,
   loginPw: state.form.loginPw
  }

  axios.post('/api/account', args).then((res)=>{
    console.log(res)
     console.log('로그인 성공 TEST')
       state.account = res.data
  }).catch((res)=>{
    console.log(res)
    console.log('로그인 실패 TEST')
  })



}

axios.get('/api/account').then((res)=>{
  console.log(res.data)
  state.account = res.data
})

// return { state, submit }

</script>