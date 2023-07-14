<template>
  <div class="tooltip-icon" v-tooltip="tooltipText"></div>
</template>

<script lang="ts">
import { DirectiveBinding } from "vue";

export default {
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
  },
  directives: {
    tooltip: {
      mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
        el.addEventListener("mouseenter", () => {
          const tooltip = document.createElement("div");
          tooltip.classList.add("tooltip");
          tooltip.textContent = binding.value as string;
          document.body.appendChild(tooltip);

          const rect = el.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();
          tooltip.style.top = `${
            rect.top + window.scrollY - tooltipRect.height - 5
          }px`;
          tooltip.style.left = `${rect.left + rect.width / 2 - 17}px`;
        });

        el.addEventListener("mouseleave", () => {
          const tooltip = document.querySelector(".tooltip");
          if (tooltip) {
            tooltip.remove();
          }
        });
      },
    },
  },
};
</script>

<style>
.tooltip {
  opacity: 1;
  z-index: 100;
  position: absolute;
  padding: 5px 10px;
  background-color: #00678d;
  color: #fff;
  font-size: 12px;
  max-width: 200px;
}
.tooltip:after {
  position: absolute;
  top: 100%;
  left: 10px;
  margin: 0 auto;
  content: "";
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #00678d;
}
.tooltip-icon {
  background: url(../../assets/icons/Info.svg) no-repeat center -5px;
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
}
.tooltip-icon:hover {
  background: url(../../assets/icons/Info_2.svg) no-repeat center -5px;
  width: 25px;
  height: 25px;
  display: inline-block;
  vertical-align: middle;
}
</style>
