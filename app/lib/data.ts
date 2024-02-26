import { Message, User, Keywords } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5;

  try {
    connectToDB();
    const count = await User.countDocuments({ username: { $regex: regex } });
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchAllUsers = async () => {
  try {
    connectToDB();

    const users = await User.find({});
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch all users!");
  }
};

export const fetchUser = async (id: string) => {
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchMessages = async () => {
  try {
    connectToDB();
    const messages = await Message.find().populate("user");
    return messages;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch messages!");
  }
};

export const fetchMessagesForSearch = async (q: string, page: number) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await Message.countDocuments({ comment: { $regex: regex } });
    const messages = await Message.find({ comment: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, messages };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch messages!");
  }
};

export const fetchMessagesByFilter = async (filters: any = {}) => {
  try {
    connectToDB();
    const messages = await Message.find(filters).populate("user");
    return messages;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch messages by filter!");
  }
};

export const fetchMessagesByUser = async (userId: string) => {
  try {
    connectToDB();
    const messages = await Message.find({ user: userId }).populate("user");

    return messages;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch messages by user!");
  }
};

export const fetchMessagesByKeyword = async (keyword: string) => {
  const regex = new RegExp(keyword, "i");

  try {
    connectToDB();

    const messages = await Message.find({
      comment: { $regex: regex },
    }).populate("user");

    return messages;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch messages by keyword!");
  }
};

export const fetchAllKeywords = async () => {
  try {
    connectToDB();
    const keywordsData = await Keywords.find({});
    return keywordsData;
  } catch (err) {
    console.log(err);
    return { error: "Failed to create keyword" };
  }
};

export const fetchAllMessages = async () => {
  try {
    connectToDB();
    const messagesData = await Message.find({});
    return messagesData;
  } catch (err) {
    console.log(err);
    return { error: "Failed to create keyword" };
  }
};

export const fetchKeywordsForSearch = async (q: string) => {
  const regex = new RegExp(q, "i");
  try {
    connectToDB();

    const keywords = await Keywords.find({ keywords: { $regex: regex } });

    const plainKeywords = keywords.map((keyword) => keyword.toObject());

    if (!keywords || keywords.length === 0) {
      return { success: true, message: "No keywords found", plainKeywords: [] };
    }

    return { success: true, message: "Keyword find", plainKeywords };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch messages!");
  }
};
