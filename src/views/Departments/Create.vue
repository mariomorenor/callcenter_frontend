<template>
    <div class="container">
        <b-button icon-left="arrow-left" type="is-warning" tag="router-link" :to="{name:'DepartmentsIndex'}"></b-button>
        <b-loading :is-full-page="false" v-model="loading"></b-loading>
        <b-field label="Peer ID">
            <b-input v-model="department.peer_id"></b-input>
        </b-field>
        <b-field label="Nombre">
            <b-input v-model="department.name"></b-input>
        </b-field>
        <b-button :disabled="!passValidations" label="Guardar" icon-left="save" type="is-info" @click="save()">
        </b-button>
    </div>
</template>    

<script>
import { mapState } from 'vuex';
import * as messages from "@/common/Messages"

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
                .catch(({ response }) => {
                    if (response.status == 403) {
                        messages.INVALID_TOKEN()
                    }
                    switch (response.status) {
                        case 403:
                            messages.INVALID_TOKEN()
                            break;
                        case 500:
                            response.data.forEach(element => {
                                messages.SERVER_ERROR({ message: element.message });
                            });
                            break;
                    }
                })
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