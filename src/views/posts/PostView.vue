<script setup lang="ts">
import { useRoute} from "vue-router";
import {ref, watch} from "vue";
import axiosInstance from "@/lib/axios.ts";
import type {Post} from "@/types";

const route = useRoute();
const post = ref<Post | null>(null)

const getPost = async (slug: string) => {
  try {
    const {data} = await axiosInstance.get(`/dashboard/posts/${slug}`);
    post.value = data.data;
  } catch (error){
    console.error(error);
  }
}

watch(() => route.params.slug,
  (slug) => getPost(String(slug)), {immediate: true})
</script>
<template>
 <section>
   <h1 class="text-3xl text-slate-200 p-4">{{ post?.title}}</h1>
   <span class="text-sm text-slate-200 p-4">Created at: {{ post?.createdAt }}</span>
   <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
     {{ post?.body }}
   </div>
 </section>
</template>
