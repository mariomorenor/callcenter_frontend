<template>
    <div class="login mt-5">
        <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
        <form action="#">
            <b-field label="Usuario">
                <b-input v-model="user"></b-input>
            </b-field>
            <b-field label="Contraseña">
                <b-input @keypress.native.enter="login()" v-model="password" type="password" password-reveal></b-input>
            </b-field>
            <b-button :disabled="disabledLoginButton" @click="login()" label="Iniciar Sesión" icon-left="sign-in-alt"
                type="is-primary">
            </b-button>
        </form>
    </div>
</template>
  
<script>
import { HANDLE_ERROR_RESPONSE } from '@/common/tools';
import { mapMutations } from 'vuex';

export default {
    name: 'LoginView',
    data() {
        return {
            user: "",
            password: "",
            isLoading: false
        }
    },
    methods: {
        ...mapMutations(["setToken"]),
        login() {
            this.isLoading = true
            this.axios.post("login", {
                email: this.user,
                password: this.password
            })
                .then((response) => {
                    this.setToken(response.headers.token)
                    sessionStorage.setItem("token", response.headers.token)
                    this.$router.replace({ name: "Home" })
                }).catch(HANDLE_ERROR_RESPONSE).finally(() => {
                    this.isLoading = false
                })
        }
    },
    computed: {
        disabledLoginButton() {
            if (this.user == "") {
                return true
            }
            if (this.password == "") {
                return true
            }
            return false
        }
    }
}
</script>

<style scoped>
form {
    width: 30%;
    margin: auto;
}

@media screen and (max-width:768px) {
    form {
        width: 90%;
        margin: auto;
    }
}
</style>
  