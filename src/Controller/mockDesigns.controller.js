import { getMockDesigns } from "../Service/mockDesigns.service.js";

export const captureGetDesignsMock = async (req,res) =>{
const results = await getMockDesigns();
res.json({ status: "success", payLoad: results });
}