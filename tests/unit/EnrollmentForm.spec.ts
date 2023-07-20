import { shallowMount } from "@vue/test-utils";
import EnrollmentForm from "@/components/EnrollmentForm.vue";

describe("Test for EnrollmentForm.vue component", () => {
  const formData = {
    name: "testname",
    email: "testemail@gmail.com",
    dob: "20/04/1880",
    gender: "Male",
    mobile: "7008123456",
    address: "testaddress",
  };
  test("Check if template is rendered and class name is available.", () => {
    const wrapper = shallowMount(EnrollmentForm, {
      props: { formData },
    });
    expect(wrapper.find("#submit-nextstep").isVisible()).toBe(true);
  });
  test("Onclick button rendered to EnrollmentPortal component", () => {
    const wrapper = shallowMount(EnrollmentForm, {
      props: { formData },
    });
    const button = wrapper.find("#submit-nextstep");
    button.trigger("click");

    expect(wrapper.vm.submitEnrollment()).toEqual(undefined);
  });
});
