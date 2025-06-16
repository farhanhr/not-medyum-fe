import axiosInstance from "../../../../../../lib/axios";

export const uploadImage = async (fileUpload: File) => {
    try {
        const formData = new FormData()
        formData.append("image", fileUpload);
        const response = await axiosInstance.post("/admin/contents/upload-image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    } catch (error: any) {
        throw error;
    }
}