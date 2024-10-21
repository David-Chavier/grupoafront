<template>
  <BoxComponent title="Cadastro de aluno">
    <div style="padding: 5%;">
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          Nome
        </div>
        <input style="width: 60%;" type="text" id="name" name="name" placeholder="Informe o nome completo" v-model="student.name">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          E-mail
        </div>
        <input style="width: 60%;" type="text" id="email" name="email" placeholder="Informe apenas um e-mail" v-model="student.email">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          RA
        </div>
        <input style="width: 60%;" type="text" id="ra" name="ra" placeholder="Informe o registro acadêmico" v-model="student.academicRegistration">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          CPF
        </div>
        <input style="width: 60%;" type="text" id="cpf" name="cpf" placeholder="Informe o número do documento" v-model="student.cpf">
      </div>

      <div style=" width: 90%; display: flex; justify-content: end; padding: 20px;">
        <button style="height: 40px; margin: 5px;" @click="goToRegistrationList">Cancelar</button>
        <button style="height: 40px; margin: 5px;" @click="saveStudent">Salvar</button>
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import BoxComponent from "@/components/BoxComponent.vue";
import { CreateStudentModel } from "@/model/StudentModel";
import { createStudent } from "@/services/StudentServices";

export default defineComponent({
  components: {
    BoxComponent,
  },
  name: "HelloWorld",
  setup() {
    const router = useRouter();

    // Estado reativo para armazenar os dados do formulário
    const student: CreateStudentModel = reactive<CreateStudentModel>({
      name: "",
      email: "",
      academicRegistration: "",
      cpf: "",
    });

    // Função para salvar o aluno
    const saveStudent = async () => {
      try {
        await createStudent(student);
        router.push({ name: "registrationList" }); // Redireciona após salvar
      } catch (error) {
        console.error("Erro ao salvar o aluno:", error);
      }
    };

    // Função para navegar para a lista de cadastros
    const goToRegistrationList = () => {
      router.push({ name: "registrationList" });
    };

    return {
      student, // Exponha o estado do aluno para o template
      goToRegistrationList,
      saveStudent,
    };
  },
});
</script>
