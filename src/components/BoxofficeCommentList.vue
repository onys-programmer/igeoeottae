<template>
  <div>
    <div class="m-3 mt-5">
      <br>
      <h3>영화에 대해 의견을 남겨보세요!</h3>
    </div>
    <br>
    <div v-if="userId">
      <BoxofficeCommentForm 
        :movie="movie" 
        @posted="getCommentsAndStarScore"
      />
    </div>
    <div v-else>
      <p>댓글을 달려면 로그인하세요.</p>
    </div>
    <br>
    <div class="list-group">
    <BoxofficeCommentListItem
      v-for="comment in parentComments"
      :comments="comments"
      :key="comment.id"
      :movie="movie"
      :comment="comment"
      :beingUpdated="beingUpdated"
      :beingReplied="beingReplied"
      :userId="userId"
      @showUpdateForm="showUpdateForm"
      @closeUpdate="hideUpdateForm"
      @showReplyForm="showReplyForm"
      @closeReply="hideReplyForm"
      @deleteBoxofficeComment="deleteBoxofficeComment"
      @getBoxofficeComments="getBoxofficeComments"
      href="#" 
      class="list-group-item list-group-item-action"
      aria-current="true"
    />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BoxofficeCommentForm from './BoxofficeCommentForm.vue'
import BoxofficeCommentListItem from './BoxofficeCommentListItem.vue'
import BASEURL from '../fixtures/urls.js'

export default {
  components: { 
    BoxofficeCommentForm,
    BoxofficeCommentListItem,
  },
  name: 'BoxofficeCommentList',
  data() {
    return {
      beingReplied: [],
      beingUpdated: [],
      comments: [],
      userId: null,
    }
  },
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  methods: {
    getCommentsAndStarScore() {
      this.getBoxofficeComments()
      this.$emit('posted')
    },
    getBoxofficeComments() {
      console.log('코멘트받아오기!')
      axios({
        method: 'get',
        url: `${BASEURL}/community/${this.$props.movie.id}/get_boxoffice_comments/`
      })
        .then(response => {
          this.$data.comments = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteBoxofficeComment(commentId) {
      // console.log(this.$store.state.config)
      axios({
        method: 'delete',
        url: `${BASEURL}/community/delete_boxoffice_comment/${commentId}/`,
        headers: this.$store.state.config,
      })
        .then(response => {
          console.log(response)
          this.getBoxofficeComments()
        })
        .catch(error => {
          console.log(error)
        })
    },
    showUpdateForm(commentId) {
      this.beingUpdated.push(commentId)
    },
    hideUpdateForm(commentId) {
      const commentIdx = this.beingUpdated.findIndex(x => x == commentId)
      this.beingUpdated.splice(commentIdx, 1)
    },
    showReplyForm(commentId) {
      this.beingReplied.push(commentId)
    },
    hideReplyForm(commentId) {
      const commentIdx = this.beingReplied.findIndex(x => x == commentId)
      this.beingReplied.splice(commentIdx, 1)
    },
    setUserId() {
      // set current log-ined user's id
      this.$store.dispatch('validateJwt')
      this.userId = this.$store.state.userData.user_id
    },
  },
  computed: {
    parentComments(state) {
      return state.comments.filter(x => !x.parent_comment)
    },
  },
  created() {
    this.getBoxofficeComments()
    this.setUserId()
  },
}
</script>

<style>

</style>