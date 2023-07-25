//imports propios
import { generateDesigns } from "../utils/utils.js";

let designs = [];

export const getMockDesigns = () =>{
    const designsToGenerate = 100;
    for(let i=0;i<designsToGenerate;i++){
        const designToPush = generateDesigns();
        designs.push(designToPush);
    }
    return designs
}