const OpenAPI = require('openapi-typescript-codegen');

//http://localhost:5002/swagger/v1/swagger.json

OpenAPI.generate({
    input: './pages/schemas/api.json',
    output: './generated/api',
    httpClient: 'axios',
    clientName: 'ApiClient',
    request: './request.ts'
})