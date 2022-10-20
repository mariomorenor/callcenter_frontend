<template>
  <div class="home">
    <b-navbar type="is-black" fixed-top>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name:'Home' }">
          PUCE-SD Call Center
        </b-navbar-item>
      </template>
      <template #start>
        <b-navbar-item tag="router-link" :to="{name:'DepartmentsIndex'}">
          Departamentos
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{name:'StationsIndex'}">
          Estaciones
        </b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item>
          <b-button @click="logout()" type="is-danger" label="Cerrar Sesión" icon-left="sign-out-alt"></b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    logout() {
      sessionStorage.removeItem("token")
      this.$router.replace({ name: "Login" })
    }
  }
}
</script>
