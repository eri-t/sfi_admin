<template>
  <v-container fluid class="pa-7 pa-lg-10">
    <h1 class="pb-5">Usuarios</h1>
    <v-data-table
      v-if="allUsers"
      :headers="headers"
      :items="allUsers"
      :hide-default-footer="true"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Editar usuario</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Usuario"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Teléfono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.address.street"
                      label="Calle"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.address.suite"
                      label="Departamento"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.address.city"
                      label="Ciudad"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.address.zipcode"
                      label="Código postal"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="editedItem.website"
                      label="Website"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.company.name"
                      label="Nombre empresa"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      label="Descripción"
                      no-resize
                      readonly
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cerrar </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6 justify-center"
              >¿Está seguro de eliminar este usuario?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Eliminar</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>

      <template v-slot="allUsers">
        <tr v-for="item in allUsers" :key="item.id">
          <td v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
        </tr>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="deleteItem(item.id)"> fas fa-trash </v-icon>

        <v-icon class="mr-2" @click="editItem(item)"> fas fa-edit </v-icon>
        <!--
        <router-link :to="'/user/' + item.id">
        -->
        <v-icon @click="showItem(item.id)"> fas fa-play </v-icon>
        <!--
        </router-link>
        -->
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "tableSection",
  props: ['allUsers'],

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nombre', value: 'name' },
      { text: 'Usuario', value: 'username' },
      { text: 'Email', value: 'email' },
      { text: 'Teléfono', value: 'phone' },
      { text: 'Website', value: 'website' },
      { text: 'Nombre empresa', value: 'company.name' },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],

    idDelete: null,
    editedItem: {
      id: '',
      username: '',
      email: '',
      phone: '',
      address: {},
      company: {},
    },
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    showItem: function (id) {
      this.$emit('showItem', id);
    },

    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (id) {
      this.idDelete = id;
      console.log('idDelete: ' + this.idDelete);
      this.dialogDelete = true;
    },

    deleteItemConfirm () {
      axios.delete("https://jsonplaceholder.typicode.com/users/" + this.idDelete)

        .then(function (response) {
          // handle success
          console.log(response);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed

        });

      this.idDelete = null;
      console.log('idDelete: ' + this.idDelete);
      this.closeDelete()
    },

    close () {
      this.dialog = false
      /*
      this.editedItem.id = '';
      this.editedItem.username = '';
      this.editedItem.email = '';
      this.editedItem.phone = '';
      this.editedItem.address = {};
      this.editedItem.company = {};
      */
    },

    closeDelete () {
      this.dialogDelete = false;
      this.idDelete = null;
    },

    save () {
      axios.put("https://jsonplaceholder.typicode.com/users/" + this.editedItem.id, {
        email: this.editedItem.email,
        phone: this.editedItem.phone,
        address: {
          street: this.editedItem.address.street,
          suite: this.editedItem.address.suite,
          city: this.editedItem.address.city,
          zipcode: this.editedItem.address.zipcode,
        }
      })

        .then(function (response) {
          // handle success
          console.log(response);

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed

        });
      this.editedItem.id = '';
      this.editedItem.username = '';
      this.editedItem.email = '';
      this.editedItem.phone = '';
      this.editedItem.address = {};
      this.editedItem.company = {};

      this.close()

    },
  }
};
</script>