import express from "express";
import * as dotenv from "dotenv";
import Property from "../mongodb/models/AddProperty.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import authenticateUser from "../middleware/authenticateUser.js";
import Messages from "../mongodb/models/Messages.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: Storage,
  limits: { fileSize: 20 * 1024 * 1024 },
}).single("image");

//get
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to retrieve properties" });
  }
});

//get by id
router.get("/property/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to get property" });
  }
});
//get by user id
router.get("/userproperty/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const properties = await Property.find({ userId: userId });

    if (properties.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No properties found for the given user",
      });
    }

    res.status(200).json({ success: true, data: properties });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to get properties" });
  }
});

//update
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      short_address,
      complete_address,
      desc,
      property_type,
      size,
      price,
      image,
    } = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      {
        title,
        short_address,
        complete_address,
        desc,
        property_type,
        size,
        price,
        image,
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to update property" });
  }
});

//post
router.route("/upload").post(upload, async (req, res) => {
  try {
    const {
      title,
      short_address,
      complete_address,
      desc,
      property_type,
      size,
      price,
      userId,
    } = req.body;
    // console.log(req.file);
    const imagePath = req.file.path;
    const photoData = await cloudinary.uploader.upload(imagePath);
    const photoUrl = photoData.secure_url;

    const sendData = await new Property({
      image: photoUrl,
      title: title,
      short_address: short_address,
      complete_address: complete_address,
      desc: desc,
      property_type: property_type,
      size: size,
      price: price,
      userId: userId,
    }).save();

    res.status(200).json({ success: true, message: "created", data: sendData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Unable to create" });
  }
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params; 

    const property = await Property.findOne({ _id: id });

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    await Property.deleteOne({ _id: id });

    res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Unable to delete property" });
  }
});


//get by user id
router.post("/message", async (req, res) => {
  try {
    const messageToSave = new Messages(req.body);

    await messageToSave.save();

    res.status(200).json({ success: true, msg: "Message Send Successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Enable to Send Message This Time. Sorry ",
    });
  }
});

router.get("/getMessages/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const propertyOwnerId = req.params.id;

    const messages = await Messages.find({ propertyOwnerId });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Enable to get Message This Time. Sorry ",
    });
  }
});

export default router;
