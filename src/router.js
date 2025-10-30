import { createWebHistory, createRouter } from "vue-router";
import RegisterForm from "@/components/RegisterForm.vue";

const routes = [
  // 🔹 Auth Routes
  {
    path: "/",
    alias: "/login",
    name: "login",
    component: () => import("./components/LoginForm"),
  },
  {
    path: "/register",
    name: "register",
    component: RegisterForm,
    meta: { layout: "auth" },
  },

  // 🔹 Dashboard
  {
    path: "/dashboard",
    alias: "/dashboard",
    name: "dashboard",
    component: () => import("./components/Dashboard"),
  },

  // 🔹 Category Routes
  {
    path: "/category_list",
    name: "category_list",
    component: () => import("./components/category/CategoryList"),
  },
  {
    path: "/add_category",
    name: "add_category",
    component: () => import("./components/category/CategoryCreate"),
  },
  {
    path: "/edit_category/:id",
    name: "edit_category",
    component: () => import("./components/category/CategoryEdit"),
    props: true,
  },

  // 🔹 Auction Routes
  {
    path: "/auction_list",
    name: "auction_list",
    component: () => import("./components/auction/AuctionList"),
  },
  {
    path: "/add_auction",
    name: "add_auction",
    component: () => import("./components/auction/AuctionCreate"),
  },
  {
    path: "/auctions/edit/:id",
    name: "edit_auction",
    component: () => import("./components/auction/AuctionEdit"),
    props: true,
  },

  // 🔹 Bid Routes
  {
    path: "/bid_list",
    name: "bid_list",
    component: () => import("./components/bid/BidList"),
  },
  {
    path: "/add_bid",
    name: "add_bid",
    component: () => import("./components/bid/BidCreate"),
  },
  {
    path: "/bids/edit/:id",
    name: "edit_bid",
    component: () => import("./components/bid/BidEdit"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
