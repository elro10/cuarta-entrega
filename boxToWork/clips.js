const packing = async ()=>{ await designCodes.forEach(async (e) => {
    const singleDesign = await getDesignById(e.designId);
    const stockAvailable = singleDesign.stock;
    const newStock = stockAvailable - e.designQuanty;
    if (stockAvailable > e.designQuanty) {
      const definitiveCart = {
        designId: e.designId,
        quanty: e.designQuanty,
      };
      chkArray.push(definitiveCart);
      // await updateDesign(e.designId,"stock",newStock);
      console.log("si alcanza para enviar");
    } else {
      console.log("no alcanza para enviar");
      const failedToAdd = {
        designId: e.designId,
        quanty: e.designQuanty,
        quantyDiference: newStock,
      };
      failedDesigns.push(failedToAdd);
    }
    console.log("estoy iterando");
  });console.log("termina la iteracion")};