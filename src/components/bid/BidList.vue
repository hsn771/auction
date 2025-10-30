<template>
  <div class="container mt-5">
    <h3><strong>All Bids</strong></h3>

    <router-link to="/add_bid" class="btn btn-primary mb-3">
      Add New Bid
    </router-link>

    <div class="row">
      <div class="col-12">
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th>#SL</th>
              <th>Auction ID</th>
              <th>User ID</th>
              <th>Bid Amount</th>
              <th>Bid Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(bid, index) in bids" :key="bid.id">
              <td>{{ index + 1 }}</td>
              <td>{{ bid.auction_id }}</td>
              <td>{{ bid.user_id }}</td>
              <td>${{ bid.bid_amount }}</td>
              <td>{{ formatDate(bid.bid_date) }}</td>
              <td>
                <router-link
                  :to="`/bids/edit/${bid.id}`"
                  class="btn btn-sm btn-primary me-2"
                >
                  Edit
                </router-link>
                <button
                  @click="deleteBid(bid.id)"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="bids.length === 0">
              <td colspan="6" class="text-center text-muted">
                No bids found.
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
  name: "BidList",

  data() {
    return {
      bids: [],
    };
  },

  methods: {
    // ✅ Fetch all bids
    getBids() {
      DataService.getBids()
        .then((response) => {
          // Adjust if API returns differently (e.g., response.data.data)
          this.bids = response.data;
        })
        .catch((error) => {
          console.error("Error fetching bids:", error);
          alert("Failed to load bids.");
        });
    },

    // ✅ Delete a bid
    deleteBid(id) {
      if (!confirm("Are you sure you want to delete this bid?")) return;

      DataService.deleteBid(id)
        .then(() => {
          alert("Bid deleted successfully!");
          this.getBids(); // Refresh list
        })
        .catch((error) => {
          console.error("Error deleting bid:", error);
          alert("Failed to delete bid.");
        });
    },

    // 🕒 Format date for display
    formatDate(dateStr) {
      if (!dateStr) return "-";
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },

  mounted() {
    this.getBids();
  },
};
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}
</style>
