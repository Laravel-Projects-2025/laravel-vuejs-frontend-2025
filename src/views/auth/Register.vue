<script setup lang="ts">
import axiosInstance from "@/lib/axios";
import type { FormKitNode } from "@formkit/core";
import { AxiosError } from "axios";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const register = async (payload: RegisterForm, node?: FormKitNode) => {
  await axiosInstance.get("/sanctum/csrf-cookie", {
    baseURL: "http://localhost:8000",
  });

  try {
    await axiosInstance.post("/register", payload);
  } catch (e) {
    if (e instanceof AxiosError && e.response?.status === 422) {
      node?.setErrors([], e.response?.data.errors);
    }
  }
};
</script>
<template>
  <h1 class="text-3xl text-neutral-700 dark:text-neutral-300 p-4">Register</h1>

  <FormKit type="form" submit-label="Login" @submit="register">
    <FormKit type="text" label="Name" name="name" />
    <FormKit type="email" label="Email" name="email" />
    <FormKit type="password" label="Password" name="password" />
    <FormKit
      type="password"
      label="Password Confirmation"
      name="password_confirmation"
    />
  </FormKit>
</template>
