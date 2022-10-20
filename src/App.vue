<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  mounted() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.setToken(token)
    }
  },
  methods: {
    ...mapMutations(["setToken"]),
    logout() {
      sessionStorage.removeItem("token")
      this.$router.replace({ name: "Home" })
    }
  },
  computed: {
    ...mapState(["token"])
  }

}
</script>

<style>

</style>
