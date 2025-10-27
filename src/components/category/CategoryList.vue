<template>
  <div class="container mt-5">
    <h3><strong>All Categories</strong></h3>

    <router-link to="/add_category" class="btn btn-primary mb-3">
      Add New Category
    </router-link>

    <div class="row">
      <div class="col-12">
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>#SL</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(category, index) in categories" :key="category.id">
              <td>{{ index + 1 }}</td>
              <td>{{ category.name }}</td>
              <td>{{ category.description }}</td>
              <td>
                <router-link
                  :to="`/categories/edit/${category.id}`"
                  class="btn btn-sm btn-primary me-2"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteCategory(category.id)"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="categories.length === 0">
              <td colspan="4" class="text-center text-muted">
                No categories found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "CategoryList",

  data() {
    return {
      categories: [],
    };
  },

  methods: {
    // ✅ Fetch all categories
    getCategories() {
      DataService.getCategories()
        .then((response) => {
          // The backend returns { success, message, data }
          this.categories = response.data.data.data || response.data.data; 
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to load categories.");
        });
    },

    // ✅ Delete a category
    deleteCategory(id) {
      if (!confirm("Are you sure you want to delete this category?")) return;

      DataService.deleteCategory(id)
        .then(() => {
          alert("Category deleted successfully!");
          this.getCategories(); // Refresh list
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
          alert("Failed to delete category.");
        });
    },
  },

  mounted() {
    this.getCategories();
  },
};
</script>
