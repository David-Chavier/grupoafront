  <template>
    <div v-if="snackbar.show" :class="['snackbar', snackbar.color]" @click="snackbar.show = false">
      {{ snackbar.message }}
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, reactive } from 'vue';
  
  export default defineComponent({
    name: 'CustomSnackbar',
    setup() {
      const snackbar = reactive({
        show: false,
        message: '',
        color: '',
      });
  
      const showSuccess = (message: string) => {
        snackbar.message = message;
        snackbar.color = 'snackbar--success';
        snackbar.show = true;
        setTimeout(() => snackbar.show = false, 3000); // Oculta após 3 segundos
      };
  
      const showError = (message: string) => {
        snackbar.message = message;
        snackbar.color = 'snackbar--error';
        snackbar.show = true;
        setTimeout(() => snackbar.show = false, 3000);
      };
  
      return {
        snackbar,
        showSuccess,
        showError,
      };
    },
  });
  </script>
  
  <style scoped>
  .snackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    z-index: 1000;
    min-width: 200px;
    text-align: center;
  }
  
  .snackbar--success {
    background-color: green;
  }
  
  .snackbar--error {
    background-color: red;
  }
  </style>
  