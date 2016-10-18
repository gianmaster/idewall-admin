<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>
            <div id="app" class="ui vertical stripe segment">
                <div class="ui container">
                    <div id="content" class="ui basic segment">
                        <h3 class="ui header">List of Users</h3>
                        <vuetable
                            api-url="api/v2/data"
                            table-wrapper="#content"
                            data-path="data"
                            pagination-path=""
                            :fields="columns"
                            :item-actions="itemActions"
                        ></vuetable>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

    import Vuetable from 'vuetable/src/components/Vuetable.vue';
    import VuetablePagination from 'vuetable/src/components/VuetablePagination.vue';
    import VuetablePaginationDropdown from 'vuetable/src/components/VuetablePaginationDropdown.vue';

    export default{
        components: {
            Vuetable, VuetablePagination, VuetablePaginationDropdown
        },
        data: function(){
            return {
                columns: [
                    'nombres',
                    'apellidos',
                    'email',
                    'identificacion',
                    'genero',
                    '__actions'
                ],
                itemActions: [
                    { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
                    { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
                    { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
                ]
            }
        },
        methods: {
            viewProfile: function(id) {
                console.log('view profile with id:', id)
            }
        },
        events: {
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)
                if (action == 'view-item') {
                    this.viewProfile(data.id)
                }
            },
            'vuetable:load-error': function(response) {
                console.log('Load Error: ', response)
            }
        }
    }

</script>

