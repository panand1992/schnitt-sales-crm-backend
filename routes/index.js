import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Schnitt Sales CRM Backend" });
});

export default router;
