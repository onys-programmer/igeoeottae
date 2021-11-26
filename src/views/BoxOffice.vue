<template>
  <div class="BoxOffice mb-5">
    <div v-show="display.pokeball.squirtle" @click="showPokemon" class="pokeball">
      <i class="nes-pokeball"></i>
    </div>
    <div @click="toggleDisplay({ 'type':'body', 'obj': 'boxoffice' })" class="d-flex justify-content-center page-header mt-2">
      <h2 v-show="display.balloon.boxoffice" class="text-start m-3 nes-balloon from-right fw-bold page-header">The Box Office</h2>
      <i v-show="display.pokemon.squirtle" class="pokemon nes-squirtle"></i>
    </div>
    <br>
    <br>
    <div v-show="display.body.boxoffice" class="page-body mt-3">
      <i
        v-for="i in coinRange"
        :key="i"
        class="nes-icon coin is-small"
      />
      <i
        v-for="i in trophyRange"
        :key="i"
        class="nes-icon trophy is-medium"
      />
      <i
        v-for="i in coinRange"
        :key="i"
        class="nes-icon coin is-small"
      />
      <div class="nes-container is-rounded m-3 px-2">
        <br>
        <div class="row row-cols-1 row-cols-md-4 g-4 mx-3 mb-5">
          <div
            v-for="(movie, index) in sortedByAudiAcc"
            :key="movie.movieCd"
            class="movie-card col p-0"
            @click="goToMovieDetail(movie)"
          >
            <div class="card w-70 h-100 nes-container with-title is-centered mx-2 px-3">
              <h5 class="title fs-3">{{ index + 1 }}위</h5>
              <img :src="movie.poster_path" class="card-img-top poster-img" alt="영화 포스터 이미지">
              <div class="card-body pb-0">
                <h5 class="card-title">{{ movie.title }}</h5>
                <br>
                <p class="fs-6 mb-1">누적 관객</p>
                <p class="fs-6">{{ numberWithCommas(movie.audi_acc) }}명</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i
        v-for="i in bottomCoinRange"
        :key="i"
        class="nes-icon coin is-small"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      titleBalloonDisplay: false,
      pokemonDisplay: false,
      coinRange: 19,
      trophyRange: 6,
      bottomCoinRange: 57,
    }
  },
  computed: {
    sortedByAudiAcc: function() {
      return this.$store.getters.sortedByAudiAcc
    },
    display() {
      return this.$store.state.display
    },
  },
  methods: {
    goToMovieDetail(movie) {
      this.$router.push({ name: 'MovieDetail', params: {movie: movie, movie_id: movie.id} })
    },
    toggleDisplay(target) {
      this.$store.dispatch('toggleDisplay', target)
    },
    numberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    showPokemon() {
      this.$store.dispatch('toggleDisplay', { 'type': 'pokeball', 'obj': 'squirtle' })
      this.$store.dispatch('toggleDisplay', { 'type': 'pokemon', 'obj': 'squirtle' })
      this.$store.dispatch('toggleDisplay', { 'type': 'balloon', 'obj': 'boxoffice' })
    },
  },
  created() {
    this.$store.dispatch('getMovies')
  },
}
</script>

<style scoped>
.pokeball {
  animation-duration: 3s; 
  animation-name: pokeballMovement; 
  animation-iteration-count: infinite;
  transform: rotate(30deg);  
}

.pokeball:hover {
  transform: translateY(-3px);
  animation-name: none;
}

.page-header { 
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

.pokemon:hover {
  animation-name: none; 
  transform: translateY(-3px);
}

.movie-card:hover {
  background-color: #F8F9FA;
  animation-duration: 2s;
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-5px);
}

/* .BoxOffice {
  height: 1600px;
} */

.title {
  animation-duration: 2s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
}

.poster-img {
  border: 7px black ;
  border-style: double solid solid double;
  padding: 0;
  max-width: 100%;
}

@keyframes pokeballMovement {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(0deg); } 
  20% { transform: rotate(0deg); }
  30% { transform: rotate(0deg); }
  40% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  60% { transform: rotate(0deg); }
  70% { transform: rotate(0deg); }
  80% { transform: rotate(0deg); }
  90% { transform: rotate(10deg); }
  100% { transform: rotate(-10deg); }
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