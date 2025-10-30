<template>
  <div class="container mt-5">
    <h2>Update Bid</h2>

    <form @submit.prevent="updateBid">
      <div class="row">
        <!-- Auction ID -->
        <div class="col-md-3">
          <div class="mb-3">
            <label for="auction_id" class="form-label">Auction ID</label>
            <input
              type="number"
              class="form-control"
              id="auction_id"
              v-model="bid.auction_id"
              required
            />
          </div>
        </div>

        <!-- User ID -->
        <div class="col-md-3">
          <div class="mb-3">
            <label for="user_id" class="form-label">User ID</label>
            <input
              type="number"
              class="form-control"
              id="user_id"
              v-model="bid.user_id"
              required
            />
          </div>
        </div>

        <!-- Bid Amount -->
        <div class="col-md-3">
          <div class="mb-3">
            <label for="bid_amount" class="form-label">Bid Amount</label>
            <input
              type="number"
              step="0.01"
              class="form-control"
              id="bid_amount"
              v-model="bid.bid_amount"
              required
            />
          </div>
        </div>

        <!-- Bid Date -->
        <div class="col-md-3">
          <div class="mb-3">
            <label for="bid_date" class="form-label">Bid Date</label>
            <input
              type="date"
              class="form-control"
              id="bid_date"
              v-model="bid.bid_date"
              required
            />
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <div class="row">
        <div class="col-md-12 d-flex justify-content-end">
          <button type="submit" class="btn btn-primary px-4">
            Update Bid
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "BidEdit",

  data() {
    return {
      bid: {
        auction_id: "",
        user_id: "",
        bid_amount: "",
        bid_date: "",
      },
    };
  },

  methods: {
    // ✅ Fetch existing bid data
    getBid() {
      const id = this.$route.params.id;
      DataService.getBid(id)
        .then((response) => {
          // Adjust if your API wraps data differently
          this.bid = response.data.data || response.data;
        })
        .catch((error) => {
          console.error("Error fetching bid:", error);
          alert("Failed to load bid data.");
        });
    },

    // ✅ Update bid API call
    updateBid() {
      const id = this.$route.params.id;
      DataService.updateBid(id, this.bid)
        .then((response) => {
          console.log(response.data);
          alert("Bid updated successfully!");
          this.$router.push({ name: "bid_list" });
        })
        .catch((error) => {
          console.error("Error updating bid:", error.response?.data || error);
          alert("Failed to update bid. Check console for details.");
        });
    },
  },

  mounted() {
    this.getBid();
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
