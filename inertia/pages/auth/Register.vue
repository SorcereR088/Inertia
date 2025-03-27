<script setup lang="ts">
import Banner from '../../assets/image 1.jpg'
import AuthLayout from '~/layouts/AuthLayout.vue';
import {useForm } from '@inertiajs/vue3';
import {Loader} from 'lucide-vue-next'

defineOptions({ layout: AuthLayout })

const form = useForm({
    fullname: '',
    email: '',
    password: ''
})


function onSubmit(){
    form.post('/register',
    {onSuccess: () => form.reset()})

}

</script>
<template>
  <div 
    class="w-full h-[50vh] min-h-screen flex items-center justify-center tracking-tight" 
    :style="{ backgroundImage: `url(${Banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="bg-white w-[450px] h-[480px] rounded-xl shadow-md p-8 opacity-90">
      <h1 class="text-[1.8rem] font-semibold">Signup</h1>
      <p class="text-lg text-gray-600 mb-4">
        Create an account? 
        <a href="/login" class="hover:underline cursor-pointer">Login</a>
      </p>

      <form @submit.prevent="onSubmit">
        <label class="block mb-2">Full Name</label>
        <input class="w-full bg-gray-50 p-2 rounded-md" type="text" v-model="form.fullname">
        <div v-if="form.errors.fullname" class="text-red-500 text-sm h-5">{{ form.errors.fullname }}</div>

        <label class="block mb-2">Email</label>
        <input class="w-full bg-gray-50 p-2 rounded-md" type="email" v-model="form.email">
        <div v-if="form.errors.email" class="text-red-500 text-sm h-5">{{ form.errors.email }}</div>

        <label class="block mb-2">Password</label>
        <input class="w-full bg-gray-50 p-2 rounded-md" type="password" v-model="form.password">
        <div v-if="form.errors.password" class="text-red-500 text-sm h-5">{{ form.errors.password }}</div>

        <button class="bg-black text-white px-3 py-1 rounded-lg font-semibold text-lg mt-4 flex items-center gap-2" type="submit" :disabled="form.processing">
          <Loader v-if="form.processing" class="mr-2 h-4 w-4 animate-spin" />
          Signup
        </button>
      </form>
    </div>
  </div>
</template>
