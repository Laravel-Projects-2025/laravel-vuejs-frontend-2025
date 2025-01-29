<script setup lang="ts">
import {onMounted, ref} from "vue";
import axiosInstance from "@/lib/axios.ts";
import { TailwindPagination } from 'laravel-vue-pagination';
import { EyeIcon, PencilSquareIcon} from "@heroicons/vue/24/solid";
import type { Post } from "@/types";

type LaravelData = {
  data: Post[];
  links: any;
  meta: any;
}

const laravelData = ref<LaravelData>({
  data: [],
  links: {},
  meta: {},});

const getResults = async (page = 1) => {
  const { data} = await axiosInstance.get(`/dashboard/posts?page=${page}`);
  laravelData.value = await data
}

onMounted(async  () => {
  await getResults();
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
            <th scope="col" class="px-6 py-3">Slug</th>
            <th scope="col" class="px-6 py-3">Published</th>
            <th scope="col" class="px-6 py-3">Crated</th>
            <th scope="col" class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="laravelData.data?.length > 0">
            <tr v-for="post in laravelData.data" :key="post.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ post.id}}
              </th>
              <td class="px-6 py-4">{{ post.title}}</td>
              <td class="px-6 py-4">{{ post.slug}}</td>
              <td class="px-6 py-4">{{ post.published}}</td>
              <td class="px-6 py-4">{{ post.createdAt}}</td>
              <td class="px-6 py-4">
                <div class="flex space-x-4">
                  <RouterLink :to="{ name: 'PostView', params: { slug: post.slug } }">
                    <EyeIcon class="w-5 h-5 text-blue-500 dark:text-blue-400 hover:text-blue-700" />
                  </RouterLink>
                  <RouterLink :to="{ name: 'PostEdit', params: { slug: post.slug } }">
                    <PencilSquareIcon class="w-5 h-5 text-green-500 dark:text-green-400 hover:text-green-700" />
                  </RouterLink>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <TailwindPagination
          :data="laravelData"
          @pagination-change-page="getResults"
      />
    </div>
  </section>
</template>
