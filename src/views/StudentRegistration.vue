<template>
  <BoxComponent :title="isEditMode ? 'Editar aluno' : 'Cadastro de aluno'">
    <div style="padding: 5%;">
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          Nome
        </div>
        <input style="width: 60%;" type="text" id="name" name="name" placeholder="Informe o nome completo" v-model="student.name" />
      </div>

      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          E-mail
        </div>
        <input style="width: 60%;" type="text" id="email" name="email" placeholder="Informe apenas um e-mail" v-model="student.email" />
      </div>

      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          RA
        </div>
        <input :disabled="isEditMode" style="width: 60%;" type="text" id="ra" name="ra" placeholder="Informe o registro acadêmico" v-model="student.academicRegistration" />
      </div>

      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          CPF
        </div>
        <input style="width: 60%;" type="text" id="cpf" name="cpf" placeholder="Informe o número do documento" v-model="student.cpf" />
      </div>

      <div style="width: 90%; display: flex; justify-content: end; padding: 20px;">
        <button style="height: 40px; margin: 5px;" @click="goToRegistrationList">Cancelar</button>
        <button style="height: 40px; margin: 5px;" @click="saveStudent">{{ isEditMode ? 'Atualizar' : 'Salvar' }}</button>
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import BoxComponent from "@/components/BoxComponent.vue";
import { StudentModel, UpdateStudentModel } from "@/model/StudentModel";
import { createStudent, getStudentById, updateStudent } from "@/services/StudentServices";

export default defineComponent({
  components: {
    BoxComponent,
  },
  name: "StudentForm",
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    const isEditMode = ref(false);
    const studentId = ref<string | null>(null);

    const student: StudentModel = reactive<StudentModel>({
      name: "",
      email: "",
      academicRegistration: "",
      cpf: "",
      id: ""
    });

    const loadStudentData = async (id: string) => {
      try {
        const data = await getStudentById(id);
        student.name = data.name;
        student.email = data.email;
        student.academicRegistration = data.academicRegistration;
        student.cpf = data.cpf;
        student.id = data.id; // Define o ID no estado do aluno
      } catch (error) {
        console.error("Erro ao carregar dados do aluno:", error);
      }
    };

    const saveStudent = async () => {
      try {
        if (isEditMode.value) {
          const { academicRegistration, ...studentData } = student; // Remove academicRegistration
          await updateStudent(studentData as UpdateStudentModel);
        } else {
          await createStudent(student);
        }
        router.push({ name: "registrationList" });
      } catch (error) {
        console.error("Erro ao salvar o aluno:", error);
      }
    };

    const goToRegistrationList = () => {
      router.push({ name: "registrationList" });
    };

    onMounted(() => {
      if (route.params.id) {
        isEditMode.value = true;
        studentId.value = route.params.id as string;
        loadStudentData(studentId.value);
      }
    });

    return {
      student,
      isEditMode,
      saveStudent,
      goToRegistrationList,
    };
  },
});
</script>
