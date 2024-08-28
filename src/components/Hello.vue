<template>
  <div>
    <h1>Hello, {{ message }}</h1>
    <button @click="fetchMessage">Fetch Message</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async fetchMessage() {
      try {
        const response = await axios.get('http://localhost:8081/hello/1');
        this.message = response.data;
      } catch (error) {
        console.error('Failed to fetch message:', error);
      }
    }
  }
};
</script>
