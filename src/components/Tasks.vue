<template>
  <h1>Tasks</h1>
  <ul>
    <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
    </li>
  </ul>
</template>

<script>
  import useAxios from '../axios';
   export default {
       data() {
           return {
               tasks: []
           }
       },

       methods: {
           async getTasks() {
               try {
                   const response = await useAxios.get('api/tasks/');
                   this.tasks = response.data;
               } catch (error) {
                console.log(error);
               }
           }
       },
       // fetch tasks on page load
       created() {
           this.getTasks();
       }
   }
</script>
