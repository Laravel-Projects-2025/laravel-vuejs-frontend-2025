<script setup lang="ts">
import axiosInstance from "@/lib/axios";

const user = async () => {
  try {
    const response = await axiosInstance.get("/user");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const logout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

user();
</script>
<template>
  <h1>Dashboard</h1>
</template>
