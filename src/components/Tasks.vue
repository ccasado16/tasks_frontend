<template>
  <h1>Tasks</h1>
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

  <hr />
  <ul>
    <li v-for="task in tasks" :key="task.id">
      <h3>{{ task.title }}</h3>
      <p>{{ task.description }}</p>
    </li>
  </ul>
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
    },
    // fetch tasks on page load
    created() {
      this.getTasks();
    },
  };
</script>
