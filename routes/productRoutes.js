import express from "express";
import {
  brainTreePaymentController,
   braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
  // createProductReview,
  // getProductReviews,
  // deleteReview,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
 router.get("/braintree/token", braintreeTokenController);

// //payments
 router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

//  router.route("/review").put( createProductReview);
//  router
//   .route("/reviews")
//   .get(getProductReviews)
//   .delete(deleteReview);

import { getRecommendedProducts } from "../controllers/productController.js";


router.get("/recommended-products/:userId", requireSignIn, getRecommendedProducts, async (req, res) => {
  try {
    const { userId } = req.params;
    const recommendedProducts = await getRecommendedProducts(userId);
    res.json({
      success: true,
      message: "Recommended products fetched successfully",
      products: recommendedProducts,
    });
  } catch (error) {
    console.error("Error fetching recommended products", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recommended products",
      error: error.message,
    });
  }
});


export default router;