<template>
  <div class="container-fluid login-page">
    <div class="row">
      <div class="col-md-6 position-md-static position-relative">
        <div class="benefit-img">
          <div class="background-gradient"></div>
          <img src="../assets/welcome-image.png" alt="Benefits" />
          <div class="benefits-section p-3 p-md-0">
            <h1 class="benefit-title text-white mb-3">Benefits</h1>
            <p class="text-white">
              The COBRA Enrollment Portal project aims to provide employees with
              a user-friendly web portal that enables them to self-enroll in
              COBRA benefits. The portal encompasses a comprehensive workflow
              designed to guide individuals through the enrollment process and
              allows them to select from the benefits offered by their former
              employer.
            </p>
          </div>
          <div class="black-gradient"></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="login-section p-3 p-md-0">
          <div class="login-form">
            <component
              :is="currentStep"
              :formData="formData"
              @userDataValidate="handleOtpValidation"
              @otpValueSubmit="handleOtpSubmit"
              @editEmailId="handleEmailId"
              @otpValidateForm="otpValidateForm"
            ></component>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserValidationForm from "@/components/UserValidationForm.vue";
import OtpValidationForm from "@/components/OtpValidationForm.vue";
import UserDetails from "@/components/UserDetails.vue";
import EditEmailForm from "@/components/EditEmailForm.vue";
import * as EmployeeService from "@/services/employeeService";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "LoginView",
  components: {
    UserValidationForm,
    OtpValidationForm,
    UserDetails,
    EditEmailForm,
  },
  data() {
    return {
      currentStep: "UserValidationForm",
      formData: {} as Record<string, number>,
    };
  },
  methods: {
    async handleOtpValidation(): Promise<void> {
      console.log("handleOtpValidation");
      const response = await EmployeeService.getEmployeeDetails();
      if (response !== undefined && response.ok) {
        this.formData = await response.data;
        console.log("allformData", this.formData);
        this.currentStep = "OtpValidationForm";
      }
    },
    handleOtpSubmit(data: Record<string, number>) {
      this.formData = data;
      toast.success("Your Email address has been successfully verified", {
        position: toast.POSITION.TOP_CENTER,
        style: { width: "auto" },
        autoClose: false,
      });
      this.currentStep = "UserDetails";
    },
    handleEmailId() {
      this.currentStep = "EditEmailForm";
    },
    otpValidateForm() {
      this.currentStep = "OtpValidationForm";
    },
  },
});
</script>

<style scoped lang="scss"></style>
