<template>
  <div class="container-xxl py-5">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="text-center text-primary mb-4">Student Registration Form</h2>
        <form method="post" class="border p-4 bg-light rounded">
          
          <!-- Student Name -->
          <div class="mb-3">
            <label for="name" class="form-label text-primary">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              name="name"
              v-model="formData.name"
              placeholder="Enter student's full name"
            />
          </div>

          <!-- Contact Number -->
          <!-- <div class="mb-3">
            <label for="contact" class="form-label text-primary">Contact Number</label>
            <input
              type="text"
              class="form-control"
              id="contact"
              name="contact"
              v-model="formData.contact"
              placeholder="Enter contact number"
            />
          </div> -->

          <!-- Email -->
          <div class="mb-3">
            <label for="email" class="form-label text-primary">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              v-model="formData.email"
              placeholder="Enter email address"
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label text-primary">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model="formData.password"
              placeholder="Enter a password"
            />
          </div>

          <!-- Submit Button -->
          <button type="button" @click="register" class="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import router from "@/router";

export default {
  name: "RegisterForm",
  data() {
    return {
      formData: {
        name: "",
        
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      const data = {
        name: this.formData.name,
        email: this.formData.email,
        password: this.formData.password,
      };

      DataService.register(data)
        .then((response) => {
          if (response.data.success) {
            alert("Registration successful!");
            router.push({ name: "login" }); // redirect to login
          } else {
            alert(response.data.error || "Registration failed!");
          }
        })
        .catch((e) => {
          console.error(e);
          alert("An error occurred during registration.");
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
}
.text-center {
  text-align: center;
}
</style>
