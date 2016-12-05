import fnc from '../../../../util/reusable_functions';
import {urlTiposDistri} from '../../config';

export default {
    methods: {
        //interactive
        clearModel: function(distributivo){
            this.model = {
                activo: 1,
                id: null,
                id_distributivo: distributivo.id,
                modificable: 0,
                nombre: '',
                orden: 0
            }
        },
        updateMode: function(model){
            this.model = model;
            this.mode = 'edit';
        },
        createMode: function(distributivo){
            this.clearModel(distributivo);
            this.mode = 'create';
        },
        deleteItem: function(model){
            this.deleteAction(model);
        },
        //switch action <formulario>
        submitEvent(){
            console.log('entre', this.mode, this.dataModel);
            if(this.mode == 'create'){
                this.addAction();
            }
            if(this.mode == 'edit'){
                this.updateAction();
            }
        },
        //CRUD
        updateAction(){
            this.formLoading = true;
            this.$http.put(`${urlTiposDistri}/${this.currentDistributivo.id}/item/${this.dataModel.id}`, this.dataModel).then(function(resp){
                this.loadItems();
            }, fnc.tryError);
        },
        addAction(){
            this.formLoading = true;
            this.$http.post(`${urlTiposDistri}/${this.currentDistributivo.id}/item`, this.dataModel).then(function(resp){
                this.loadItems();
            }, fnc.tryError);
        },
        deleteAction(model){
            if(confirm('¿Estás seguro de realizar esta acción?')){
                this.$http.delete(`${urlTiposDistri}/${this.currentDistributivo.id}/item/${model.id}`).then(function(resp){
                    this.loadItems();
                }, fnc.tryError);
            }
        },
        loadItems(){
            this.$http.get(`${urlTiposDistri}/${this.currentDistributivo.id}/item`).then(function(resp){
                this.currentDistributivo.items = resp.data.data;
                this.mode = 'list';
                this.formLoading = false;
            }, fnc.tryError);
        }
    }
}
