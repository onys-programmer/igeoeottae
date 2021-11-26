import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import jwt from 'jsonwebtoken'
import BASEURL from '../fixtures/urls.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    jwtIsValid: false,
    userData: null,
    movieList: [],
    config: {},
    mbti_list: {},
    genre_movies: {},
    bgmSrc: './assets/sounds/boxofficeBgm.mp3',
    display: {
      'body': {
        'boxoffice': false,
        'recommendation': false,
      },
      'pokeball': {
        'squirtle':true,
        'charmander': true,
        'bulbasaur': true,
      },
      'pokemon': {
        'squirtle':false,
        'charmander': true,
        'bulbasaur': false,
      },
      'balloon': {
        'boxoffice': false,
        'recommendation': false,
      }
    },
  },
  getters: {
    sortedByOpenDt(state) {
      const sortedByOpenDt = state.movieList.sort((a, b) => {
        return a.openDt >= b.openDt ? -1 : 1
      })
      return sortedByOpenDt
    },
    sortedByAudiAcc(state) {
      const sortedByAudiAcc = state.movieList.sort((a, b) => {
        return a.audi_acc >= b.audi_acc ? -1 : 1
      })
      return sortedByAudiAcc
    },
  },
  mutations: {
    setMovies(state, movieList) {
      state.movieList = movieList
    },
    setTokenConfig(state, config) {
      state.config = config
    },
    validateJwt(state, {jwtIsValid, userData}) {
      state.jwtIsValid = jwtIsValid
      state.userData = userData
    },
    setMbtiList(state, mbti_list) {
      state.mbti_list = mbti_list
    },
    genre_movie_recommend(state, genre_movies) {
      state.genre_movies = genre_movies
    },
    setBgmSrc(state, bgmSrc) {
      state.bgmSrc = bgmSrc
    },
    toggleDisplay(state, { type, obj }) {
      state.display[type][obj] = !state.display[type][obj]
    },
  },
  actions: {
    setTokenConfig({ commit }) {
      console.log('setTOkenConfig is excuted')
      const token = localStorage.getItem('jwt')
      if (token) {
        const JWT_SECRET_KEY = process.env.VUE_APP_JWT_SECRET_KEY
        try {
          jwt.verify(token, JWT_SECRET_KEY)
        } catch (err) {
          console.log('hey this token is expired')
          console.log(err)
        }
      }
      const config = {
        Authorization: `JWT ${token}`
      }
      commit('setTokenConfig', config)
    },
    getMovies(state) {
      axios({
        method: 'get',
        url: `${BASEURL}/get_movies/`,
      })
        .then(response => {
          state.commit('setMovies', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    validateJwt({ commit }) {
      const token = localStorage.getItem('jwt')
      if (token) {
        const JWT_SECRET_KEY = process.env.VUE_APP_JWT_SECRET_KEY
        try { 
          const userData = jwt.verify(token, JWT_SECRET_KEY)
          commit('validateJwt', {jwtIsValid: true, userData})
        } catch (err) {
          commit('validateJwt', {jwtIsValid: false, userData: null})
          localStorage.removeItem('jwt')
          console.log(err)
        }
      } else {
        commit('validateJwt', {jwtIsValid: false, userData: null})
      }
    },
    setBgmSrc({ commit }, bgmSrc) {
      commit('setBgmSrc', bgmSrc)
    },
    toggleDisplay({ commit }, target) {
      commit('toggleDisplay', target)
    },
  },
  plugins: [
    createPersistedState()
  ],
})
