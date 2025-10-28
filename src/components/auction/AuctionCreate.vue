<template>
  <div class="container mt-5">
    <h2>Add New Auction Product</h2>

    <form @submit.prevent="addAuction" enctype="multipart/form-data">
      <div class="row">
        <!-- Title -->
        <div class="col-md-6 mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="auction.title"
            required
          />
        </div>

        <!-- Category -->
        <div class="col-md-6 mb-3">
          <label for="category" class="form-label">Category</label>
          <select
            id="category"
            class="form-select"
            v-model="auction.category_id"
            required
          >
            <option value="">Select Category</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Description -->
        <div class="col-md-12 mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            id="description"
            class="form-control"
            v-model="auction.description"
            rows="3"
          ></textarea>
        </div>

        <!-- Starting Price -->
        <div class="col-md-6 mb-3">
          <label for="starting_price" class="form-label">Starting Price</label>
          <input
            type="number"
            class="form-control"
            id="starting_price"
            v-model="auction.starting_price"
            min="0"
            step="0.01"
            required
          />
        </div>

        <!-- Image Upload -->
        <div class="col-md-6 mb-3">
          <label for="image" class="form-label">Product Image</label>
          <input
            type="file"
            class="form-control"
            id="image"
            @change="onImageChange"
          />
        </div>

        <!-- Submit -->
        <div class="col-md-12 mt-3">
          <button type="submit" class="btn btn-primary w-100">
            Add Auction
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "AuctionCreate",
  data() {
    return {
      categories: [],
      auction: {
        // seller_id: 1, // example: replace with logged-in seller ID
        category_id: "",
        title: "",
        description: "",
        starting_price: "",
        image: null,
      },
    };
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    fetchCategories() {
      DataService.getCategories()
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.error("Error loading categories:", err);
        });
    },

    onImageChange(event) {
      this.auction.image = event.target.files[0];
    },

    addAuction() {
      const formData = new FormData();
      Object.keys(this.auction).forEach((key) => {
        formData.append(key, this.auction[key]);
      });

      DataService.addAuction(formData)
        .then((response) => {
          console.log(response.data);
          alert("Auction added successfully!");
          this.$router.push({ name: "auction_list" });
        })
        .catch((error) => {
          console.error("Error adding auction:", error.response?.data || error);
          alert("Failed to add auction. Please check console for details.");
        });
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
