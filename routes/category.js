const express = require("express");
const router = express.Router();
const { Category } = require("../models/category");

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find();
  console.log(categoryList);
  categoryList
    ? res.send(categoryList)
    : res.status(500).json({ success: false });
});

router.get(`/:id`, async (req, res) => {
  const categoryList = await Category.findById(req.params.id);
  categoryList
    ? res.send(categoryList).status(200)
    : res.status(500).json({message: "Category can not be found!" });
});

router.post(`/`, async (req, res) => {
  let category = new Category({
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  });

  category
    .save()
    .then((createdCategory) => {
      res.status(201).json(createdCategory);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.delete("/:id", (req, res) => {
  const categoryId = req.params.id;
  Category.findByIdAndRemove(categoryId)
    .then((category) => {
      category
        ? res
            .status(200)
            .json({ success: true, message: "Delete successfully" })
        : res
            .status(404)
            .json({ success: false, message: "Can not find category" });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.put("/:id", (req, res) => {
  const categoryId = req.params.id;
  Category.findByIdAndUpdate(categoryId, {
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  })
    .then((category) => {
      category
        ? res
            .status(200)
            .json({ success: true, message: "Update category successfully" })
        : res
            .status(404)
            .json({ success: false, message: "Can not find category" });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
