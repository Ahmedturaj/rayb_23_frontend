/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const TOKEN = session?.user?.accessToken;
    if (TOKEN) {
      config.headers.Authorization = `Bearer ${TOKEN}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User API

export const getUserProfile = async () => {
  try {
    const response = await api.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export async function updateUserProfile(data: any) {
  try {
    const response = await api.put(`/user/update-profile`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

// Message API

// Get my chat
export async function getMyChat(userId: string) {
  try {
    const response = await api.get(`/chat/my-chat/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching my chat:", error);
    return error;
  }
}

// get messages
export async function getMessages(chatId: string) {
  try {
    const response = await api.get(`/message/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return error;
  }
}

// Send message
export async function sendMessage({ data }: any) {
  try {
    const response = await api.post(`/message/send-message`, data);
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    return error;
  }
}

//get all business
export async function getAllbusiness() {
  try {
    const res = await api.get("/business");
    return res.data;
  } catch (error) {
    console.error("error fetching all business", error);
    return error;
  }
}

//get single business
export async function getSingleBusiness(params: string | string[]) {
  try {
    const res = await api.get(`/business/${params}`);
    return res.data;
  } catch (error) {
    console.error("error fetching single business", error);
    return error;
  }
}
