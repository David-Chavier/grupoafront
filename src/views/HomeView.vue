<template>
  <div class="home">
    <RegistrationList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RegistrationList from "@/components/RegistrationList.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    RegistrationList,
  },
});
</script>
