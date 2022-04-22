<template>
  <div id="app">
    <div class="home-container">
      <div
        class="nav-sidebar"
        :class="{ 'nav-sidebar-expanded': isExpanded, 'nav-float': isExpanded && navFloat }"
        ref="sidebar"
      >
        <div class="btn-container" ref="btn">
          <button type="button" class="nav-btn" @click="expand">
            <i class="bi bi-list"></i>
          </button>
        </div>

        <div class="nav-item-container" @click="activate" ref="nav-item-container">
          <router-link to="/dashboard">
            <div class="nav-item">
              <i class="bi bi-speedometer2"></i>
              <span v-show="isExpanded || navFloat">Dashboard</span>
            </div>
          </router-link>
          <router-link to="/system">
            <div class="nav-item nav-item-active">
              <i class="bi bi-hdd-stack"></i>
              <span v-show="isExpanded || navFloat">System</span>
            </div>
          </router-link>
          <router-link to="/metadata">
            <div class="nav-item">
              <i class="bi bi-boxes"></i>
              <span v-show="isExpanded || navFloat">Metadata</span>
            </div>
          </router-link>
          <router-link to="/data-center">
            <div class="nav-item">
              <i class="bi bi-bar-chart"></i>
              <span v-show="isExpanded || navFloat">DataCenter</span>
            </div>
          </router-link>
          <router-link to="/scheduler">
            <div class="nav-item">
              <i class="bi bi-stopwatch"></i>
              <span v-show="isExpanded || navFloat">Scheduler</span>
            </div>
          </router-link>
          <router-link to="/notifications">
            <div class="nav-item">
              <i class="bi bi-envelope"></i>
              <span v-show="isExpanded || navFloat">Notifications</span>
            </div>
          </router-link>
          <router-link to="/rule-engine">
            <div class="nav-item">
              <i class="bi bi-sliders"></i>
              <span v-show="isExpanded || navFloat">RuleEngine</span>
            </div>
          </router-link>
          <router-link to="/app-service">
            <div class="nav-item">
              <i class="bi bi-cloud-arrow-up"></i>
              <span v-show="isExpanded || navFloat">AppService</span>
            </div>
          </router-link>
        </div>
      </div>

      <div class="content" :class="{ 'content-expanded': isExpanded && !navFloat }" ref="content">
        <nav class="center-header px-3 pt-2 font-weight-bold">
          <div class="nav-router mw-100 align-middle">
            <h4 class="d-inline">{{ pathChain[pathChain.length - 1] }}</h4>
          </div>
          <div class="mw-100 align-middle mt-1">
            <div class="d-inline">
              <h6 class="d-inline" v-for="(path, index) in pathChain" :key="path.key">
                <a
                  class="text-decoration-none d-inline"
                  v-if="index !== pathChain.length - 1"
                  :href="pathMap.get(path)"
                >
                  {{ path }}
                </a>
                <span v-if="index !== pathChain.length - 1" class="px-1">&gt;</span>
                <span v-else class="text-decoration-none d-inline">{{ path }}</span>
              </h6>
            </div>
          </div>
        </nav>
        <div class="mfe" id="mfe" ref="mfe"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const pathChain = ref([])
    const pathMap = ref(new Map())
    const route = useRoute()

    let getPathChain = function (path) {
      let paths = path.split('/').slice(1)
      if (paths.length === 0) {
        return []
      }

      return Array.from(
        paths.map(p =>
          p
            .split('-')
            .map(item => item.charAt(0).toUpperCase() + item.slice(1))
            .join(' ')
        )
      )
    }

    let getPathMap = function (chain, path) {
      let paths = path.split('/').slice(1)
      if (paths.length === 0) {
        return new Map()
      }

      let map = new Map()
      let curPath = ''
      chain.forEach((item, index) => {
        curPath += '/' + paths[index]
        map.set(item, curPath)
      })

      return map
    }

    watchEffect(() => {
      console.log('[route update]', route.path)
      pathChain.value = getPathChain(route.path)
      pathMap.value = getPathMap(pathChain.value, route.path)
    })

    return {
      pathChain: pathChain,
      pathMap: pathMap,
    }
  },
  data() {
    return {
      isExpanded: false,
      navFloat: false,
    }
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded
      if (document.body.clientWidth < 1000) {
        console.log('clientWidth', document.body.clientWidth)
        this.navFloat = this.isExpanded
      } else {
        this.navFloat = false
      }
      let navItemContainer = this.$refs['nav-item-container']
      if (this.navFloat) {
        navItemContainer.classList.toggle('nav-item-container-float')
        this.$refs.btn.classList.toggle('btn-container-float')
      } else {
        navItemContainer.classList.remove('nav-item-container-float')
        this.$refs.btn.classList.remove('btn-container-float')
      }
      let items = navItemContainer.childNodes
      items.forEach(item => {
        item.childNodes[0].classList.toggle('nav-sidebar-expanded')
      })
    },
    activate(event) {
      if (event.target.nodeName.toLowerCase() === 'div') {
        this.toggleActive(event.target, event.currentTarget)
      } else {
        this.toggleActive(event.target.parentNode, event.currentTarget)
      }
    },
    toggleActive(node, parentNode) {
      let items = parentNode.childNodes
      items.forEach(item => {
        item.childNodes[0].classList.remove('nav-item-active')
      })
      node.classList.add('nav-item-active')
    },
  },
}
</script>

