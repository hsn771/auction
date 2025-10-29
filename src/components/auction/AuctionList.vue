<template>
  <div class="container mt-5">
    <h3><strong>All Auctions Products</strong></h3>

    <router-link to="/add_auction" class="btn btn-primary mb-3">
      Add New Auction
    </router-link>

    <div class="row">
      <div class="col-12">
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>#SL</th>
              <th>Title</th>
              <th>Category</th>
              <th>Starting Price</th>
              <th>Status</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(auction, index) in auctions" :key="auction.id">
              <td>{{ index + 1 }}</td>
              <td>{{ auction.title }}</td>
              <td>{{ auction.category?.name || "N/A" }}</td>
              <td>{{ auction.starting_price }}</td>
              <td>
                <span
                  :class="{
                    'badge bg-secondary': auction.status === 'pending',
                    'badge bg-success': auction.status === 'active',
                    'badge bg-danger': auction.status === 'closed',
                    'badge bg-dark': auction.status === 'cancelled',
                  }"
                >
                  {{ auction.status }}
                </span>
              </td>
              <td>
                <img
                  v-if="auction.image"
                  :src="getImageUrl(auction.image)"
                  alt="Auction Image"
                  class="img-thumbnail"
                  style="max-width: 80px;"
                />
                <span v-else class="text-muted">No Image</span>
              </td>
              <td>
                <router-link
                  :to="`/auctions/edit/${auction.id}`"
                  class="btn btn-sm btn-primary me-2"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteAuction(auction.id)"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="auctions.length === 0">
              <td colspan="7" class="text-center text-muted">
                No auctions found.
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
  name: "AuctionList",

  data() {
    return {
      auctions: [],
    };
  },

  methods: {
    // ✅ Fetch all auctions
    getAuctions() {
      DataService.getAuctions()
        .then((response) => {
          // Backend returns { success, message, data } or paginated data
          this.auctions = response.data;
        })
        .catch((error) => {
          console.error("Error fetching auctions:", error);
          alert("Failed to load auctions.");
        });
    },

    // ✅ Delete an auction
    deleteAuction(id) {
      if (!confirm("Are you sure you want to delete this auction?")) return;

      DataService.deleteAuction(id)
        .then(() => {
          alert("Auction deleted successfully!");
          this.getAuctions(); // Refresh list
        })
        .catch((error) => {
          console.error("Error deleting auction:", error);
          alert("Failed to delete auction.");
        });
    },

    // ✅ Helper for image display
    getImageUrl(imagePath) {
      if (!imagePath) return "";
      if (imagePath.startsWith("http")) return imagePath;
      return `/storage/${imagePath}`; // Adjust if different path
    },
  },

  mounted() {
    this.getAuctions();
  },
};
</script>

<style scoped>
.badge {
  font-size: 0.9em;
}
</style>
