<template>
  <div class="home">
    <b-navbar type="is-black">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          PUCE-SD Call Center
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item>
          <b-button @click="logout()" type="is-danger" label="Cerrar Sesión" icon-left="sign-out-alt"></b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      localStorage.removeItem("session");
      this.$router.replace({ name: "Login" })
    }
  }
}
</script>
