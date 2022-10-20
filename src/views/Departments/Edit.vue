<template>
    <div class="">
        <b-loading v-model="loading" :is-full-page="false"></b-loading>
        <form action="#">
            <b-field label="Peer ID">
                <b-input v-model="department.peer_id"></b-input>
            </b-field>
            <b-field label="Nombre">
                <b-input v-model="department.name"></b-input>
            </b-field>
            <b-button @click="update()" icon-left="save" type="is-info" label="Actualizar"></b-button>
        </form>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import * as messages from "@/common/Messages"

export default {
    name: "DeparmentsEdit",
    data() {
        return {
            loading: false,
            department: {
                id: "",
                peer_id: "",
                name: ""
            }
        }
    },
    beforeMount() {
        this.axios
            .get(`departments/${this.$route.params.id}/edit`, { headers: { token: this.token } })
            .then(result => {
                this.department = result.data
            })
            .catch(err => {
                console.log(err);
            })
    },
    computed: {
        ...mapState(["token"])
    },
    methods: {
        update() {
            this.loading = true
            this.axios.put(`departments/${this.department.id}/update`, this.department, { headers: { token: this.token } })
                .then(() => {
                    this.loading = false
                    messages.SUCCESS()
                }).catch(({ response }) => {
                    if (response.status == 403) {
                        messages.INVALID_TOKEN()
                    }
                    switch (response.status) {
                        case 401:
                            messages.NO_TOKEN();
                            break;
                        case 403:
                            messages.INVALID_TOKEN();
                            break;
                        case 500:
                            response.data.forEach(element => {
                                messages.SERVER_ERROR({ message: element.message });
                            });
                            break;
                    }
                }).finally(() => {
                    this.loading = false;
                })
        }
    }
}
</script>

<style>

</style>