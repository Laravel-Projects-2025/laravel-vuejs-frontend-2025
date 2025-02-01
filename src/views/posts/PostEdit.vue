<script setup lang="ts">
import { useRoute} from "vue-router";
import {watch} from "vue";
import { usePostStore} from "@/store/post.ts";
import type {postForm} from "@/types";
import type {FormKitNode} from "@formkit/core";

const route = useRoute();
const postStore = usePostStore();

const handleUpdate = (payload: postForm, node?: FormKitNode) => {
  postStore.updatePost(String(route.params.slug), payload, node);
}

watch(() => route.params.slug,
    (slug) => postStore.getPost(String(slug)), {immediate: true})
</script>
<template>
  <section v-if="postStore.post">
    <h1 class="text-3xl text-slate-200 p-4">Update: {{ postStore.post.title}}</h1>
    <div class="max-w-[24em] mx-auto bg-slate-950 rounded-lg p-4">
      <FormKit type="form" submit-label="Update" @submit="handleUpdate">
        <FormKit type="text" label="Title" name="title" :value="postStore.post.title" />
        <FormKit type="textarea" label="Body" name="body" :value="postStore.post.body" />
      </FormKit>
    </div>
  </section>
</template>
