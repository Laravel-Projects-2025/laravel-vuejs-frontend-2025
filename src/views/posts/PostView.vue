<script setup lang="ts">
import { useRoute} from "vue-router";
import {ref, watch} from "vue";
import { usePostStore} from "@/store/post.ts";

const route = useRoute();
const postStore = usePostStore();

watch(() => route.params.slug,
  (slug) => postStore.getPost(String(slug)), {immediate: true})
</script>
<template>
 <section>
   <h1 class="text-3xl text-slate-200 p-4">{{ postStore.post?.title}}</h1>
   <span class="text-sm text-slate-200 p-4">Created at: {{ postStore.post?.createdAt }}</span>
   <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
     {{ postStore.post?.body }}
   </div>
 </section>
</template>
