<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const login = async (payload: LoginForm, node?: FormKitNode) => {
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: "http://localhost:8000",
  });
  try {
    await axiosInstance.post("/login", payload);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      node?.setErrors([], e.response?.data.errors);
    }
  }
};
</script>
<template>
  <h1 class="text-3xl text-slate-200 p-4">Login</h1>
  <div class="max-w-md mx-auto bg-slate-950 rounded-lg p-4">
    <FormKit type="form" submit-label="Login" @submit="login">
      <FormKit type="email" label="Email" name="email" />
      <FormKit type="password" label="Password" name="password" />
    </FormKit>
  </div>
</template>
