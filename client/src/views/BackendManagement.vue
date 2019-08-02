<template>
<div class="backendManagement">
    <b-container fluid>
        <b-row>
            <b-dropdown id="permission_selection" :text="text">
                <b-dropdown-item-button>0</b-dropdown-item-button>
                <b-dropdown-item-button>1</b-dropdown-item-button>
                <b-dropdown-item-button>2</b-dropdown-item-button>
            </b-dropdown>
        </b-row>
    </b-container>
</div>
</template>

<script>
export default{
    data(){
        return {
            text: "AAAAAA"
        }
    }
}
</script>