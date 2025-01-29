<script setup lang="ts">
import { useRoute} from "vue-router";
import {ref, watch} from "vue";
import axiosInstance from "@/lib/axios.ts";
import type {Post} from "@/types";
import router from "@/router";
import {AxiosError} from "axios";
import type {FormKitNode} from "@formkit/core";

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

const updatePost = async (payload: Post, node?: FormKitNode) => {
 if (post.value) {
   try {
     await axiosInstance.put(`/dashboard/posts/${post.value?.slug}`, payload);
     await router.push("/dashboard/posts");
   } catch (e) {
     if (e instanceof AxiosError && e.response?.status === 422) {
       node?.setErrors([], e.response?.data.errors);
     }
   }
 }
}

watch(() => route.params.slug,
    (slug) => getPost(String(slug)), {immediate: true})
</script>
<template>
  <section v-if="post">
    <h1 class="text-3xl text-slate-200 p-4">Update: {{ post.title}}</h1>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      <FormKit type="form" submit-label="Update" @submit="updatePost">
        <FormKit type="text" label="Title" name="title" :value="post.title" />
        <FormKit type="textarea" label="Body" name="body" :value="post.body" />
      </FormKit>
    </div>
  </section>
</template>
