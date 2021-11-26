<template>
<div>
    <div class="nes-container is-rounded mb-5 d-grid justify-content-center">
        <img :src='`https://static.neris-assets.com/images/personality-types/headers/${mbti.type}_${mbti.character}_${mbti.name}_personality_header.svg`' class="scene mb-4">
        <br>
        <br>
        <br>
        <h1 class="mbti-title">당신은 {{ mbti.name }}!</h1>
        <h5 class="mt-3">- {{ mbti.description }} -</h5>
        <br>
        <p class="mt-3">{{ mbti.overview }}이시군요!</p>
        <p class="genre-names fw-bold fs-5">{{ genreNames }}</p>
        <p>장르를 좋아하는 경향이 있어요. 제 추천은요...</p>
        <br>
        <br>
        <div class="container">
            <div  class="d-grid justify-content-center">
                <div @click="get_genre_movies" class="d-flex justify-content-center recommend-button mb-5 mt-2">
                    <h2 class="nes-balloon from-right fw-bold mx-4">My recommendation!</h2>
                    <i class="pokemon nes-charmander"></i><i class="nes-pokeball"></i>
                </div>

                <div v-if="recommendedMoviesDisplay" id="recommendation-list" class="nes-container is-rounded with-title is-centered mt-2">
                    <h2 class="title fs-3">추천 영화 목록</h2>
                    <div class="my-5">
                        <div
                            class="recommended-movie"
                            v-for="recommendedMovie in recommendedMovies"
                            :key="recommendedMovie.id"    
                        >
                            <p @click="goToMovieDetail(recommendedMovie)">{{ recommendedMovie.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    </div>
</div>
</template>

<script>
import genres from '../fixtures/genres.js'
import axios from 'axios'
import BASEURL from '../fixtures/urls.js'
import mbtiList from '../fixtures/mbtiList.js'

export default {
    name: 'MbtiDetail',
    data() {
        return {
            mbti: null,
            mbtiList,
            recommendedMovies: [],
            recommendedMoviesDisplay: false,
        }
    },
    methods: {
        get_genre_movies() {
            axios({
                method: 'post',
                url: `${BASEURL}/movies/get_movies_by_genres/`,
                data: {
                    genreIds: this.computedGenreIds,
                },
            })
            .then(response => {
                this.recommendedMovies = response.data
                console.log(this.recommendedMovies)
                this.recommendedMoviesDisplay = !this.recommendedMoviesDisplay
                this.goToRecommendations()
            })
            .catch(error => {
                console.log(error)
            })
        },
        getMbti() {
            const mbtiId = this.$route.params.mbtiId * 1
            const mbti = this.mbtiList.find(mbti => mbti.id === mbtiId)
            this.mbti = mbti
        },
        goToMovieDetail(movie) {
            this.$router.push({ name: 'MovieDetail', params: {movie: movie, movie_id: movie.id} })
        },
        goToRecommendations() {
            document.getElementById('recommendation-list').scrollIntoView();
        },
    },
    computed: {
        genreNames() {
          return this.mbti.recommend
        },
        computedGenreIds() {
          return this.genreNames.map(genreName => genres.find(genre => genre.name === genreName).id)
        },
    },
    created() {
        this.getMbti()
    },
}
</script>

<style scoped>
.mbti-title {
  animation-duration: 10s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.genre-names {
  color: rgb(148, 22, 148);
}

.recommend-button:hover { 
  animation-duration: 3s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.recommended-movie:hover { 
  animation-duration: 3s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.pokemon { 
  animation-duration: 1.5s;
  animation-name: floatingMovement; 
  animation-iteration-count: infinite;
}

@keyframes floatingMovement {
  0% { transform: translateX(1px) translateY(0px); }
  15% { transform: translateX(0px) translateY(2px);}
  30% { transform: translateX(0px) translateY(2px);}
  45% { transform: translateX(-1px) translateY(2px); }
  60% { transform: translateX(-1px) translateY(0px);}
  75% { transform: translateX(-1px) translateY(-2px); }
  90% { transform: translateX(0px) translateY(-2px);} 
  100% { transform: translateX(2px) translateY(-1px);}
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