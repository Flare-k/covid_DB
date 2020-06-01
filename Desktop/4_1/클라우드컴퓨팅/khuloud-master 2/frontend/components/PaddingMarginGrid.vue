<template>
  <div class="mx-4 mb-4">
    <h1 class="subheading grey--text">Team</h1>

    <v-container fluid class="my-5">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-btn outline block class="primary">1</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outline block class="primary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outline block class="primary">2</v-btn>
        </v-flex>
        <v-flex xs4 md2>
          <v-btn outline block class="primary">2</v-btn>
        </v-flex>
      </v-layout>

      <!--      justify-end, center, space-around-->

      <v-layout row wrap justify-end>
        <v-flex xs4 md3>
          <v-btn outline block class="success">1</v-btn>
        </v-flex>
        <v-flex xs4 md3>
          <v-btn outline block class="success">2</v-btn>
        </v-flex>
      </v-layout>
    </v-container>


    <v-container class="my-5">

      <v-layout row class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small flat color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>folder</v-icon>
              <span class="caption text-lowercase">By project name</span>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small flat color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>person</v-icon>
              <span class="caption text-lowercase">By person</span>
            </v-btn>
          </template>
          <span>Sort projects by person</span>
        </v-tooltip>
      </v-layout>


      <v-card flat class="pa-3" v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">project title</div>
            <div>{{project.title}}</div>
          </v-flex>
          <v-flex xs4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{project.person}}</div>
          </v-flex>
          <v-flex xs4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{project.due}}</div>
          </v-flex>
          <v-flex xs4 md2>
            <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: "PaddingMarginGrid",
    data() {
      return {
        projects: [
          {title: 'Design a new website', person: 'The Net Ninja', due: '1st Jan 2019', status: 'ongoing'},
          {title: 'Write a new website', person: 'Net Ninja', due: '1st Jan 2019', status: 'complete'},
          {title: 'Create a new website', person: 'Ninja', due: '1st Jan 2019', status: 'ongoing'},
          {title: 'Update a new website', person: 'tjddus', due: '1st Jan 2019', status: 'overdue'}
        ]
      }
    },
    methods: {
      sortBy(props) {
        this.projects.sort((a, b) => a[props] < b[props] ? -1 : 1);
      }
    }
  }
</script>

<style scoped>
  .project.complete {
    border-left: 4px solid #3cd1c2;
  }

  .project.ongoing {
    border-left: 4px solid orange;
  }

  .project.overdue {
    border-left: 4px solid tomato;
  }

  .v-chip.complete {
    background: #3cd1c2;
  }

  .v-chip.ongoing {
    background: orange;
  }

  .v-chip.overdue {
    background: tomato;
  }
</style>
