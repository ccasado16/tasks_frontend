<template>
  <div class="container mx-auto">
    <h2 class="text-4xl mb-7">What's up, User!</h2>
    <p class="uppercase">categories</p>
    <div class="w-full h-40 border-2 bg-black mt-5 mb-7"></div>
    <!-- TODO - Add categories scroller section -->
    <p class="uppercase mb-5">today's tasks</p>
    <ul class="space-y-3">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="flex p-3 border-2 rounded-3xl items-center justify-between"
      >
        <!-- left -->
        <div class="flex items-center">
          <input
            type="radio"
            class="radio-custom w-7 h-7 mr-5"
            :checked="task.completed"
            @click="completeTask(task)"
          />
          <div :class="{ 'line-through': task.completed }">
            <h3 class="text-2xl font-semibold">
              {{ task.title }}
            </h3>
            <p class="text-xl">{{ task.description }}</p>
            <p>{{ task.completed }}</p>
          </div>
        </div>

        <!-- right -->
        <el-button @click="deleteTask(task)">
          <el-icon><Delete /></el-icon>
        </el-button>
      </li>
    </ul>

    <hr />
    <el-button
      type="primary"
      circle
      size="large"
      class="fixed z-90 bottom-10 right-14 hover:bg-blue-700 hover:drop-shadow-2xl hover:duration-500"
      @click="dialogVisible = true"
    >
      <el-icon :size="20"><Plus /></el-icon>
    </el-button>

    <el-dialog
      v-model="dialogVisible"
      fullscreen
      class="flex flex-col justify-center p-14"
    >
      <div class="">
        <!-- Add a new task form -->
        <form v-on:submit.prevent="addTask" class="flex flex-col space-y-5">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Create a new task"
            v-model="title"
            class="font-bold text-2xl focus:outline-none"
          />
          <textarea
            id="description"
            v-model="description"
            placeholder="Describe your task"
            class="font-semibold text-xl focus:outline-none resize-none"
            rows="5"
          ></textarea>
        </form>
        <button
          type="submit"
          class="bg-blue-600 py-4 px-7 text-white font-bold rounded-full fixed bottom-14 right-14"
          @click="addTask"
        >
          Add task
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { ElMessage } from 'element-plus'
  const dialogVisible = ref(false);
</script>

<script>
  import useAxios from "../axios";
  import { Delete, Plus } from "@element-plus/icons-vue";

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
          ElMessage({
            message: "Task added successfully",
            type: "success",
          });
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

<style>
  .radio-custom:checked::after {
    color: #fff;
    font-weight: bold;
    content: "✓";
    position: relative;
    top: 2px;
    left: 7px;
  }
</style>
