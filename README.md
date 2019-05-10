# latam-api

### Configuración para tests

1. Obtener el token manualmente (Temporalmente)
```
$ curl -X POST \
  https://test.api.latam-pass.latam.com/oauth/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=client_credentials&client_id={CLIENT_ID}&client_secret={CLIENT_SECRET}&scope=member-show%20accrual-create%20transactions-show'
```
Para más detalles [ver aquí](http://developers.latam-pass.latam.com/#authentication)

2. Configurar `accessToken` en [`/test/tests.js:15`](https://github.com/unasol/latam-api/blob/3f9944b00a2c6e0d3d5972f25498f7a96130b401/test/tests.js#L15) con el `access_token` generado en el paso previo.

## Ejecutar las pruebas

```
$ npm test
```
