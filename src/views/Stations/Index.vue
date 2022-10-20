<template>
    <div class="">
        <b-loading :is-full-page="false" v-model="loading"></b-loading>
        <!-- Las estaciones no se pueden crear desde aquí, automaticamente deben generarse cuando 
        se conecta un cliente -->
        <!-- <b-button class="mb-4" label="Nuevo" icon-left="plus" type="is-primary" tag="router-link"
            :to="{name:'StationsCreate'}"></b-button> -->
        <b-table striped checkable type="" height="70vh" sticky-header :data="stations">
            <b-table-column field="ip_address" label="Dirección IP" v-slot="props">
                {{props.row.ip_address}}
            </b-table-column>
            <b-table-column field="name" label="Nombre" v-slot="props">{{props.row.name}}</b-table-column>
            <!-- BUTTONS -->
            <b-table-column field="actions" label="" v-slot="props">
                <b-button tag="router-link" :to="{name:'StationsEdit', params:{id:props.row.id}}" icon-left="edit"
                    class="mx-2 is-small" type="is-info"></b-button>
                <b-button @click="deleteStation(props.row.id)" icon-left="trash-alt" class="is-small"
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
    name: 'StationsIndex',
    data() {
        return {
            stations: [],
            loading: false
        }
    },
    mounted() {
        this.getStations();
    },
    methods: {
        getStations() {
            this.loading = true;
            this.axios
                .get("stations", { headers: { token: this.token } })
                .then(response => {
                    this.stations = response.data
                })
                .catch(HANDLE_ERROR_RESPONSE)
                .finally(() => {
                    this.loading = false
                })
        },
        deleteStation(id) {
            confirm.DESTROY({
                onConfirm: () => {
                    this.loading = true
                    this.axios.delete(`stations/${id}/destroy`, {
                        headers: { token: this.token }
                    }).then(() => {
                        messages.SUCCESS();
                        this.getstations();
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
  