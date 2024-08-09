import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import CloudinaryV2 from "../utils/cloudinary.js";

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    generateToken(res, process.env.ADMIN_EMAIL);
    console.log("yeeaaagss");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.json("ssssss", email, password);
});

const viewUser = asyncHandler(async (req, res) => {
  const userDetails = await User.find();
  res.json(userDetails);
});
const userData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const userDetails = await User.findById(id);
  res.json(userDetails);
});


const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  if (user) {
    const result = await CloudinaryV2.uploader.upload(req.body.image, {
      folder: "user",
    });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.image= {
      public_id: result.public_id,
      url: result.secure_url,
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  console.log("jjjjjjjjjjj");
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (user) {
    res.status(201).json("deletedUser");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin logged out" });
});

const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const result = await CloudinaryV2.uploader.upload(image, {
      folder: "user",
    });

    const user = await User.create({
      name,
      email,
      password,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    if (user) {
      res.status(201).json("user created successfully");
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  authAdmin,
  logoutAdmin,
  viewUser,
  userData,
  createUser,
  updateUser,
  deleteUser,
};
