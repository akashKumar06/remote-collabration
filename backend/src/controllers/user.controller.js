import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export async function registerUser(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // 1. check all the fields are valid
    if (
      [firstname, lastname, email, password].some(
        (field) => !field || field.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fileds are required.");
    }

    // 2. check if user with email already exists
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new ApiError(400, "User with email already exists.");
    }

    const avatar = firstname[0].toUpperCase() + lastname[0].toUpperCase();

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password,
      avatar,
    });

    const accessToken = await generateAccessToken(newUser._id);
    const refreshToken = await generateRefreshToken(newUser._id);

    if (!accessToken || !refreshToken) {
      await User.findByIdAndDelete(newUser._id);
      throw new ApiError(
        500,
        "RefreshToken or AccessToken could not be generated."
      );
    }

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return res
      .status(201)
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          id: newUser._id,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
          email: newUser.email,
          avatar: newUser.avatar,
        },
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    // 1. check all the fields are valid
    if ([email, password].some((field) => !field || field.trim() === "")) {
      throw new ApiError(400, "All fileds are required.");
    }

    // 2. user with email exists
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(401, "Invalid credentials.");

    // 3. password entered is correct
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) throw new ApiError(401, "Invalid credentials.");

    // 4. generate access and refresh token
    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    if (!accessToken || !refreshToken) {
      throw new ApiError(
        500,
        "RefreshToken or AccessToken could not be generated."
      );
    }

    // 5. store the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // 6. send response with cookies
    return res
      .status(200)
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          avatar: user.avatar,
        },
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export async function refreshTokenHandler(req, res) {
  try {
    const authHeader = req.headers["authorization"];
    const incomingRefreshToken =
      req.cookies?.refresh_token ||
      (authHeader &&
        authHeader.startsWith("Bearer") &&
        authHeader.split(" ")[1]);

    // 1. check if refreshToken is present
    if (!incomingRefreshToken) throw new ApiError(400, "Token is required.");

    // 2. decode the incoming refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // 3. get the user with refresh token
    const user = await User.findById(decodedToken.id);
    if (!user) throw new ApiError(400, "Invalid token or user not found.");

    if (incomingRefreshToken !== user.refreshToken)
      throw new ApiError(400, "Invalid token");

    // 4. generate new access and refresh token
    const newAccessToken = await generateAccessToken(user._id);
    const newRefreshToken = await generateRefreshToken(user._id);

    // 5. update the new refresh token in the user
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    // 6. return response and cookie
    return res
      .status(200)
      .cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
      });
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      return res
        .status(error.statusCode)
        .json({ success: false, message: error.message });
    }
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}

export function logoutUser(req, res) {}
