<template>
  <div
    v-if="!isMobile"
    class="app"
  >
    Hello, world!
  </div>
</template>

<script lang="ts" setup>
import {
  computed, ref,
} from 'vue';
import observeWindowSize from '../utils/observeWindowSize';

const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value <= 768);

observeWindowSize(({ width }: { width: number }) => {
  windowWidth.value = width;
});
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
@import "@/assets/scss/responsive.scss";

.app {
  position: relative;
  height: 100%;
  max-height: 100vh;
  max-width: 100vw;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;

  ::-webkit-scrollbar {
    width: .5rem;

    @include layout-mobile {
      width: .3rem;
      height: 0;
    }
  }

  ::-webkit-scrollbar-track {
    background-color:  transparent;
    -webkit-border-radius: .6rem;
    border-radius: 3rem;

    @include layout-mobile {
      -webkit-border-radius: .5rem;
      border-radius: 3rem;
    }
  }

  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: .6rem;
    border-radius: .6rem;
    background: white;

    @include layout-mobile {
      -webkit-border-radius: .5rem;
      border-radius: .5rem;
    }
  }
}
</style>
