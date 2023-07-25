import { logger } from "../utils/logger.js";
import designModel from "./Mongo/models/designs.model.js";

class DesignMongoDao {
  constructor() {}

  //confirmar existencia de design
  async chkDesign(designId) {
    const designToCheck = await designModel.findById(designId);
    return designToCheck;
  }

  //get
  async getDesigns(limit, page, sortQ, queryKey, queryParam) {
    //filtros
    let limitIn = limit ? limit : 25;
    let pageIn = page ? page : 1;
    let sortIn = sortQ ? { stock: sortQ } : false;
    //queries
    let queryKeyIn = queryKey;
    let queryIn = queryParam;
    let querySearch;
    //query pack
    if (queryKeyIn && queryIn) {
      querySearch = { [queryKeyIn]: [queryIn] };
      options.limit = 5;
    } else {
      {
      }
    }
    //empaqueto filtros
    let options = { limit: limitIn, page: pageIn, sort: sortIn, lean:true };
    try {
      const designs = await designModel.paginate(querySearch, options);
      return designs;
    } catch (error) {
      return error;
    }
  }

  //getById
  async getDesignById(designId) {
    try {
      const design = await designModel.findById(designId).lean();
      return design;
    } catch (error) {
      return error;
    }
  }

  //getByCode
  async getDesignByCode(designCode){
    try {
      const designToChk = await designModel.findOne({code:[designCode]},{})
      return designToChk;
    } catch (error) {
      return error
    }
  }

  //add
  async addDesign(dataDesLoad) {
    try {
      const designToPush = await designModel.create(dataDesLoad);
      logger.info("diseño agregado a db");
      return designToPush;
    } catch (error) {
      return error;
    }
  }

  //Update
  async updateDesign(desId,value,data){
    try {
      designToUpdate = await designModel.updateOne({_id:desId}, [{$set:{[value]: `${data}`}}]);
      return designToUpdate;
    } catch (error) {
      return error
    }
  }

  //delete
  async deleteDesign(designId) {
    try {
      const chkDesign = await this.chkDesign(designId);
      logger.warning(`diseño a eliminar${chkDesign}`);
      if (chkDesign) {
        const designToDelete = await designModel.findByIdAndDelete(designId);
        logger.warning("diseño borrado");
        return designToDelete;
      }else{
        return "design not found";
      }
    } catch (error) {
      return error;
    }
  }
  //code, title,description,category,price,status,favorites,shops,photos
}

export default DesignMongoDao;
