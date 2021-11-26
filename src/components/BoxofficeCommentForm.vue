<template>
  <div class="d-flex justify-content-center align-items-center">
    <form @submit="postOrUpdateComment">
      <div class="d-flex align-items-center">
        <div class="m-3 d-flex align-items-center" v-if="commentForm || updateForm">
          <label class="mt-2 me-2" for="default_select">
            <i class="nes-icon star"></i>
          </label>
          <div class="nes-select me-0">
            <select v-model="starScore" required id="default_select">
              <option value="" disabled selected hidden>별점</option>
              <option value="1">1점</option>
              <option value="2">2점</option>
              <option value="3">3점</option>
              <option value="4">4점</option>
              <option value="5">5점</option>
              <option value="6">6점</option>
              <option value="7">7점</option>
              <option value="8">8점</option>
              <option value="9">9점</option>
              <option value="10">10점</option>
            </select>
          </div>
        </div>
        <div class="m-3 ms-2">
          <input class="nes-input" v-model="content" type="text" placeholder="댓글을 입력하세요" id="content">
        </div>
        <button v-if="updateForm" class="nes-btn is-normal">
          수정
        </button>
        <button v-if="!updateForm" class="nes-btn is-normal">
          입력
        </button>
        <div class="m-1">
        <button v-if="beingUpdated" @click="closeUpdate" class="nes-btn is-error">
          취소
        </button>
        <button v-if="beingReplied" @click="closeReply(comment.id)" class="nes-btn is-error">
          취소
        </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BoxofficeCommentForm',
  data() {
    return {
      starScore: 5,
      content: '',
    }
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
    },
    beingUpdated: {
      type: Array,
    },
    beingReplied: {
      type: Array,
    },
  },
  methods: {
     postOrUpdateComment(event) {
      event.preventDefault()

      const parentCommentId = this.$props.comment ? this.$props.comment.id : null
      const comment = {
        star_score: this.starScore,
        content: this.content,
        parent_comment: parentCommentId,
      }

      let method = 'post'
      let url = `http://127.0.0.1:8000/api/v1/community/${this.$props.movie.id}/post_boxoffice_comment/`
      if (this.$props.beingUpdated) {
        method = 'put'
        url = `http://127.0.0.1:8000/api/v1/community/update_boxoffice_comment/${this.$props.comment.id}/`
      }

      this.$store.dispatch('setTokenConfig')
      
      axios({
        method,
        url,
        data: comment,
        headers: this.$store.state.config
      })
        .then(() => {
          if (this.updateForm) { // update form일 때
            this.$emit('updated')
            this.$emit('closeUpdate')
          } else if (this.replyForm) { // 답글 생성 form일 때
            this.$emit('posted')
            this.$emit('closeReply', parentCommentId)           
          }
          else { // 댓글 생성 form일 때
            const starScore = document.getElementById('star-score')
            const content = document.getElementById('content')
            if (starScore) { // 답글일 때 별점 표시하는 곳 없는 것을 대비
              starScore.value = ''
            }
            content.value = ''

            this.$emit('posted')
          }
        })
        .catch(error => {
          console.log(error)
          this.$store.dispatch('validateJwt')
          if (!this.$store.state.jwtIsValid) {
            alert('세션이 만료되었습니다. 다시 로그인해주세요')
            this.$router.push({ name: 'Login' })
          }
        })
    },
    setDefaultValue() {
      if (!this.$props.comment) {
        this.starScore = 5
        this.content = ''
      } else if (this.$props.beingReplied) {
        this.starScore = null
        this.content = ''
      } else {
        this.starScore = this.$props.comment.star_score
        this.content = this.$props.comment.content
      }
    },
    closeUpdate() {
      this.$emit('closeUpdate', this.$props.comment.id)
    },
    closeReply(commentId) {
      this.$emit('closeReply', commentId)
    },
  },
  computed: {
    commentForm() {
      if ( !this.$props.comment ) {
        return true
      }
      return false
    },
    updateForm() {
      if ( this.$props.beingUpdated ) {
        if (this.$props.beingUpdated.find(x => x === this.$props.comment.id)) {
          return true
        }
      }
      return false
    },
    replyForm() {
      if ( this.$props.beingReplied ) {
        if (this.$props.beingReplied.find(x => x === this.$props.comment.id)) {
          return true
        }
      }
      return false
    },
  },
  created() {
    this.setDefaultValue()
  },
}
</script>

<style>
.nes-btn {
  font-size: 16px;
  width: 70px;
  height: 50px;
}
</style>