import axiosInstance from "@/lib/axios";
import router from "@/router";
import type {LaravelResponseCollection, LoginForm, Post, postForm, RegisterForm, User} from "@/types";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePostStore = defineStore(
  "post",
  () => {
   const postsCollection = ref<LaravelResponseCollection<Post> | null>(null)
   const post = ref<Post | null>(null)
   const isLoading = ref<boolean>(false)

   const getPosts = async (page: number) => {
       isLoading.value = true;
       try {
           const { data} = await axiosInstance.get(`/dashboard/posts?page=${page}`);
           postsCollection.value = data;
       } catch (error) {
           console.error(error);
       } finally {
           isLoading.value = false;
       }
   }

   const getPost = async (slug: string) => {
       isLoading.value = true;
       try {
           const {data} = await axiosInstance.get(`/dashboard/posts/${slug}`);
           post.value = data.data;
       } catch (error){
           console.error(error);
       } finally {
           isLoading.value = false;
       }
   }

   const createPost = async (payload: postForm, node?: FormKitNode) => {
       try {
           await axiosInstance.post("/dashboard/posts", payload);
           await router.push("/dashboard/posts");
       } catch (e) {
           if (e instanceof AxiosError && e.response?.status === 422) {
               node?.setErrors([], e.response?.data.errors);
           }
       }
   }

   const updatePost = async (slug: string, payload: postForm, node?: FormKitNode) => {
       try {
           await axiosInstance.put(`/dashboard/posts/${slug}`, payload);
           await router.push("/dashboard/posts");
       } catch (e) {
           if (e instanceof AxiosError && e.response?.status === 422) {
               node?.setErrors([], e.response?.data.errors);
           }
       }
   }

   return {
      postsCollection,
      post,
      isLoading,
      getPosts,
       getPost,
       createPost,
       updatePost,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ["user", "isLoggedIn"]
    },
  }
);
