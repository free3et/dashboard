"use server";

import { revalidatePath } from "next/cache";
import { User, Message, Keywords } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();
    await User.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addKeywords = async (formData) => {
  const { keyword } = Object.fromEntries(formData);

  if (!keyword.trim()) {
    return { success: false, error: "Keyword cannot be empty" };
  }

  try {
    connectToDB();

    const existingKeyword = await Keywords.findOne({ keywords: keyword });

    if (existingKeyword) {
      return { error: "Keyword already exists" };
    }

    const newKeyword = new Keywords({
      keywords: keyword,
    });

    await newKeyword.save();

    revalidatePath("/dashboard/keywords");

    return { success: true, message: "Keyword added successfully" };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create keyword!");
  }
};

export const deleteKeyword = async (id) => {
  try {
    connectToDB();
    await Keywords.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete keyword!");
  }

  revalidatePath("/dashboard/keywords");
};

export const addMessage = async (formData) => {
  const { userId, comment } = Object.fromEntries(formData);
  if (!comment.trim()) {
    return { success: false, error: "Comment cannot be empty" };
  }

  try {
    connectToDB();
    const newMessage = new Message({
      user: userId,
      comment,
    });

    await newMessage.save();

    await User.findByIdAndUpdate(userId, {
      $push: { messages: newMessage._id },
    });

    revalidatePath("/dashboard/messages");

    return { success: true, message: "Message added successfully" };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create message!");
  }
};

export const deleteMessage = async (id) => {
  try {
    connectToDB();
    await Message.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete message!");
  }

  revalidatePath("/dashboard/messages");
};

export const messageByUserId = async (formData) => {
  try {
    const userId = formData.get("user");
    const filters = JSON.parse(formData.get("filters"));

    connectToDB();

    const filterQuery = {};

    if (userId) {
      filterQuery.user = userId;
    }

    if (filters.date) {
      filterQuery.createdAt = { $gte: new Date(filters.date) };
    }

    if (filters.liked) {
      filterQuery["reactions.liked"] = filters.liked;
    }

    const messages = await Message.find(filterQuery).populate("user");

    const simplifiedMessages = messages.map((message) => ({
      _id: message._id,
      username: message.user.username,
      comment: message.comment,
      user: message.user._id,
      reactions: message.reactions,
    }));

    simplifiedMessages.forEach((message) => {
      message.user = message.user.toJSON();
    });

    if (Object.keys(filterQuery).length === 0) {
      return { simplifiedMessages: [] };
    }

    return { simplifiedMessages };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch messages for the user");
  }
};

export const messageByKeyword = async (formData) => {
  try {
    const keyword = formData.get("keywordname");

    await connectToDB();
    const messages = await Message.find({
      comment: { $regex: keyword, $options: "i" },
    }).populate("user");

    const messagesData = messages.map((message) => message.toObject());

    return { messagesData };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch messages for the user");
  }
};

export const reactToMessage = async (messageId, userId) => {
  try {
    connectToDB();

    const message = await Message.findById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    if (!Array.isArray(message.reactions)) {
      message.reactions = [];
    }

    if (!message.reactions.liked) {
      message.reactions.liked = true;
      await message.save();
    }

    message.user = message.user.toJSON();
    revalidatePath("/dashboard/messages");

    return { success: true };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to react to the message");
  }
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};

export const googleAuthenticate = async (prevState, formData) => {
  try {
    await signIn("google");
  } catch (error) {
    throw error;
  }
};
