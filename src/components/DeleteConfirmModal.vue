<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Deseja apagar o cadastro?</h2>
        <button class="close-button" @click="handleClose">&times;</button>
      </div>
      <div class="modal-body">
        <p>
          Ao confirmar estará deletando permanentemente o cadastro de 
          <strong>"{{ studentName }}"</strong>.
        </p>
      </div>
      <div class="modal-footer">
        <button class="cancel-button" @click="handleClose">Cancelar</button>
        <button class="delete-button" @click="handleSave">Apagar</button>
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
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    confirmDeleteStudent: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const showModal = ref(props.isOpenModal);

    watch(
      () => props.isOpenModal,
      (newVal) => {
        showModal.value = newVal;
      }
    );

    const handleClose = () => {
      showModal.value = false;
      props.closeModal();
    };

    const handleSave = () => {
      props.confirmDeleteStudent(props.studentId);
    };

    return {
      showModal,
      handleClose,
      handleSave,
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
}

.modal-body {
  margin-bottom: 40px;
  text-align: start;
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
