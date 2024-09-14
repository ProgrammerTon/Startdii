import { baseUrl } from "@/constants/const";

export const uploadFile = async (formData: FormData): Promise<any> => {
  try {
    const response = await fetch(`${baseUrl}/files/upload`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Error uploading documents:", err);
    return null;
  }
};

async function downloadFile(filename: string, filetype: "img" | "pdf") {
  try {
    if (filetype === "img") {
      const response = await fetch(`${baseUrl}/files/images/${filename}`, {
        method: "GET",
      });
      if (response.ok) {
        return response;
      }
      return null;
    }
    if (filetype === "pdf") {
      const response = await fetch(`${baseUrl}/files/pdfs/${filename}`, {
        method: "GET",
      });
      if (response.ok) {
        return response;
      }
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  uploadFile,
  downloadFile,
};
