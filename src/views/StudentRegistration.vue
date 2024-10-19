<template>
  <BoxComponent title="Cadastro de aluno">
    <div style="width: 800px;">
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          Nome
        </div>
        <input type="text" id="name" name="name" placeholder="Informe o nome completo">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          E-mail
        </div>
        <input type="text" id="name" name="name" placeholder="Informe o nome completo">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          RA
        </div>
        <input type="text" id="name" name="name" placeholder="Informe o nome completo">
      </div>
      <div style="display: flex; margin-bottom: 10px;">
        <div style="background-color: #EEEEEE; width: 20%; padding: 5px; margin-left: 20px; border: 1px solid #D6D6D6; border-top-left-radius: 4px; border-bottom-left-radius: 4px;">
          CPF
        </div>
        <input type="text" id="name" name="name" placeholder="Informe o nome completo">
      </div>

      <button @click="goToRegistrationList">Cancelar</button>
      <button>Salvar</button>
    </div>

  </BoxComponent>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import BoxComponent from "@/components/BoxComponent.vue";

export default defineComponent({
  components: {
    BoxComponent,
  },
  name: "HelloWorld",
  props: {
    title: String,
  },
  setup() {
    const router = useRouter();

    // Função para navegação ao clicar no botão "Cadastrar alunos"
    const goToRegistrationList = () => {
      router.push({ name: "registrationList" });
    };

    return {
      goToRegistrationList,
    };
  }
});
</script>