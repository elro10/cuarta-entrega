import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test de shopseeker rafa", () => {
  describe("test de designs", () => {
    it("el endpoint GET /api/designs entregue los diseños", async () => {
        const result = await requester.get("/api/designs");
      expect(result).to.be.ok;
    });
      it("logra enocontrar un diseño por el id", async () => {
        let design = "64568057a7d77c180696ec3f"
          const result = await requester.get(`/api/designs/${design}`)
          const item = result._body.payLoad
          console.log(item._id);
          expect(item._id).to.be.equal(design)
      })
  });
    
    describe("test de cart", () => {

        let authToken = "";
        let cart
        let userId
    it("el endpoint get de api/cart entregue todos los carritos", async () => {
      const result = await requester.get("/api/cart");
      expect(result).to.be.ok;
    });
        
    before(async () => {
        const userMock = {
          email: "rrhhmmtt@gmail.com",
          password: "123",
        };
        const resultLog = await requester.post("/api/user/login").send(userMock);
        const cookies = resultLog.headers["set-cookie"][0].split(";");
        authToken = cookies[0].split("=")[1];
        const result = await requester.get("/api/user/profile").set("Cookie", `authToken= ${authToken}`);
       
        cart = result.body.payLoad.cart[0]["_id"]
        userId = result.body.payLoad._id
    });
        
        it("al agregar un diseño al carrito y que si aparezca", async () => {
            let design = "64568057a7d77c180696ec3f"
          const mock = {
              quantity : 2
          }
            const result = await requester.put(`/api/cart/${cart}/design/${design}`)
            .set("Cookie", `authToken= ${authToken}`)
                .send(mock)
            const toFilter = result._body.payLoad.designs
            const filtered = toFilter.find(obj => obj.design._id === `${design}`)
                    
            expect(filtered.design._id).to.be.equal(`${design}`)
      })
    });
    
  describe("test de users", () => {
    let authToken = "";
    it("hacer login con cuenta autorizada", async () => {
      const userMock = {
        email: "rrhhmmtt@gmail.com",
        password: "123",
      };
      const result = await requester.post("/api/user/login").send(userMock);
      const cookies = result.headers["set-cookie"][0].split(";");
      authToken = cookies[0].split("=")[1];
      expect(result).to.be.ok;
    });

    before(async () => {
      const userMock = {
        email: "rrhhmmtt@gmail.com",
        password: "123",
      };
      const result = await requester.post("/api/user/login").send(userMock);
      const cookies = result.headers["set-cookie"][0].split(";");
      authToken = cookies[0].split("=")[1];
    });

    it("Confirmar la informacion del token del user first_name sea rafa", async () => {
      const result = await requester.get("/api/user/profile").set("Cookie", `authToken= ${authToken}`);
      expect(result.body.payLoad.first_name).to.be.equal("rafa");
    });
  });
});
