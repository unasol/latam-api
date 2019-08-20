# latam-api

# Getting started

### Installation

Install the client library using npm:

```sh
npm i latam-api
```

### Options

```json
{
  "environment": "development",
  "client_credentials": {
    "clientId": "abc",
    "clientSecret": "123",
    "accessTokenUri": "https://test.api.latam-pass.latam.com/oauth/token",
    "scopes": ["member-create", "member-show"]
  }
}
```

### example usage

```js
import Latam from "latam-api";

const latam = new Latam(credentials);

try {
  const member = await latam.member();
  const response = await member.getMember("PROGRAM-ID", "DNIPE", "46880221");
  if (!Array.isArray(response) || response.length === 0) return false;
  console.log("Member", response);
} catch (err) {
  console.log("Error", err);
}
```
