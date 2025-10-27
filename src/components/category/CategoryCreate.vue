<template>
  <div class="container mt-5">
    <h2>Add New Category</h2>
    <form @submit.prevent="addCategory">
      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="category.name"
              required
            />
          </div>
        </div>

        <div class="col-md-4">
          <div class="mb-3">
            <label for="description" class="form-label">Description</label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="category.description"
              required
            />
          </div>
        </div>

        <div class="col-md-4 d-flex align-items-end">
          <button type="submit" class="btn btn-primary w-100">
            Add Category
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "CategoryCreate",

  data() {
    return {
      category: {
        name: "",
        description: "",
      },
    };
  },

  methods: {
    addCategory() {
      DataService.addCategory(this.category)
        .then((response) => {
          console.log(response.data);
          alert("Category added successfully!");
          this.$router.push({ name: "category_list" });
        })
        .catch((error) => {
          console.error("Error adding category:", error.response?.data || error);
          alert("Failed to add category. Please check console for details.");
        });
    },
  },
};
</script>
