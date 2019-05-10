import chai from "chai";
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
  // Configurar con el token generado en https://test.api.latam-pass.latam.com/oauth/token
  accessToken: "fb4a6a13607e6b3357a9d3f48ea4336ffc52c45c"
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

  describe("/GET programs", async () => {
    it("Debe obtener los programas y validar existencia del programa latam-pass", async () => {
      try {
        const response = await latam.program.getPrograms();
        assert.equal(response.map(e => e.id).indexOf(programId), 0);
      } catch (err) {
        (() => {
          throw err;
        }).should.throw();
      }
    });
  });
  describe("/GET member", async () => {
    step(
      `Debe obtener memberId del socio {type: ${doctType}, number: ${docValue}}`,
      async () => {
        try {
          const response = await latam.member.getMember(
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
          (() => {
            throw err;
          }).should.throw();
        }
      }
    );

    step(`Debe obtener las millas actuales del socio ${memberId}`, async () => {
      try {
        const response = await latam.member.getMemberInfo(programId, memberId);
        expect(response).to.be.jsonSchema(MemberInfoSchema);
        beforeMiles = response.balance;
      } catch (err) {
        (() => {
          throw err;
        }).should.throw();
      }
    });
  });

  describe("/POST accrual", async () => {
    step(
      `Debe acumular ${accrualMiles} para el socio ${memberId}`,
      async () => {
        try {
          const response = await latam.accrual.create(programId, memberId, {
            miles: accrualMiles,
            product: {
              name: "Consumo",
              code: "UNAPR"
            }
          });
          expect(response).to.be.jsonSchema(AccrualCreateSchema);
          transactionNumber = response.number;
        } catch (err) {
          (() => {
            throw err;
          }).should.throw();
        }
      }
    );

    step(
      "Debe obtener las transacciones y validar si existe el acumulado",
      async () => {
        try {
          const response = await latam.transaction.show(
            programId,
            memberId,
            year
          );
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
          (() => {
            throw err;
          }).should.throw();
        }
      }
    );

    step(
      `Debe obteger la cantidad actual de millas para ${memberId}`,
      async () => {
        try {
          const response = await latam.member.getMemberInfo(
            programId,
            memberId
          );
          expect(response).to.be.jsonSchema(MemberInfoSchema);
          afterMiles = response.balance;
        } catch (err) {
          (() => {
            throw err;
          }).should.throw();
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
