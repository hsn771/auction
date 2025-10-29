<template>
  <div class="container mt-5">
    <h2>Update Auction Product</h2>

    <form @submit.prevent="updateAuction" enctype="multipart/form-data">
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

        <!-- Status -->
        <div class="col-md-6 mb-3">
          <label for="status" class="form-label">Status</label>
          <select
            id="status"
            class="form-select"
            v-model="auction.status"
          >
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Image -->
        <div class="col-md-6 mb-3">
          <label for="image" class="form-label">Change Image</label>
          <input
            type="file"
            class="form-control"
            id="image"
            @change="onImageChange"
          />
        </div>

        <!-- Current Image Preview -->
        <div class="col-md-6 mb-3" v-if="auction.image">
          <label class="form-label d-block">Current Image</label>
          <img
            :src="getImageUrl(auction.image)"
            alt="Current Auction Image"
            class="img-thumbnail"
            style="max-width: 200px;"
          />
        </div>

        <!-- Submit -->
        <div class="col-md-12 mt-3">
          <button type="submit" class="btn btn-primary w-100">
            Update Auction
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "AuctionEdit",
  data() {
    return {
      categories: [],
      auction: {
        category_id: "",
        title: "",
        description: "",
        starting_price: "",
        image: "",
        status: "pending",
      },
      newImage: null,
    };
  },

  mounted() {
    this.getAuction();
    this.getCategories();
  },

  methods: {
    // ✅ Fetch categories for dropdown
    getCategories() {
      DataService.getCategories()
        .then((res) => {
          this.categories = res.data;
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
        });
    },

    // ✅ Fetch auction data for editing
    getAuction() {
      const id = this.$route.params.id;
      DataService.getAuction(id)
        .then((response) => {
          this.auction = response.data;
        })
        .catch((error) => {
          console.error("Error fetching auction:", error);
          alert("Failed to load auction data.");
        });
    },

    // ✅ Handle image selection
    onImageChange(event) {
      this.newImage = event.target.files[0];
    },

    // ✅ Update auction API call
    updateAuction() {
      const id = this.$route.params.id;
      const formData = new FormData();

      Object.keys(this.auction).forEach((key) => {
        formData.append(key, this.auction[key]);
      });

      if (this.newImage) {
        formData.append("image", this.newImage);
      }

      DataService.updateAuction(id, formData)
        .then((response) => {
          console.log(response.data);
          alert("Auction updated successfully!");
          this.$router.push({ name: "auction_list" });
        })
        .catch((error) => {
          console.error("Error updating auction:", error.response?.data || error);
          alert("Failed to update auction. Please check console for details.");
        });
    },

    // ✅ Helper for image display
    getImageUrl(imagePath) {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `/storage/${imagePath}`; // Adjust if your storage path differs
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
