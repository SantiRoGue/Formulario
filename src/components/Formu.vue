<template>
    <b-container>
        <form @submit.prevent="registrarse" v-if="!completed">
            <b-row class="m-3">
                <b-col>
                 <b-form-input type="text" v-model="usuario" :state="!alerta.error" name="usuario" placeholder="Usuario" v-on:keyup="retraso"></b-form-input>
                <small v-if="alerta.error">{{alerta.message}}</small>                 
                </b-col>
            </b-row>
            <b-row class="m-3">
                <b-col>
                 <b-form-input type="text" v-model="nombre" :state="comprobarName" name="nombre" placeholder="Nombre"></b-form-input>
                 <small v-if="!comprobarName">Escribe al menos tres cracteres.</small>        
                </b-col>
            </b-row>
            <button type="submit" class="btn btn-primary" :disabled="habilitarRegistro">Registrar</button>
        </form>
        <div v-else>
            <h3 class="m-3">Registro completado con éxito</h3> 
            <button type="submit" class="btn btn-primary m-3" @click="restore">Nuevo Registro</button>
        </div>
        <div class="modal" v-if="cargando">
            <b-spinner/>
        </div>
    </b-container>
</template>



<script>
import _ from 'lodash';
export default {
  name: 'Formu',
  data(){
      return{
          usuario:'',
          nombre:'',
          alerta: {
                error: true,
                message: 'Escribe al menos tres caracteres.',
          },
          users: [],
          cargando: false,
          completed: false,
        }
    },


  computed:{
      comprobarUser(){
        return this.usuario.length > 2? true : false;
      },
      comprobarName(){
        return this.nombre.length > 2? true : false;
      },
      loading(){
          return this.users.length > 0? true : false;
      },
      habilitarRegistro() {
          return this.alerta.error || !this.comprobarName || this.cargando;
      },
    },

    
    methods:{
        

        async registrarse(){
            
            this.cargando = true;
            let result = await fetch("/api/users", { method: 'post', body: JSON.stringify({ usuario: this.usuario, name: this.nombre }) });
            if (result) this.completed = true;
            this.cargando = false;

        },

        restore() {
            this.usuario = '';
            this.nombre = '';
            this.alerta = {
                error: true,
                message: 'Escribe al menos tres caracteres.',
            };
            this.completed = false;
        },

        retraso: _.debounce (async function(){
            this.cargando = true;
            let response = await fetch("/api/users");
            let {users} = await response.json();            
            if (Array.isArray(users)) {
                let occurrence = users.some(user => this.usuario === user.usuario);
                if (occurrence || this.usuario.length < 3) {
                    this.alerta = { error: true, message: occurrence ? 'No disponible' : 'Escribe al menos tres caracteres.' }
                }else {
                    this.alerta = { error: false, message: 'Disponible' }
                }
            }
            this.cargando = false;
        }, 300)
    }

}
</script>
<style scoped>
    .modal {
        display: flex;
        position: absolute;
        height: 100vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        background: lightgray;
        opacity: 0.2;
    }
</style>