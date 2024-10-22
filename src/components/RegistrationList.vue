<template>
  <BoxComponent title="Consulta de Alunos">
    <div style="height: 20%; min-height: 60px;">
      <div style="display: flex; padding: 10px 20px 0px 20px;">
        <div style="width: 80%; display: flex;">
          <input
            style="width: 80%; height: 38px; padding: 0px; margin: 0px; border: 1px solid #CCCCCC; border-right: 0px;"
            type="text"
            id="name"
            name="name"
          />
          <button
            style="flex: 1; height: 40px; margin-right: 20px; border: 1px solid #CCCCCC; background-color: #CCCCCC; border-left: 0px;"
          >
            Pesquisar
          </button>
        </div>
        <button @click="goToStudentRegistration" style="flex: 1; height: 40px; cursor: pointer;">
          Cadastrar alunos
        </button>
      </div>
    </div>

    <div style="border-top: 2px solid #000000; height: calc(80% - 2px);">
      <ul
        style="display: grid; align-items: center; height: 50px; grid-template-columns: repeat(4, 1fr); margin: 0px; background-color: #CCCCCC;"
      >
        <li>Registro Acadêmico</li>
        <li>Nome</li>
        <li>CPF</li>
        <li>Ações</li>
      </ul>

      <div style="height: calc(100% - 50px); overflow-y: auto;">
        <div v-for="(student, index) in students" :key="index">
          <ul
            :style="{
              display: 'grid',
              'grid-template-columns': 'repeat(4, 1fr)',
              margin: '0px',
              height: '50px',
              alignItems: 'center',
              backgroundColor: index % 2 === 0 ? '#ECECEC' : '#FFFFFF',
            }"
          >
            <li>{{ student.academicRegistration }}</li>
            <li>{{ student.name }}</li>
            <li>{{ student.cpf }}</li>
            <li>
              <button @click="goToEditStudent(student.academicRegistration)" style="margin-right: 10px; cursor: pointer;">Editar</button>
              <button @click="openModalDeleteStudent(student.academicRegistration, student.name)" style="cursor: pointer;">Excluir</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </BoxComponent>
  <DeleteConfirmModal
    :isOpenModal="isModalOpenDeleteStudent" 
    :closeModal="closeModalDeleteStudent" 
    :studentId="selectedStudentId!" 
    :studentName="selectedStudentName!" 
    :confirmDeleteStudent="handleDeleteStudent"
  />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from "vue";
import BoxComponent from "@/components/BoxComponent.vue";
import DeleteConfirmModal from "@/components/DeleteConfirmModal.vue";
import { deleteStudent, getStudents } from "@/services/StudentServices";
import { StudentModel } from "@/model/StudentModel";
import router from "@/router";
import './styles.css';

export default defineComponent({
  components: {
    BoxComponent,
    DeleteConfirmModal
  },
  name: "RegistrationList",
  setup() {
    const showSuccess = inject<((message: string) => void)>('showSuccess');
    const showError = inject<((message: string) => void)>('showError');
    
    const triggerSuccess = (message: string) => {
      if (showSuccess) {
        showSuccess(message);
      }
    };

    const triggerError = (message: string) => {
      if (showError) {
        showError(message);
      }
    };

    const isModalOpenDeleteStudent = ref(false);
    const selectedStudentId = ref<string | null>(null);
    const selectedStudentName = ref<string | null>(null);

    const openModalDeleteStudent = (id: string, name: string) => {
      selectedStudentId.value = id;
      selectedStudentName.value = name;
      isModalOpenDeleteStudent.value = true;
    };

    const closeModalDeleteStudent = () => {
      isModalOpenDeleteStudent.value = false;
      selectedStudentId.value = null;
      selectedStudentName.value = null;
    };

    const students = ref<StudentModel[]>([]);

    const goToEditStudent = (id: string) => {
      router.push({ name: "editStudentRegistration", params: { id } });
    };

    const goToStudentRegistration = () => {
      router.push({ name: "studentRegistration" });
    };

    const handleDeleteStudent = (id: string) =>{
      isModalOpenDeleteStudent.value = false;
      deleteStudent(id).then(()=>{
        getAllStudents()
        triggerSuccess("Cadastro deletado com sucesso.")
      }).catch(() => {
        triggerError("Erro ao deletar cadastro.")
      })
    }

    const getAllStudents = () =>{
      getStudents().then((response)=>{
        students.value = response;
      }).catch(()=>{
        triggerError("Erro ao buscar cadastros.")
      })
    }

    onMounted(() => {
      getAllStudents()
    });

    return {
      triggerSuccess,
      triggerError,
      selectedStudentName,
      selectedStudentId,
      isModalOpenDeleteStudent,
      goToEditStudent,
      openModalDeleteStudent,
      closeModalDeleteStudent,
      goToStudentRegistration,
      handleDeleteStudent,
      students,
    };
  },
});
</script>

<style scoped>
h3 {
  margin: 40px 0 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
input {
  border: 1px solid #CCCCCC;
}

input:hover {
  border: 1px solid #CCCCCC;
}

input:focus {
  border: 1px solid #CCCCCC;
  outline: none;
}
</style>
