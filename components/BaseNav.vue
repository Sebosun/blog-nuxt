<script setup lang="ts">
type Theme = "light" | "dark";

const colorMode = useColorMode();

const isCentered = useState("isCentered", () => false);

const setColorTheme = (newTheme: Theme) => {
  colorMode.preference = newTheme;
};
</script>
<template>
  <nav class="flex pr-4 py-8 dark:text-white dark:bg-black">
    <ul class="flex gap-8 text-2xl">
      <li class="list-item pr-2">
        <NuxtLink class="nav-item" to="/">Home</NuxtLink>
      </li>
      <li class="list-item pr-2">
        <NuxtLink class="nav-item" to="/about">About</NuxtLink>
      </li>
    </ul>

    <div class="ml-auto flex gap-4">
      <button @click="isCentered = !isCentered">
        <svg
          version="1.1"
          class="w-6 h-6 text-gray-50 dark:fill-white"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="800px"
          height="800px"
          viewBox="0 0 31.668 31.668"
          xml:space="preserve"
        >
          <g>
            <path
              d="M25.501,5H6.167V0h19.334V5z M0.168,8.889v5H31.5v-5H0.168z M6.167,17.777v5h19.334v-5H6.167z M0.168,31.668H31.5v-5H0.168
		V31.668z"
            />
          </g>
        </svg>
      </button>

      <button
        @click="
          setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
        "
      >
        <svg
          v-if="$colorMode.value == 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-50"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.list-item {
  position: relative;
}

.nav-item:hover::after {
  position: absolute;
  display: flex;
  transition: all;
  transition-duration: 0.3s;
  width: 100%;
  content: "";
  border-radius: 10px;
  border-bottom: 5px solid #f85552;
}

.dark .nav-item:hover::after {
  position: absolute;
  display: block;
  transition: all;
  transition-duration: 0.3s;
  width: 100%;
  content: "";
  border-radius: 10px;
  border-bottom: 5px solid #e67e80;
}
</style>
