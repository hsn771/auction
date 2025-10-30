<template>
  <div class="container mt-5">
    <h2>Add New Bid</h2>

    <form @submit.prevent="addBid">
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
            Add Bid
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DataService from "../../services/DataService";

export default {
  name: "BidCreate",

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
    addBid() {
      DataService.addBid(this.bid)
        .then((response) => {
          console.log(response.data);
          alert("Bid added successfully!");
          this.$router.push({ name: "bid_list" });
        })
        .catch((error) => {
          console.error("Error adding bid:", error.response?.data || error);
          alert("Failed to add bid. Please check console for details.");
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 900px;
}
</style>
