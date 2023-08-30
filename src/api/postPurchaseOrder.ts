import axios from 'axios'

export const postPurchaseOrder = async (vendorName: string, date: string, file: any) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("vendor_name", vendorName);
        formData.append("date", date);
        const res = await axios.post(`http://localhost:3000/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return res
    } catch (error) {
        console.log('error',error)
    }
}