<style>
html,
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  height: 100%;
}

.home-container {
  margin: 0;
  padding: 0;
  height: 100%;
  --shrink-width: 60px;
  --expand-width: 250px;
}

.nav-sidebar {
  color: white;
  font-size: 30px;
  position: fixed;
  width: var(--shrink-width);
  height: 100%;
  transition: 0.6s all;
}

.nav-float {
  position: absolute !important;
  z-index: 999;
  transition: 0.6s all;
}

.nav-sidebar-expanded {
  width: var(--expand-width);
}

.btn-container {
  padding: 10px 0;
  background-color: rgba(45, 40, 72, 0.993);
}

.btn-container-float {
  background-color: rgba(45, 40, 72, 0.8) !important;
}

.nav-btn {
  border: none;
  color: inherit !important;
  background-color: transparent;
  position: relative;
  left: calc(var(--shrink-width) / 2);
  transform: translateX(-50%) !important;
}

.nav-item-container {
  height: 100%;
  background-color: rgba(65, 60, 89, 0.993);
}

.nav-item-container-float {
  background-color: rgba(65, 60, 89, 0.8) !important;
}

.nav-item-container a {
  text-decoration: none;
  color: inherit;
}

.nav-item {
  padding: 10px 0;
  font-size: 1.5rem;
  white-space: nowrap;
  transition: 0.6s all;
}

.nav-item i {
  display: inline-block;
  padding: 0 !important;
  position: relative;
  left: calc(var(--shrink-width) / 2);
  transform: translateX(-50%) !important;
}

.nav-item span {
  font-size: 1.2rem;
  display: inline-block;
  position: relative;
  left: calc(var(--shrink-width) / 2);
  padding: 0 !important;
}

.nav-item-active {
  background-color: rgba(97, 53, 82, 0.5);
}

.nav-item:hover {
  background-color: rgba(97, 53, 82, 0.5);
  color: white;
}

.content {
  position: relative;
  min-height: 100vh;
  margin: 0;
  margin-left: var(--shrink-width);
  padding: 0;
  transition: 0.6s all;
}

.content-expanded {
  margin-left: var(--expand-width);
}

.center-header {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 998;
  height: 65px;
  width: 100%;
  background-color: rgb(250, 248, 248);
}

.mfe {
  padding: 15px;
  background-color: rgb(245, 245, 245);
  min-height: calc(100vh - 65px);
}
</style>
