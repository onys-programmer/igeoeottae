<template>
  <div class="movie-detail">

    <div @click="goToComments()" class="d-flex justify-content-center page-header">
      <h2 class="text-start m-3 nes-balloon mt-0 mb-4 from-right fw-bold">Community!</h2>
      <i class="nes-ash header-icon"></i><i class="nes-pokeball"></i>
    </div>

    <div class="nes-container is-rounded with-title is-centered mt-4 m-3 mb-5">
      <h1 class="title fs-1">{{ movie.title }}</h1>
      <iframe class="m-3 nes-container is-rounded p-0" :src="movie.trailer_path" width="96%" height="500rem" alt="영화트레일러동영상"></iframe>
      <div class="nes-container is-rounded card d-grid m-3" width="95%">
        <div class="row g-0">
          <div class="col-md-6 p-0">
            <img class="poster-img img-fluid" :src="movie.poster_path" alt="영화포스터이미지">
          </div>
          <div class="col-md-6">
            <p class="m-3 ms-5 me-5 lh-lg card-text">{{ movie.overview || '줄거리가 없습니다...' }} </p>
          </div>
        </div>
   
      </div>
      <hr>
      <br>
      <p> 개봉일: {{ movie.release_date }}</p>

      <div class="d-grid fs-4 justify-content-center">
        <div class="star-ratings">
          <div 
            class="star-ratings-fill" 
            :style="{ width: movie.rating * 10 + '%' }"
          >
            <span><i class="nes-icon star"></i></span><span><i class="nes-icon star"></i></span><span><i class="nes-icon star"></i></span><span><i class="nes-icon star"></i></span><span><i class="nes-icon star"></i></span>
          </div>
          <div class="star-ratings-base"><i class="nes-icon star is-transparent"></i><i class="nes-icon star is-transparent"></i><i class="nes-icon star is-transparent"></i><i class="nes-icon star is-transparent"></i><i class="nes-icon star is-transparent"></i></div>          
        </div>
        <p>
          별점 {{ Math.round(movie.rating * 100) / 100 }} 점
        </p>
      </div>
    </div>

    <BoxofficeCommentList 
      id="comment-list" 
      :movie="movie"
      @posted="getMovie"
    />
  </div>

</template>

<script>
import BoxofficeCommentList from '@/components/BoxofficeCommentList.vue'
import axios from 'axios'
import BASEURL from '../fixtures/urls.js'

export default {
  name: 'MovieDetail',
  components: {
    BoxofficeCommentList,
  },
  data() {
    return {
      movie: null,
    }
  },
  methods: {
    getMovie() { // 새로고침했을 때 화면 렌더하게 movie 받아오는 함수
      console.log('실행됨')
      const movieId = this.$route.params.movie_id * 1
      axios({
        method: 'get',
        url: `${BASEURL}/movies/get_movie/${movieId}`,
      })
        .then(response => {
          this.movie = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    goToComments() {
      document.getElementById('comment-list').scrollIntoView();
    },
  },
  created() {
    this.getMovie()
  },
}
</script>

<style scoped>
@media (max-width: 1199.98px) {
  .movie-detail {
    display: block;
  };
}

.star-ratings {
  position: relative;
  width: max-content;
}

.star-ratings-fill {
  padding: 0;
  position: absolute;
  z-index: 4;
  display: flex;
  top: 0;
  left: 0;
  overflow: hidden;
}

.star-ratings-base {
  z-index: 4;
  padding: 0;
}

.poster-img {
  border: 10px black ;
  border-style: double solid solid double;
  padding: 0;
  max-width: 100%;
}

.page-header:hover { 
  animation-duration: 3s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.title { 
  animation-duration: 3s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.header-icon { 
  animation-duration: 1.5s; 
  animation-name: runningMovement; 
  animation-iteration-count: infinite;
}

.header-icon:hover { 
  animation-name: none;
}

@keyframes runningMovement {
  0% { transform: translateX(2px) translateY(0px); }
  15% { transform: translateX(2px) translateY(2px);}
  30% { transform: translateX(0px) translateY(2px);}
  45% { transform: translateX(-2px) translateY(2px); }
  60% { transform: translateX(-2px) translateY(0px);}
  75% { transform: translateX(-2px) translateY(-2px); }
  90% { transform: translateX(0px) translateY(-2px);} 
  100% { transform: translateX(2px) translateY(-2px);}
}

@keyframes rainbowLink {     
 0% { color: #ff2a2a; }
 15% { color: #ff7a2a; }
 30% { color: #ffc52a; }
 45% { color: #43ff2a; }
 60% { color: #2a89ff; }
 75% { color: #202082; }
 90% { color: #6b2aff; } 
 100% { color: #e82aff; }
}

</style>