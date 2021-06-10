<template>
  <v-container fluid class="pa-7 pa-lg-10">
    <h1 class="pb-5">Usuarios</h1>
    <v-alert v-if="alert.show" :type="alert.type" dismissible>
      {{ alert.text }}
    </v-alert>
    <v-data-table
      v-if="allUsers"
      :headers="headers"
      :items="allUsers"
      :hide-default-footer="true"
      class="elevation-2"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="primary">
              <span class="text-h5 white--text">Editar usuario</span>
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" ref="form">
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
                        dense
                        :rules="emailRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.phone"
                        label="Teléfono"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.address.street"
                        label="Calle"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.address.suite"
                        label="Departamento"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.address.city"
                        label="Ciudad"
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.address.zipcode"
                        label="Código postal"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="editedItem.website"
                        label="Website"
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.company.name"
                        label="Nombre empresa"
                        readonly
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        label="Descripción"
                        rows="3"
                        no-resize
                        readonly
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="close"> Cerrar </v-btn>
              <v-btn color="green lighten-1" text @click="save">
                Guardar
              </v-btn>
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
              <v-btn color="red" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="secondary" text @click="deleteItemConfirm"
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
        <v-icon
          @click="deleteItem(item.id)"
          class="pa-2"
          aria-label="Eliminar usuario"
          title="Eliminar usuario"
        >
          fas fa-trash
        </v-icon>

        <v-icon
          @click="editItem(item)"
          class="pa-2"
          aria-label="Editar usuario"
          title="Editar usuario"
        >
          fas fa-edit
        </v-icon>

        <v-icon
          @click="showItem(item.id)"
          class="pa-2"
          aria-label="Ver posts del usuario"
          title="Ver posts del usuario"
        >
          fas fa-play
        </v-icon>
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
      name: '',
      username: '',
      email: '',
      phone: '',
      website: '',
      address: {},
      company: {},
    },
    alert: { type: '', text: '', show: false, },
    valid: false,
    emailRules: [
      v => v.length > 0 || 'Debes ingresar un email'],
  }),

  watch: {
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  methods: {
    clearEditedItem: function () {

      this.editedItem.id = '';
      this.editedItem.name = '';
      this.editedItem.username = '';
      this.editedItem.email = '';
      this.editedItem.phone = '';
      this.editedItem.website = '';
      this.editedItem.address = {};
      this.editedItem.company = {};
    },

    showAlert: function (type, action) {
      this.alert.type = type;
      if (type == "success") {
        this.alert.text = "El registro se ha " + action + " exitosamente.";
      } else {
        this.alert.text = "El registro no pudo ser " + action + ". Por favor, reintente más tarde.";
      }
      this.alert.show = true;
    },

    showItem: function (id) {
      this.$emit('showItem', id);
    },

    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true;
      this.alert.show = false;
    },

    deleteItem (id) {
      this.idDelete = id;
      //  console.log('idDelete: ' + this.idDelete);
      this.dialogDelete = true;
      this.alert.show = false;
    },

    deleteItemConfirm () {
      axios.delete("https://jsonplaceholder.typicode.com/users/" + this.idDelete)

        .then((response) => {
          console.log(response);
          this.allUsers.splice(this.allUsers.findIndex(user => user.id == this.idDelete), 1);
          this.showAlert('success', 'eliminado');
        })
        .catch((error) => {
          console.log(error);
          this.showAlert('error', 'eliminado');
        })
        .then(() => {
          this.closeDelete();
        });
    },

    close () {
      this.dialog = false;
      this.clearEditedItem();
    },

    closeDelete () {
      this.dialogDelete = false;
      this.idDelete = null;
    },

    save () {
      if (this.$refs.form.validate()) {
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
          .then((response) => {
            console.log(response);

            let index = this.allUsers.findIndex(user => user.id == this.editedItem.id);

            this.allUsers[index].email = this.editedItem.email;
            this.allUsers[index].phone = this.editedItem.phone;
            this.allUsers[index].address.street = this.editedItem.address.street;
            this.allUsers[index].address.suite = this.editedItem.address.suite;
            this.allUsers[index].address.city = this.editedItem.address.city;
            this.allUsers[index].address.zipcode = this.editedItem.address.zipcode;

            this.showAlert('success', 'editado');

          })
          .catch((error) => {
            console.log(error);
            this.showAlert('error', 'editado');
          })
          .then(() => {
            this.close();
          });
      }
    },
  }
};

</script>
