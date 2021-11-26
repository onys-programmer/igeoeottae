<template>
  <div class="container">
    <div class="d-grid justify-content-center">
      <div>
        <h3 class="nes-balloon from-left fw-bold">회원가입</h3>
      </div>
      <div class="mb-2">
        <i class="nes-octocat animate"></i><i class="nes-icon google ms-2"></i><i class="nes-icon github ms-2"></i><i class="nes-icon facebook ms-2"></i>
      </div>
      <form @submit="signup">
        <div class="nes-container is-rounded m-3" witdh="700px">
          <div class="row m-2">
            <label for="username">회원 아이디</label>
            <input class="nes-input" v-model="username" type="text" id="username">
            <div class="error-message m-2" v-if="validation !== undefined"> {{ validation.firstError('username') }}
            </div>
          </div>
          <div class="row m-2">
            <label for="password">비밀번호</label>
            <input class="nes-input" v-model="password" type="password" id="password">
            <div class="error-message m-2 w-100" v-if="validation !== undefined"> {{ validation.firstError('password') }}
            </div>        
          </div>
          <div class="row m-2">
            <label for="passwordConfirmation">비밀번호 확인</label>
            <input class="nes-input" v-model="passwordConfirmation" type="password" id="passwordConfirmation">
            <div v-show='validation !== undefined' class="m-2 w-100">
              <p v-show="password !== passwordConfirmation">비밀번호가 일치하지 않습니다.</p>
            </div>
          </div>
          <button @click="submit" class="nes-btn is-success w-25">회원가입</button>
        </div>
      </form>
    </div>
    
    
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import SimpleVueValidation from 'simple-vue-validator'

Vue.use(SimpleVueValidation)

const Validator = SimpleVueValidation.Validator
SimpleVueValidation.extendTemplates({
  required: '필수 입력 항목입니다.',
  minLength: '{0} 글자 이상이어야 합니다.',
  maxLength: '{0} 글자 이상이어야 합니다.',
  digit: '숫자만 입력 가능합니다.',
  regex: '영문만 입력 가능합니다.',
})


export default {
 name : 'signup',
 data() {
   return {
     username: '',
     password: '',
     passwordConfirmation: '',
   }
 },
 validators: {
   username(value) {
     return Validator.value(value).required()
   },
   password(value) {
     return Validator.value(value).required().minLength(8)
   },
 },
 methods: {
   signup(event) {
     event.preventDefault()
     axios({
       method: 'post',
       url: 'http://127.0.0.1:8000/api/v1/accounts/signup/',
       data: {
         username: this.username,
         password: this.password,
         passwordConfirmation: this.passwordConfirmation,
       }
     })
      .then(() => {
        // console.log(response)
        this.$router.push({ name: 'Login'})
      })
      .catch(error => {
        console.log(error)
      })
   },
    submit() {
      this.$validate()
        .then(function (success) {
          if (success) {
            alert("회원 가입에 성공하셨습니다. 환영합니다.")
          }
        })
   }
 },
}
</script>

<style>

</style>