<template>
  <div class="container">
    <div class="d-grid justify-content-center">
      <div>
        <h3 class="nes-balloon from-left fw-bold">로그인</h3>
      </div>
      <div class="mb-2">
        <i class="nes-octocat animate"></i><i class="nes-icon google ms-2"></i><i class="nes-icon github ms-2"></i><i class="nes-icon facebook ms-2"></i>
      </div>
      <div class="nes-container is-rounded m-3">
        <form @submit="login">
          <div class="row m-2">
            <label for="username">회원 아이디</label>
            <input class="nes-input" v-model="username" type="text" id="username">
          </div>
          <div class="row m-2 mt-4">
            <label for="password">비밀번호</label>
            <input class="nes-input" v-model="password" type="password" id="password">
          </div>
          <button class="nes-btn is-primary w-25 mt-4">로그인</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    login(event) {
      event.preventDefault()  
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/v1/accounts/api_token_auth/',
        data: {
          username: this.username,
          password: this.password,
        }
      })
      .then(response => {
        // console.log(response)
        const token = response.data.token
        localStorage.setItem('jwt', token)
        this.$emit('login')
        this.$store.dispatch('validateJwt')
        this.$store.dispatch('setTokenConfig')
        this.$router.push({ name: 'BoxOffice' })
      })
      .catch(error =>{
        console.log(error)
        alert("아이디와 비밀번호를 확인하세요.")
      })
    }
  }
}

</script>

<style>

</style>