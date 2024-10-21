<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Título do Modal</h2>
          <button class="close-button" @click="handleClose">&times;</button>
        </div>
        <div class="modal-body">
          <p>Este é o conteúdo do modal.</p>
        </div>
        <div class="modal-footer">
          <button @click="handleClose">Fechar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  
  export default defineComponent({
    props: {
      isOpenModal: {
        type: Boolean,
        required: true, // Torna a propriedade obrigatória
      },
      closeModal: {
        type: Function, // Corrigido para indicar que é uma função
        required: true, // Torna a propriedade obrigatória
      },
    },
    setup(props) {
      const showModal = ref(props.isOpenModal);
  
      // Observa a propriedade isOpenModal para atualizar showModal
      watch(
        () => props.isOpenModal,
        (newVal) => {
          showModal.value = newVal;
        }
      );
  
      // Função para fechar o modal
      const handleClose = () => {
        showModal.value = false;
        props.closeModal(); // Chama a função para notificar que o modal foi fechado
      };
  
      return {
        showModal,
        handleClose,
      };
    },
  });
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  </style>
  