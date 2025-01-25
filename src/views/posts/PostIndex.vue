<script setup lang="ts">


import {onMounted, ref} from "vue";
import axiosInstance from "@/lib/axios.ts";

type Post = {
  id: number;
  title: string;
  is_published: boolean;
}
const posts = ref<Post[] | null>(null)
onMounted(async  () => {
  const {data } = await axiosInstance.get("/dashboard/posts");
  posts.value = data;
})
</script>
<template>
  <div class="flex p-4 justify-end">
    <RouterLink :to="{ name: 'PostCreate' }">Create</RouterLink>
  </div>
  <section>
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">Title</th>
            <th scope="col" class="px-6 py-3">Published</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="posts">
            <tr v-for="post in posts" :key="post.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ post.id}}
              </th>
              <td class="px-6 py-4">{{ post.title}}</td>
              <td class="px-6 py-4">{{ post.is_published}}</td>
              <td class="px-6 py-4">Edit/Delete</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </section>
</template>
