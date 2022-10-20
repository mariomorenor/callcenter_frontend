<template>
    <div class="">
        <b-loading :is-full-page="false" v-model="loading"></b-loading>
        <b-button class="mb-4" label="Nuevo" icon-left="plus" type="is-primary" tag="router-link"
            :to="{name:'DepartmentsCreate'}"></b-button>
        <b-table striped checkable type="" height="70vh" sticky-header :data="departments">
            <b-table-column field="peer_id" label="Peer ID" v-slot="props">
                {{props.row.peer_id}}
            </b-table-column>
            <b-table-column field="name" label="Nombre" v-slot="props">{{props.row.name}}</b-table-column>
            <b-table-column field="actions" label="" v-slot="props">
                <b-button tag="router-link" :to="{name:'DepartmentsEdit', params:{id:props.row.id}}" icon-left="edit"
                    class="mx-2 is-small" type="is-info"></b-button>
                <b-button @click="deleteDepartment(props.row.id)" icon-left="trash-alt" class="is-small"
                    type="is-danger"></b-button>
            </b-table-column>
        </b-table>
    </div>
</template>
  
<script>
import { mapState } from 'vuex';
import * as messages from "@/common/Messages"
import * as confirm from "@/common/Confirms"
import { HANDLE_ERROR_RESPONSE } from '@/common/tools';
export default {
    name: 'DepartmentsIndex',
    data() {
        return {
            departments: [],
            loading: false
        }
    },
    mounted() {
        this.getDepartments();
    },
    methods: {
        getDepartments() {
            this.loading = true;
            this.axios
                .get("departments", { headers: { token: this.token } })
                .then(response => {
                    this.departments = response.data
                })
                .catch(HANDLE_ERROR_RESPONSE)
                .finally(() => {
                    this.loading = false
                })
        },
        deleteDepartment(id) {
            confirm.DESTROY({
                onConfirm: () => {
                    this.loading = true
                    this.axios.delete(`departments/${id}/destroy`, {
                        headers: { token: this.token }
                    }).then(() => {
                        messages.SUCCESS();
                        this.getDepartments();
                    }).catch(HANDLE_ERROR_RESPONSE).finally(() => {
                        this.loading = false;
                    })
                }
            })
        }
    },
    computed: {
        ...mapState(["token"])
    }
}
</script>
  