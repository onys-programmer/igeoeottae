<template>
  <div class="nes-container is-rounded pt-0 px-3 d-grid">
    <div class="row">
      <div class="col-11 d-flex justify-content-start align-items-center">
        <h4 class="mb-1 me-3 pt-1">{{ comment.user.username }}</h4>
        <div class="d-grid fs-4 justify-content-center">
          <div class="star-ratings">
            <div
              class="star-ratings-fill" 
              :style="{ width: comment.star_score * 10 + '%' }"
            >
              <span><i class="nes-icon is-small star"></i></span><span><i class="nes-icon is-small star"></i></span><span><i class="nes-icon is-small star"></i></span><span><i class="nes-icon is-small star"></i></span><span><i class="nes-icon is-small star"></i></span>
            </div>
            <div class="star-ratings-base"><i class="nes-icon is-small star is-transparent"></i><i class="nes-icon is-small star is-transparent"></i><i class="nes-icon is-small star is-transparent"></i><i class="nes-icon is-small star is-transparent"></i><i class="nes-icon is-small star is-transparent"></i></div>          
          </div>
        </div>
        <p class="pt-3 ms-2">{{ comment.star_score }}점</p>
        <small class="ms-3 time-since">{{ timeSince(comment.updated_at) }}</small>
      </div>
      <div class="col-1 mt-2">
        <div 
          v-if="comment.user.id == userId && !beingUpdated.find(x => x == comment.id)" 
          class="btn-group"
        >
          <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><button class="dropdown-item" type="button" @click="showUpdateForm(comment.id)">수정</button></li>
            <li><button class="dropdown-item" type="button" @click="deleteBoxofficeComment(comment.id)">삭제</button></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 댓글 내용 -->
    <div class="d-flex justify-content-between">
      <p 
        v-if="!beingUpdated.find(x => x == comment.id)" 
        class="col-10 mb-1 text-start ps-2 pb-2"
      >
        {{ comment.content }}
      </p>
    </div>

    <!-- 답글 update Form -->
    <BoxofficeCommentForm 
      v-if="beingUpdated.find(x => x == comment.id)"
      :comment="comment"
      :movie="movie"
      :beingUpdated="beingUpdated"
      @closeUpdate="closeUpdate"
      @updated="getBoxofficeComments"
      @posted="getBoxofficeComments"
    />
    <div v-if="!beingUpdated.find(x => x == comment.id)" class="d-flex col-3 justify-content-between">
      <small id="reply-button"><a class="text-dark pb-0" @click="showReplyForm(comment.id)">답글</a></small>
    </div>

    <!-- 답글 생성 form -->
    <BoxofficeCommentForm
      v-if="beingReplied.find(x => x == comment.id) && !beingUpdated.find(x => x == comment.id)"
      :beingReplied="beingReplied"
      :comment="comment"
      :movie="movie"
      @closeUpdate="closeUpdate"
      @closeReply="closeReply"
      @updated="getBoxofficeComments"
      @posted="getBoxofficeComments"
    />

    <!-- 답글 아이템 -->
    <div 
      class="d-grid mt-2"
      v-for="childComment in childComments"
      :key="childComment.id"
    >
      <div class="row align-items-center">
        <div class="col-1">
          <img src="../assets/icons/down-right.png" alt="오른쪽 아래 굽은 화살표">
        </div>

        <div class="col-11 row">

          <div class="col-11 d-flex justify-content-start">
            <h5 class="mb-1">{{ childComment.user.username }}</h5>
            <small class="ms-2">{{ timeSince(childComment.updated_at) }}</small>
          </div>

          <div class="col-1">
            <div 
              v-if="childComment.user.id == userId && !beingUpdated.find(x => x == childComment.id)" 
              class="btn-group"
            >
              <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><button class="dropdown-item" type="button" @click="showUpdateForm(childComment.id)">수정</button></li>
                <li><button class="dropdown-item" type="button" @click="deleteBoxofficeComment(childComment.id)">삭제</button></li>
              </ul>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <p 
              v-if="!beingUpdated.find(x => x == childComment.id)" 
              class="col-10 mb-1 text-start ps-2"
            >
              {{ childComment.content }}
            </p>
          </div>

          <BoxofficeCommentForm 
            v-if="beingUpdated.find(x => x == childComment.id)"
            :comment="childComment"
            :movie="movie"
            :beingUpdated="beingUpdated"
            @closeUpdate="closeUpdate"
            @updated="getBoxofficeComments"
            @posted="getBoxofficeComments"
          />

        </div>
      </div>
    </div>
    <!-- 답글 아이템 끝 -->
  </div>
</template>

<script>
import BoxofficeCommentForm from './BoxofficeCommentForm.vue'


export default {
  name: 'BoxOfficeCommentListItem',
  data() {
    return {}
  },
  components: {
    BoxofficeCommentForm,
  },
  props: {
    movie: {
      type: Object,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    beingUpdated: {
      type: Array,
      required: true,
    },
    beingReplied: {
      type: Array,
      required: true,      
    },
    userId: {
      type: Number,
    },
  },
  methods: {
    showUpdateForm(commentId) {
      this.$emit('showUpdateForm', commentId)
    },
    closeUpdate(commentId) {
      this.$emit('closeUpdate', commentId)
    },
    closeReply(commentId) {
      this.$emit('closeReply', commentId)
    },
    deleteBoxofficeComment(commentId) {
      this.$emit('deleteBoxofficeComment', commentId)
    },
    getBoxofficeComments() {
      this.$emit('getBoxofficeComments')
    },
    showReplyForm(commentId) {
      console.log('답글눌림')
      this.$emit('showReplyForm', commentId)
    },
    timeSince(date) {
      date = Date.parse(date)
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + "년 전";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + "달 전";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + "일 전";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + "시간 전";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + "분 전";
      }
      return "방금";
    }
  },
  computed: {
    childComments() {
      return this.$props.comments.filter(x => x.parent_comment === this.$props.comment.id)
    },
  },
}
</script>

<style scoped>
.time-since {
  font-size: 14px;
}

#reply-botton:hover {
   color: #42b983;
 }
</style>