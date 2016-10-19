<template>

    <div class="row">
        <div class="col-xs-12">
            <h2>Esperando por los plugins</h2>
            <div class="">
                <table>
                    <thead>
                    <tr>
                        <th>Campo 1</th>
                        <th>Campo 1</th>
                        <th>Campo 1</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Item 1</td>
                        <td>Item 2</td>
                        <td>Item 3</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="">
                <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
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
                classDom: {
                    container: 'pagination-container',
                    ul: 'pagination',
                    li: '',
                    disabled: 'disabled',
                    active: 'active'
                },
                templateDom: {
                    next: '<span>Next</span>',
                    prev: '<span>Prev</span>',
                    item: '<span>$1</span>'
                },
                config: {
                    serverSide: false,
                    data: [],
                    url: '',
                    total: 50,
                    per_page: 15,
                    current_page: 1,
                    last_page: 4,
                    from: 1,
                    to: 15
                }
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

