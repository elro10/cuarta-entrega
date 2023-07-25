import DesignMongoDao from "../Dao/designs.dao.js";

const designManager = new DesignMongoDao();

export const getDesigns = (limit, page, sortQ, queryKey, queryParam) => {
  const designs = designManager.getDesigns(limit, page, sortQ, queryKey, queryParam);
  return designs;
};

export const getDesignById = async(designId) => {
  const design = await designManager.getDesignById(designId);
  return design;
};

export const addDesignPack = async (
  code,
  title,
  description,
  category,
  price,
  stock,
  shops,
  photos,
  owner
) => {
  //revisar que el codigo no se repita en otro diseño
  const chkCode = await designManager.getDesignByCode(code);
  if (chkCode) {
    return `el codigo para este producto ya existe para el diseño ${chkCode.title}, cambia el codigo e intenta de nuevo`;
  } else {
    //empaqueto data
    const designPack = {
      code,
      title,
      description,
      category,
      price,
      stock,
      shops,
      photos,
      owner
    };
    const designToAdd = designManager.addDesign(designPack);
    return designToAdd;
  }
};

export const updateDesign = async (desId, value, data) => {
  //revisar que id exista
  const chkDesign = await designManager.chkDesign(desId);
  if (chkDesign) {
    return await designManager.updateDesign(desId, value, data);
  } else {
    return "el diseño no existe";
  }
};

export const deleteDesign = async (designId) => {
  //revisar que id exista
  const chkDesign = await designManager.chkDesign(designId);
  if (chkDesign) {
    return designManager.deleteDesign(designId);
  } else {
    return "el diseño no existe";
  }
};
