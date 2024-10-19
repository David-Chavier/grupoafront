<template>
    <div style="width: 100%; display: flex; justify-content: center;">
        <div style="max-width: 800px; border: 2px solid #000000; border-top-left-radius: 4px; border-top-right-radius: 4px;">
        <h4 style="width: 100%; background-color: #E6E6E6; border-bottom: 2px solid #000000; margin: 0px; margin-bottom: 5px; padding: 4px 0px 4px 0px; border-top-left-radius: 4px; border-top-right-radius: 4px;">
            {{title}}
        </h4>
        <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
name: "BoxComponent",
props: {
    title: {
      type: String,
    }
}
});
</script>