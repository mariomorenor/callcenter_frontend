<template>
    <div class="container">
        <b-button icon-left="arrow-left" label="Regresar" type="is-warning" tag="router-link" :to="{name:'DepartmentsIndex'}"></b-button>
        <b-loading :is-full-page="false" v-model="loading"></b-loading>
        <form action="#" class="mt-5">
            <b-field label="Peer ID">
                <b-input v-model="department.peer_id"></b-input>
            </b-field>
            <b-field label="Nombre">
                <b-input v-model="department.name"></b-input>
            </b-field>
            <b-button :disabled="!passValidations" label="Guardar" icon-left="save" type="is-info" @click="save()">
            </b-button>
        </form>
    </div>
</template>    

<script>
import { mapState } from 'vuex';
import * as messages from "@/common/Messages"
import { HANDLE_ERROR_RESPONSE } from '@/common/tools';

export default {
    name: "DepartmentCreate",
    data() {
        return {
            department: {
                peer_id: "",
                name: ""
            },
            loading: false,
        }
    },
    methods: {
        save() {
            this.loading = true
            this.axios
                .post("/departments", this.department, { headers: { token: this.token } })
                .then(() => {
                    messages.SUCCESS()
                })
                .catch(HANDLE_ERROR_RESPONSE)
                .finally(() => {
                    this.loading = false;
                    this.department = {
                        peer_id: "",
                        name: ""
                    }
                })
        }
    },
    computed: {
        ...mapState(["token"]),
        passValidations() {
            if (this.department.peer_id == "") {
                return false
            }
            if (this.department.name == "") {
                return false
            }
            return true
        }
    }
}
</script>