<template>
<div class="mbti-recommned">
  <div class="d-flex justify-content-center page-header" @click="toggleDisplay({'type': 'body', 'obj': 'recommendation'})">
    <h2 v-show="display.balloon.recommendation" class="m-3 nes-balloon from-right fw-bold">What is your MBTI?</h2>
    <i v-show="display.pokeball.bulbasaur" @click="showPokemon" class="nes-pokeball pokeball"></i>
    <i v-show="display.pokemon.bulbasaur" class="pokemon nes-bulbasaur"></i>
  </div>
  <br>
  <br>
  <div v-show="display.body.recommendation" class="page-body nes-container is-rounded p-5 mb-5 mt-2 mx-4 px-4">
      <div class="row">
        <div
          v-for="mbti in mbtiList"
          :key="mbti.id"
          class="col-3 my-2"
        >
          <div
            class="nes-btn w-100"
            @click="goToMbtiDetail(mbti.id)"
            id="mbti-button"
            data-bs-toggle="tooltip" 
            data-bs-placement="right" 
          >
            <div class="mb-3">
              <img :src="imgPaths[mbti.id - 1]" class="card-img-top" :alt="imgPaths[mbti.id - 1]">
              <div class="card-body mb-0 pb-0">
                <h5 class="card-title fs-2">{{ mbti.name }}</h5>
              </div>
              <p class="card-text">{{ mbti.description }}</p>
            </div>
          </div>
      </div>
    </div>
  </div>   
</div>
  
</template>

<script>
import mbtiList from '../fixtures/mbtiList.js'

export default {
  name: 'MovieRecommend',
  data() {
    return {
      mbtiList,
    }
  },
  methods: {
    goToMbtiDetail(mbtiId) {
      console.log(mbtiList[mbtiId])
      this.$router.push({ name: 'MbtiDetail', params: { mbti: mbtiList[mbtiId - 1], mbtiId } })
    },
    toggleDisplay(target) {
      this.$store.dispatch('toggleDisplay', target)
    },
    showPokemon() {
      this.$store.dispatch('toggleDisplay', {'type': 'pokeball', 'obj': 'bulbasaur'})
      this.$store.dispatch('toggleDisplay', {'type': 'pokemon', 'obj': 'bulbasaur'})
      this.$store.dispatch('toggleDisplay', {'type': 'balloon', 'obj': 'recommendation'})
    },
  },
  computed: {
    imgPaths() {
      return this.mbtiList.map(mbti => require(`../assets/mbti_${mbti.name}.svg`))
    },
    display() {
      return this.$store.state.display
    }
  },
}
</script>

<style scoped>
.page-header { 
  animation-duration: 3s; 
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

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

.pokemon { 
  animation-duration: 1.5s;
  animation-name: floatingMovement; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

.pokemon:hover { 
  animation-name: none; 
  transform: translateY(-3px);
}

#mbti-button:hover {
  animation-duration: 2s;
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
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

.card-text {
  font-size: 0.8rem;
}

#mbti-button {
  margin: 0;
  padding: 1.5rem 1rem 1rem 1rem;
  background-color: #fff;
  border: solid, 10px;
  border-radius: 0.5rem;
  color: #000;
  height: 18rem;
}

#mbti-button:hover {
  background-color: #F8F9FA;
}
</style>