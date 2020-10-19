<template>
  <v-card>
    <v-card-title>Cadastro de Projetos</v-card-title>
    <v-divider></v-divider>
    <v-form
      id="fCadastro"
      @submit.prevent="salvar"
      enctype="multipart/form-data"
    >
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="12" md="12" lg="12">
            <v-text-field
              label="Descrição"
              outlined
              dense
              name="name"
              id="iname"
              malength="80"
              required
              v-model="project.name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text type="submit" color="success">Salvar</v-btn>
        <v-btn color="error" text @click="closeDialog()">Fechar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script>
  export default {
    name: 'Project',
    props: [
      'project'
    ],
    data () {
      return {
      }
    },
    methods: {
      salvar () {
        this.$emit('item', this.project)
      },
      closeDialog () {
        this.project = {}
        this.$emit('fechar', false)
      }
    }
  }
</script>
