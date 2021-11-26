<template>
  <div id="app">
    <div class="container-fluid">
      <nav id="nav" class="navbar navbar-expand-sm navbar-light px-0">
        <div class="container-fluid d-flex justify-content-between px-0">
          <router-link to="/movierecommend">
            <a class="navbar-brand nes-balloon from-left fw-bold">이거 어때?</a>
          </router-link>
          <div>
            <button class="navbar-toggler nes-btn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse fs-4" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link class="nav-link" to="/boxoffice">Box Office</router-link>
                  <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/movierecommend">Movie Recommend</router-link>
                </li>

                <div v-if="!this.$store.state.jwtIsValid" class="d-flex">
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Signup' }">회원가입</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'Login' }">로그인</router-link>
                  </li>
                </div>
                <li class="nav-item dropdown">
                  <a v-if="this.$store.state.jwtIsValid" class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    더 보기
                  </a>
                  <ul v-if="this.$store.state.jwtIsValid" class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><router-link class="dropdown-item" @click.native="logout" to='#'>로그아웃</router-link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav> 
    </div>

    <div class="container mb-5 router-view">
      <router-view @login="this.$store.dispatch('validateJwt')"/>
    </div>

    <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light sticky-bottom fs-5 mt-5 " id="footer">
      <div class="container justify-content-btween">
        <div>
        </div>
        <div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <p class="nav-link" aria-current="page" href="#">Copyright 2021.</p>
              </li>
              <li class="nav-item d-flex ">
                <i class="nes-icon github is-small mt-3"></i>
                <a class="nav-link contact" href="https://github.com/onys-programmer">onys-programmer</a>
                <i class="nes-icon github is-small mt-3"></i>
                <a class="nav-link contact" href="https://lab.ssafy.com/glowforever42">glowforever42</a>
              </li>
              <li class="nav-item">
                <p class="nav-link" href="#">all rights reserved.</p>
              </li>
            </ul>
          </div>          
        </div>
        <div>
        </div>
      </div>
    </nav>
    <!-- <figure>
      <audio
        id="myaudio"
        autoplay
        controls
        src="./assets/sounds/boxofficeBgm.mp3">
            Your browser does not support the
            <code>audio</code> element.
      </audio>
    </figure> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    logout() {
      localStorage.removeItem('jwt')
      this.$store.dispatch('validateJwt')
      this.$router.push({ name: 'BoxOffice' })
    }
  },
  created() {
    this.$store.dispatch('validateJwt')
  }
}
</script>

<style>
@font-face {
  font-family: 'DungGeunMo';
  src: local(DungGeunMo),
    url('./assets/fonts/DungGeunMo.eot?1wm9b1#iefix') format('embedded-opentype'),
    url('./assets/fonts/DungGeunMo.ttf?1wm9b1') format('truetype'),
    url('./assets/fonts/DungGeunMo.woff?1wm9b1') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

.router-view {
  min-height: 36rem;
}

figure {
  background-color: #F8F9FA;
}

#app {
  font-family: DungGeunMo, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: white;
  color: #2c3e50;
  width: 1000px;
  margin: 0 auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a:hover {
  font-weight: bold;
  color: #42b983;
  transform: translateY(-3px);
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#footer {
  padding-top: 1.3rem;
  border: 5px solid;
  border-style: solid none none none;
  /* position:fixed; 
  left:0px; 
  bottom:0px;
  height:50px; 
  width:100%;   */
}

.contact:hover {
  animation-duration: 2s;
  animation-name: rainbowLink; 
  animation-iteration-count: infinite;
  transform: translateY(-3px);
}

input {
  width: 15rem;
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