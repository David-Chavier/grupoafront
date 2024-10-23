<template>
  <div
    style="
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <div style="height: 90%; width: 90%">
      <h4
        style="
          width: 100%;
          height: 5%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #e6e6e6;
          border: 2px solid #000000;
          margin: 0px;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
        "
      >
        {{ title }}
      </h4>
      <div
        style="
          width: 100%;
          height: 90%;
          border: 2px solid #000000;
          border-top: none;
        "
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./styles/boxStyles.css";

export default defineComponent({
  name: "BoxComponent",
  props: {
    title: {
      type: String,
    },
  },
});
</script>
