// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 's782e3jljc'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-gcd0nv1b.us.auth0.com',            // Auth0 domain
  clientId: 'gkKZlN3cqlXAoTQl2c6yyf24KsZgqAKA',          // Auth0 client ids
  callbackUrl: 'http://localhost:3000/callback'
}
