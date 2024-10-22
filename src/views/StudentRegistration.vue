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
        <input :disabled="isEditMode" style="width: 60%;" type="text" id="cpf" name="cpf" placeholder="Informe o número do documento" v-model="student.cpf" />
      </div>

      <div style="width: 90%; display: flex; justify-content: end; padding: 20px;">
        <button style="height: 40px; margin: 5px; cursor: pointer;" @click="goToRegistrationList">Cancelar</button>
        <button 
        :disabled="student.name === '' || student.academicRegistration === '' ||student.cpf === '' || student.email === ''" 
         style="height: 40px; margin: 5px; cursor: pointer;" @click="saveStudent">Salvar</button>
      </div>
    </div>
  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import BoxComponent from "@/components/BoxComponent.vue";
import { StudentModel } from "@/model/StudentModel";
import { createStudent, getStudentById, updateStudent } from "@/services/StudentServices";

export default defineComponent({
  components: {
    BoxComponent,
  },
  name: "StudentRegistration",
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

    const router = useRouter();
    const route = useRoute();
    
    const isEditMode = ref(false);

    const student: StudentModel = reactive<StudentModel>({
      name: "",
      email: "",
      academicRegistration: "",
      cpf: ""
    });

    const loadStudentData = async (academicRegistration: string) => {
      getStudentById(academicRegistration).then((data)=>{
        student.name = data.name;
        student.email = data.email;
        student.academicRegistration = data.academicRegistration;
        student.cpf = data.cpf;
      }).catch((error)=>{
        if(error.response.data.message){
          triggerError(error.response.data.message)
        }else{
          triggerError("Erro ao buscar cadastro do aluno")
        }
      })
    };

    const saveStudent = async () => {
      if (isEditMode.value) {   
        updateStudent(student).then(()=>{
          triggerSuccess("Cadastrado editado com sucesso")
          router.push({ name: "registrationList" });
        }).catch((error)=>{
          if(error.response.data.message){
          triggerError(error.response.data.message)
          }else{
            triggerError("Erro ao editar cadastro")
          }
        })
      } else {
        createStudent(student).then(()=>{
          triggerSuccess("Cadastrado criado com sucesso")
          router.push({ name: "registrationList" });
        }).catch((error)=>{
          if(error.response.data.message){
            triggerError(error.response.data.message)
          }else{
            triggerError("Erro ao criar cadastro")
          }
        })
      }
    };

    const goToRegistrationList = () => {
      router.push({ name: "registrationList" });
    };

    onMounted(() => {
      if (route.params.id) {
        isEditMode.value = true;
        student.academicRegistration = route.params.id as string;
        loadStudentData(student.academicRegistration);
      }
    });

    return {
      triggerSuccess,
      triggerError,
      student,
      isEditMode,
      saveStudent,
      goToRegistrationList,
    };
  },
});
</script>
