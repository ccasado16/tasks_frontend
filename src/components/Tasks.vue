<template>
  <div class="container mx-auto">
    <h2 class="text-4xl mb-7">What's up, User!</h2>
    <p class="uppercase">categories</p>
    <!-- TODO - Add categories scroller section -->
    <p class="uppercase mb-5">today's tasks</p>
    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex space-x-5 p-3 border-2 rounded-3xl items-center"
      >
        <input
          type="radio"
          @click="completeTask(task)"
          class="w-7 h-7"
        />
        <div :class="{ 'line-through': task.completed }">
          <h3 class="text-2xl font-semibold">
            {{ task.title }}
          </h3>
          <p class="text-xl">{{ task.description }}</p>
          <p>{{ task.completed }}</p>
        </div>
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
      <textarea
        id="description"
        v-model="description"
      ></textarea>

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
