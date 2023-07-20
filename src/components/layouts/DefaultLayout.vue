<template>
  <div v-if="$route.name === 'agreement'" class="agreement-layout">
    <router-view />
  </div>
  <div v-else class="default-layout">
    <DefaultHeaderComponent />
    <div class="container-fluid login-page">
      <div class="row">
        <div class="col-md-6 position-md-static position-relative">
          <div class="benefit-img">
            <div class="background-gradient"></div>
            <img src="../../assets/images/welcome-image.png" alt="Benefits" />
            <div class="benefits-section p-3 p-md-0">
              <h1 class="benefit-title text-white mb-3">Benefits</h1>
              <p class="text-white">
                The COBRA Enrollment Portal project aims to provide employees
                with a user-friendly web portal that enables them to self-enroll
                in COBRA benefits. The portal encompasses a comprehensive
                workflow designed to guide individuals through the enrollment
                process and allows them to select from the benefits offered by
                their former employer.
              </p>
            </div>
            <div class="black-gradient"></div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="login-section p-3 p-md-0">
            <div class="login-form">
              <slot></slot>
              <router-view />
            </div>
            <div class="footer-row">
              <div class="footer-links">
                <ul>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">Privacy Statement</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DefaultHeaderComponent from "../common/DefaultHeaderComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    DefaultHeaderComponent,
  },
});
</script>
