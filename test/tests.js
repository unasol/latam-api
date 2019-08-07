import chai from "chai";
import ClientOAuth2 from "client-oauth2";
import data from "./data";
import {
  MemberInfoSchema,
  MemberSchema,
  AccrualCreateSchema,
  TransactionSchema
} from "../src/latam/schemas";

import Latam from "../src/latam";
chai.use(require("chai-json-schema"));
const expect = chai.expect;
const assert = chai.assert;
const latam = new Latam({
  // environment: "production", // default dev
  client_credentials: {
    //support only client_credentials
    clientId: "abc",
    clientSecret: "123",
    accessTokenUri: "https://test.api.latam-pass.latam.com/oauth/token",
    scopes: [
      "accrual-create",
      "member-create",
      "member-show",
      "Transactions-show"
    ]
  }
});

describe("LATAM API TEST", async () => {
  // Configuracion para la prueba
  let doctType = "DNIPE";
  let docValue = "46880227";
  let accrualMiles = 1000;

  let year = 2019;
  let programId = "latam-pass";
  let memberId = ""; // it get by apy member
  let beforeMiles = 0;
  let transactionNumber = 0;
  let afterMiles = 0;

  describe("oAuth2", async () => {
    it("Debe authenticar mediante oauth2", async () => {
      try {
        const user = await latam.getToken();
        expect(user).to.an.instanceOf(ClientOAuth2.Token);
        expect(user).to.have.property("accessToken");
        expect(user.tokenType).to.equal("bearer");
      } catch (error) {
        throw error;
      }
    });
  });
  describe("/GET programs", async () => {
    it("Debe obtener los programas y validar existencia del programa latam-pass", async () => {
      try {
        const program = await latam.program();
        const response = await program.getPrograms();
        assert.equal(response.map(e => e.id).indexOf(programId), 0);
      } catch (err) {
        throw err.data;
      }
    });
  });
  describe("/POST member", async () => {
    step(
      `Debe crear un socio {type: ${doctType}, number: ${docValue}}`,
      async () => {
        try {
          const member = await latam.member();
          const response = await member.create(programId, data.newPerson);
          console.log("SUCCESS", response);
        } catch (err) {
          throw err.data;
        }
      }
    );
  });

  describe("/GET member", async () => {
    step(
      `Debe obtener memberId del socio {type: ${doctType}, number: ${docValue}}`,
      async () => {
        try {
          const member = await latam.member();
          const response = await member.getMember(
            programId,
            doctType,
            docValue
          );
          expect(response).to.be.an("array");
          expect(response).to.have.lengthOf(1);
          expect(response[0]).to.be.jsonSchema(MemberSchema);
          const identifications =
            response[0]["Person"]["Identifications"]["Identification"];
          expect(identifications.map(e => e.typeCode).indexOf("FFN"), 0);
          const index = identifications.map(e => e.typeCode).indexOf("FFN");
          memberId = identifications[index].value;
        } catch (err) {
          throw err.data;
        }
      }
    );

    step(`Debe obtener las millas actuales del socio ${memberId}`, async () => {
      try {
        const member = await latam.member();
        const response = await member.getMemberInfo(programId, memberId);
        expect(response).to.be.jsonSchema(MemberInfoSchema);
        beforeMiles = response.balance;
      } catch (err) {
        throw err.data;
      }
    });
  });

  describe("/POST accrual", async () => {
    step(
      `Debe acumular ${accrualMiles} para el socio ${memberId}`,
      async () => {
        try {
          const accrual = await latam.accrual();
          const response = await accrual.create(programId, memberId, {
            miles: accrualMiles,
            product: {
              name: "Consumo",
              code: "UNAPR"
            }
          });
          expect(response).to.be.jsonSchema(AccrualCreateSchema);
          transactionNumber = response.number;
        } catch (err) {
          throw err.data;
        }
      }
    );

    step(
      "Debe obtener las transacciones y validar si existe el acumulado",
      async () => {
        try {
          const transaction = await latam.transaction();
          const response = await transaction.show(programId, memberId, year);
          expect(response).to.be.an("array");
          expect(response).to.have.lengthOf(1);
          expect(response[0]).to.be.jsonSchema(TransactionSchema);
          const transactions = response.map(e => e.Identificaction);
          expect(
            transactions.map(e => e.number).indexOf(transactionNumber)
          ).lengthOf(0);
          const index = transactions
            .map(e => e.number)
            .indexOf(transactionNumber);
          assert((accrualMiles = transactions[index].number));
        } catch (err) {
          throw err.data;
        }
      }
    );

    step(
      `Debe obteger la cantidad actual de millas para ${memberId}`,
      async () => {
        try {
          const member = await latam.member();
          const response = await member.getMemberInfo(programId, memberId);
          expect(response).to.be.jsonSchema(MemberInfoSchema);
          afterMiles = response.balance;
        } catch (err) {
          throw err.data;
        }
      }
    );
    step(
      `Debe validar las millas acumuladas para después de acumular ${accrualMiles}`,
      () => {
        assert.equal(afterMiles, beforeMiles + accrualMiles);
      }
    );
  });
});
