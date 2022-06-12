require('dotenv').config()
const request = require("supertest");
const app = require("../app");

describe("Car controller", () => {
    it("should response with 200 as status code, if cars is available", async () => {

      return request(app)
        .get("/v1/cars")
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body).toEqual(res.body);
        });
    });

    it("should response with 200 as status code, if cars specific id is available", async () => {
        let id = 20

        return request(app)
          .get(`/v1/cars/${id}`)
          .then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(res.body);
          });
      });


      it("should response with 201 as status code, if car successfully created and you are admin", async () => {
        const name = "RX 8 FD Stage 3 Tuned";
        const price = 900000;
        const image="https://source.unsplash.com/519x519";
        const size="SMALL";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NTQ2ODY2ODh9.p0r7HO-tC9-49FOKuYNgl4Ys_nxV_pOuKLyYpjC004w"

        let data = {
            name : name,
            price : price,
            image : image,
            size : size
        }
    
        return request(app)
          .post("/v1/cars")
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${token}`)
          .send(data)
          .then((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual(res.body);
            
          });
        });


        it("should response with 201 as status code, if car successfully updated and you are admin", async () => {
        const name = "RX 7 FC Stage 3 Tuned";
        const price = 900000;
        const image="https://source.unsplash.com/519x519";
        const size="SMALL";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE2NTUwMTU0ODJ9.qwv7ZI8h8qHE45Vjs3WAvP6LcrVE_dPKDBo0kOxA"
        let idMobil = 97
    
        let data = {
            name : name,
            price : price,
            image : image,
            size : size
        }
        
        return request(app)
            .put(`/v1/cars/${idMobil}`)
            .set("Content-Type", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(data)
            .then((res) => {
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual(res.body);
            
            });
        });

        it("should response with 201 as status code, if car successfully rented and you are consumer", async () => {
            
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImphbnNlbiIsImVtYWlsIjoiamFuc2VuQG1haWwuY29tIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE2NTQ2OTAzMjF9.WHUngH_ZDJRPpnfb45VKXzf73tzgG-DpTISUz741g5s"
            
            return request(app)
              .post("/v1/cars/97/rent")
              .set("Content-Type", "application/json")
              .set("Authorization", `Bearer ${token}`)
              .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toEqual(res.body);
                
              });
            });

        it("should response with 422 as status code, if car has is rented", async () => {
        
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImphbnNlbiIsImVtYWlsIjoiamFuc2VuQG1haWwuY29tIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE2NTQ2OTAzMjF9.WHUngH_ZDJRPpnfb45VKXzf73tzgG-DpTISUz741g5s"
            
            return request(app)
                .post("/v1/cars/97/rent")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .then((res) => {
                expect(res.statusCode).toBe(422);
                expect(res.body).toEqual(res.body);
                
                });
            });    

        it("should response with 204 as status code, if car successfully deleted", async () => {
            let idMobil = 107
            let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG5ueSIsImVtYWlsIjoiam9obm55QGJpbmFyLmNvLmlkIiwiaW1hZ2UiOm51bGwsInJvbGUiOnsiaWQiOjEsIm5hbWUiOiJDVVNUT01FUiJ9LCJpYXQiOjE2NTUwMTU0ODJ9.qwv7ZI8h8qHE45Vjs3WAvP6LcrVE_dPKDBo0kOxA"
            
            return request(app)
                .delete(`/v1/cars/${idMobil}`)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .then((res) => {
                expect(res.statusCode).toBe(204);
                expect(res.body).toEqual(res.body);
                });
            });  


});
