export const MemberSchema = {
  title: "Members schema",
  type: "object",
  required: ["Person"],
  properties: {
    Person: {
      type: "object",
      required: ["Identifications"],
      properties: {
        Identifications: {
          type: "object",
          required: ["Identification"],
          properties: {
            Identification: {
              type: "array",
              required: ["typeCode", "value"],
              properties: {
                typeCode: "string",
                value: "String"
              }
            }
          }
        },
        Name: {
          type: "object",
          properties: {
            firstName: "string",
            middleName: "string",
            lastName: "string",
            secondLastName: "string",
            prefix: "string"
          }
        }
      }
    },
    Tier: {
      type: "object",
      properties: {
        tierCode: "string"
      }
    }
  }
};

export const MemberInfoSchema = {
  title: "Member info schema",
  type: "object",
  required: ["balance"],
  properties: {
    balance: {
      type: "number"
    }
  }
};

export const MemberCreateSchema = {
  
}

export const AccrualCreateSchema = {
  title: "Accrual create",
  type: "object",
  required: ["statusCode", "number"],
  properties: {
    statusCode: "string",
    number: "string"
  }
};

export const TransactionSchema = {
  title: "Transaction schema",
  type: "object",
  required: ["Identificaction"],
  properties: {
    Identificaction: {
      type: "object",
      required: ["id", "number"],
      properties: {
        id: "string",
        number: "string"
      }
    },
    amount: {
      type: "object",
      required: ["$value"],
      properties: {
        $value: "number"
      }
    }
  }
};
