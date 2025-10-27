<template>
  <div class="container mt-5">
    <h2>Update Category</h2>
    <form @submit.prevent="updateCategory">
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
            Update Category
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "CategoryEdit",
  data() {
    return {
      category: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    // ✅ Fetch existing category data for editing
    getCategory() {
      const id = this.$route.params.id;
      DataService.getCategory(id)
        .then((response) => {
          this.category = response.data.data; // using backend JSON structure
        })
        .catch((error) => {
          console.error("Error fetching category:", error);
          alert("Failed to load category data.");
        });
    },

    // ✅ Update category API call
    updateCategory() {
      const id = this.$route.params.id;
      DataService.updateCategory(id, this.category)
        .then((response) => {
          console.log(response.data);
          alert("Category updated successfully!");
          this.$router.push({ name: "category_list" });
        })
        .catch((error) => {
          console.error("Error updating category:", error.response?.data || error);
          alert("Failed to update category. Check console for details.");
        });
    },
  },
  mounted() {
    this.getCategory();
  },
};
</script>
