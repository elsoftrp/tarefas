<template>
  <v-app id="inspire">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-btn
          fab
          absolute
          bottom
          class="ma-3 "
          color="purple"
          @click="addProject"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
    </v-app-bar>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

        <div>Edson</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col v-for="project in projects" :key="project.id" cols="12">
            <v-card>
              <v-subheader>
                <h2>{{ project.name }}</h2>
                <v-col cols="2">
                  <v-icon class="mr-2" @click="editProject(project)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon class="mr-2" @click="deleteProject(project)"
                    >mdi-delete</v-icon
                  >
                </v-col>
              </v-subheader>
              <v-btn
                class="ml-5"
                fab
                x-small
                color="primary"
                @click="addTask(project.id)"
                ><v-icon dark>mdi-plus</v-icon></v-btn
              >

              <v-list two-line>
                <template v-for="task in project.tasks">
                  <v-list-item :key="task.id">
                    <v-list-item-avatar :color=" statusDone(task) ? 'green darken-2' : 'deep-orange darken-1' " >
                      <v-icon v-show="!statusDone(task)">mdi-gavel</v-icon>
                      <v-icon v-show="statusDone(task)">mdi-checkbox-marked-circle</v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        <v-row
                          ><v-col cols="6">
                            Tarefa: {{ task.description }}</v-col
                          >
                          <v-col cols="2">
                            <v-icon class="mr-2" @click="editTask(task)"
                              >mdi-pencil</v-icon
                            >
                            <v-icon class="mr-2" @click="deleteTask(task)"
                              >mdi-delete</v-icon
                            >
                            <v-btn  v-show="!statusDone(task) " class="mr-2" text icon color="blue lighten-2"><v-icon @click="doneTask(task)"
                              >mdi-thumb-up</v-icon
                            ></v-btn>
                            <v-btn v-show="statusDone(task)" class="mr-2" text icon color="red lighten-2"> <v-icon  @click="undoneTask(task)"
                              >mdi-thumb-down</v-icon
                            ></v-btn>
                          </v-col>
                        </v-row>
                      </v-list-item-title>

                      <v-list-item-subtitle
                        >Data:
                        {{
                          new Date(task.date).toLocaleString('pt-br', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })
                        }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <!--<v-divider
                    v-if="index !== 6"
                    :key="`divider-${task}`"
                    inset
                  ></v-divider>-->
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <div>
      <v-dialog
        style="height: 600px;"
        v-model="dialog"
        scrollable
        max-width="600px"
      >
        <project @fechar="closeDialog" @item="itemProject" :project="project"> </project>
      </v-dialog>
    </div>
    <div>
      <v-dialog
        style="height: 600px;"
        v-model="dialog2"
        scrollable
        max-width="600px"
      >
        <task @fechar="closeDialogTask" @item="itemTask" :task="task"> </task>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
  import Project from './components/Project'
  import Task from './components/Task'
  export default {
    name: 'Principal',
    components: { Project, Task },
    data() {
      return {
        dialog: false,
        dialog2: false,
        task: {},
        project:{
          tasks:[]
        },
        projects:[
          
        ],
        /*projects: [
          {
            id: 1,
            name: 'Projeto1',
            tasks: [
              {
                id: 1,
                projectid: 1,
                date: '2020-10-12',
                description: 'task1',
                status: 'done',
              },
              {
                id: 2,
                projectid: 1,
                date: '2020-10-13',
                description: 'task2',
                status: 'done',
              },
            ],
          },
          {
            id: 2,
            name: 'Projeto2',
            tasks: [
              {
                id: 3,
                projectid: 2,
                date: '2020-10-15',
                description: 'task4',
                status: 'done',
              },
              {
                id: 4,
                projectid: 2,
                date: '2020-10-16',
                description: 'task5',
                status: 'done',
              },
            ],
          },
        ],*/
        drawer: null,
        links: [
          ['mdi-inbox-arrow-down', 'Dashboard'],
        ],
      }
    },
    methods: {
      gravarStore () {
        const parsed = JSON.stringify(this.projects)
        if (localStorage.getItem('tarefas')) {
          localStorage.removeItem('tarefas')
        }
        localStorage.setItem('tarefas', parsed)
      },
      carregarStore () {
        if (localStorage.getItem('tarefas')) {
          this.projects = JSON.parse(localStorage.getItem('tarefas'))
        }
      },
      addProject() {
        this.project = { tasks:[]}
        this.dialog = true
      },
      addTask(value) {
        this.task = {}
        this.task.projectid = value
        this.dialog2 = true
      },
      closeDialog(value) {
        this.dialog = value
      },
      closeDialogTask(value) {
        this.dialog2 = value
      },
      itemProject(value) {
        if (!value.id || value.id === '') {
          value.id = Math.floor(Math.random()*256)
          this.projects.push(value)
        } else {
          const indexp = this.projects.findIndex((p) => p.id === value.id)
          Object.assign(this.projects[indexp], value)
        }
        this.project = {}
        this.dialog = false
        this.gravarStore()
      },
      itemTask(value) {
        if (!value.id || value.id === '') {
          value.id = Math.floor(Math.random() * 256)
          const indexp = this.projects.findIndex((p) => p.id === value.projectid)
          this.projects[indexp].tasks.push(Object.assign({}, value))
        } else {
          Object.assign(
            this.projects[
              this.projects.findIndex((p) => p.id === value.projectid)
            ].tasks.find((t) => t.id === value.id),
            value
          )
        }
        this.task = {}
        this.dialog2 = false
        this.gravarStore()
      },
      editTask(value) {
        this.task = Object.assign({}, value)
        this.dialog2 = true
      },
      deleteTask(value) {
        this.$confirm('Deseja realmente excluir essa tarefa ?', { buttonTrueText: 'Sim', buttonFalseText: 'Não' }).then(res => {
          if (res) {
            const indexp = this.projects.findIndex((p) => p.id === value.projectid)
            const indext = this.projects[indexp].tasks.findIndex((t) => t.id === value.id)
            this.projects[indexp].tasks.splice(indext,1)
            this.gravarStore()
          }
        })
      },
      doneTask(value) {
        this.$confirm('Concluir Tarefa ?', { buttonTrueText: 'Sim', buttonFalseText: 'Não' }).then(res => {
          if (res) {
            value.status = 'OK'
            this.gravarStore()
          }
        })
      },
      undoneTask(value) {
        this.$confirm('Não concluída a Tarefa ?', { buttonTrueText: 'Sim', buttonFalseText: 'Não' }).then(res => {
          if (res) {
            value.status = ''
            this.gravarStore()
          }
        })
      },
      editProject(value) {
        this.project = Object.assign({}, value)
        this.dialog = true
      },
      deleteProject(value) {
        this.$confirm('Deseja realmente excluir esse Projeto ?', { buttonTrueText: 'Sim', buttonFalseText: 'Não' }).then(res => {
          if (res) {
            const indexp = this.projects.findIndex((p) => p.id === value.id)
            this.projects.splice(indexp,1)
            this.gravarStore()
          }
        })
      },
      statusDone(value) {
        if (value.status) {
          return value.status === 'OK' 
        } else return false
      }
    },
    mounted () {
      this.carregarStore()
    }    
  }
</script>
