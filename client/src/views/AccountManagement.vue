<template>
<div>
    <b-container fluid class="container">
        <b-row class="justify-content-center">
            <b-col cols="12" lg="5" md="8" sm="6">
                <b-form-group>
                    <b-input-group size="md">
                        <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="Type to Search">
                        </b-form-input>
                        <b-input-group-append>
                            <b-button :disabled="!filter" @click="filter= ''">Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>
            <b-col cols="6" lg="1" md="2" sm="3" class="mb-3">
                <b-button @click="suspendAccount">停用</b-button>
            </b-col>
            <b-col cols="6" lg="1" md="2" sm="3" class="mb-3">
                <b-button @click="unsuspendAccount">啟用</b-button>
            </b-col>
        </b-row>
        <b-row class="justify-content-md-center">
            <b-col col cols="12" sm="12" md="12" lg="7">
                <b-table sticky-header="500px" bordered
                head-variant="dark"
                :items="userList"
                :filter="filter"
                selectable
                selct-mode="multi"
                selected-variant="primary"
                @row-selected="onRowSelected"
                :fields="fields"
                :busy.sync="isLoading"
                >
                    <template slot="[selected]" slot-scope="{ rowSelected }">
                        <template v-if="rowSelected">
                            <span aria-hidden="true">&check;</span>
                            <span class="sr-only">Not selected</span>
                        </template>
                    </template>
                </b-table>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
export default{
    data(){
        return {
            fields: [
                'selected',
                {key:'account', sortable: true},
                {key:'token',sortable: true},
                {key:'status',sortable: true},
                {key:'auth',sortable: true}
            ],
            selected: [],
            filter: null,
            userList: [],
            isLoading: true
        }
    },
    mounted(){
        this.getUserList()
    },
    methods: {
        async getUserList(){
            this.isLoading=true
            await this.$store.dispatch('getUserList');
            this.userList=[]
            this.$store.getters.getUserList.forEach( user => {
                user['_cellVariants'] = {}
                if(user.status == 0){
                    user['_cellVariants']['status'] = 'danger'
                }
                else if(user.status == 1){
                    user['_cellVariants']['status'] = 'success'
                }
                this.userList.push(user)
            })
            this.isLoading=false
        },
        onRowSelected(items){
            this.selected = items
        },
        suspendAccount(){
            this.selected.forEach(user => {
                if(user.status == 1){
                    var data = {}
                    data.account = user.account
                    data.payload = {"status": 0}
                    this.$store.dispatch('suspendUser', data)
                }
            })
            this.getUserList()

        },
        unsuspendAccount(){
            this.selected.forEach(user => {
                if(user.status == 0){
                    var data = {}
                    data.account = user.account
                    data.payload = {"status": 1}
                    this.$store.dispatch('suspendUser', data)
                }
            })
            this.getUserList()
        }
    }
}
</script>
<style>
.container {
    align-self: flex-start;
    margin-top: 3%
}
</style>