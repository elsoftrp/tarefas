<template>
  <v-card>
    <v-card-title>Cadastro de Tarefas</v-card-title>
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
              v-model="task.description"
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
    name: 'Task',
    props: ['task'],
    data () {
      return {
        
      }
    },
    methods: {
      salvar () {
        this.task.date = new Date()
        if (!this.task.id){
          this.task.status = ''
        }
        this.$emit('item', this.task)
      },
      closeDialog () {
        this.task = {}
        this.$emit('fechar', false)
      }
    }
  }
</script>
