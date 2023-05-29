<template>
  <div class="">
    <h2 class="text-4xl mb-7">What's up, User!</h2>
    <p class="uppercase">categories</p>
    <!-- TODO - Add categories scroller section -->
    <p class="uppercase mb-5">today's tasks</p>
    <ul class="space-y-3">
      <li v-for="task in tasks" :key="task.id" class="border-2">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>{{ task.completed }}</p>
        <button @click="completeTask(task)">Complete</button>
        <button @click="deleteTask(task)">Delete</button>
      </li>
    </ul>

    <hr />
    <!-- Add a new task form -->
    <form v-on:submit.prevent="addTask">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        v-model="title"
      />

      <label for="description">Description</label>
      <textarea id="description" v-model="description"></textarea>

      <button type="submit">Add task</button>
    </form>
  </div>
</template>

<script>
  import useAxios from "../axios";
  export default {
    data() {
      return {
        tasks: [],
        title: "",
        description: "",
      };
    },

    methods: {
      async getTasks() {
        try {
          const response = await useAxios.get("api/tasks/");
          this.tasks = response.data;
        } catch (error) {
          console.log(error);
        }
      },

      async addTask() {
        try {
          const response = await useAxios.post("api/tasks/", {
            title: this.title,
            description: this.description,
            completed: false,
          });

          // Append the returned data to the tasks
          this.tasks.push(response.data);
          this.title = "";
          this.description = "";
        } catch (error) {
          console.log(error);
        }
      },

      async deleteTask(task) {
        try {
          await useAxios.delete(`api/tasks/${task.id}/`);
          this.getTasks();
        } catch (error) {
          console.log(error);
        }
      },

      // Toggle complete task
      // FIXME
      // thinking on creating a new backend endpoint for just completed a task instead of updating the whole task by just changing the completed field
      async completeTask(task) {
        try {
          await useAxios.put(`api/tasks/${task.id}/`, {
            title: task.title,
            description: task.description,
            completed: !task.completed,
          });
          this.getTasks();
        } catch (error) {
          console.log(error);
        }
      },
    },
    // fetch tasks on page load
    created() {
      this.getTasks();
    },
  };
</script>
