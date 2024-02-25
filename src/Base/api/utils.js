import axiosInstance from "./axios";

export const uploadFile = async (url, payload) => {
    const res = await axiosInstance.post(url, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
};