import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
var jwt = require('jsonwebtoken');

const baseURL = process.env.OZP_API;
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_SIGNIN_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_SIGNIN_CLIENT_SECRET,
    // }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        
        try {
          const res = await fetch(baseURL + "/auth/loginCredentials", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userID: credentials.username,
              password: credentials.password,
            }),
          });
      
          const creds = await res.json();
          
        
          
          if (creds && res.ok) {
            
            //Wrap the jwt.verify function call in a Promise and use resolve instead of returning the value directly
            return new Promise((resolve, reject) => {
              jwt.verify(creds.accessToken, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                  console.log('Error in JWT verification:', err);
                  return null
                }
      
                if (decoded) {
                  
            
                  var userData = {
                    id: decoded.userID,
                    email: decoded.contacts.email,
                    phone: decoded.contacts.phone,
                    role: decoded.accountType,
                    accessToken: creds.accessToken,
                    refreshToken: creds.refreshToken,
                    linkedEntities: decoded.linkedEntities,
                    tokenType: decoded.tokenType,
                    externalAccessTokenExpire: decoded.exp
                  };
                  if (decoded.name){
                    Object.assign(userData, {name: decoded.name})
                  } else {
                    Object.assign(userData, {name: decoded.userID})
                  }
                
                 
                  //authorize function will properly return the userData object
                  resolve(userData);
                }
              });
            });
          } else {
            return null
          }
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.type == 'oauth'){
        const oAuthRes = await fetch(baseURL+ "/auth/loginOAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, account, profile, email, credentials }),
        })
        const res = await oAuthRes.json()

      } else if (account?.type == 'credentials') {
        return true
      }
      

     
      return true
    },
    async jwt({ token, user, profile }) {
      if (user){
        token.id = user.id
        token.role = user.role
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.linkedEntities = user.linkedEntities
        token.tokenType = user.tokenType
        token.externalAccessTokenExpire = user.externalAccessTokenExpire
      }
      
      if (Date.now() >= token.externalAccessTokenExpire * 1000){
        try {
      
          const response = await fetch(baseURL + "/auth/getNewToken", {
            headers: {
              "Content-Type": "application/json",
              'refresh-token': token.refreshToken
            },
            method: "POST",
          })

          const tokens = await response.json()

          if (!response.ok) throw tokens

          const decodeJWTRefresh = new Promise((resolve, reject) => {
            jwt.verify(tokens.accessToken, process.env.JWT_SECRET, function (err, decoded) {
              if (err) {
                console.log('Error in JWT verification:', err);
                resolve({ id: err, name: "ERROR", email: "ERROR" });
              }
    
              if (decoded) {
                
                var userData = {
                  id: decoded.userID,
                  name: decoded.userID,
                  email: decoded.contacts.email,
                  phone: decoded.contacts.phone,
                  role: decoded.accountType,
                  accessToken: tokens.accessToken,
                  refreshToken: tokens.refreshToken,
                  linkedEntities: decoded.linkedEntities,
                  tokenType: decoded.tokenType,
                  externalAccessTokenExpire: decoded.exp
                };

                if (decoded.name){
                  Object.assign(userData, {name: decoded.name})
                } else {
                  Object.assign(userData, {name: decoded.userID})
                }
              
                //authorize function will properly return the userData object
                resolve(userData);
              }
            });
          });
          decodeJWTRefresh.then((newData) => {
            if (newData){
              token.id = newData.userID
              token.role = newData.role
              token.accessToken = newData.accessToken
              token.refreshToken = newData.refreshToken
              token.linkedEntities = newData.linkedEntities
              token.tokenType = newData.tokenType
              token.externalAccessTokenExpire = newData.externalAccessTokenExpire
            }
          })


          
        } catch (e) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
      
      
    
    
      return token;
    },
    session: ({ session, token, user }) => {
      if (token) {
        session.user.id = token.id;
        session.role = token.role;
        session.linkedEntities = token.linkedEntities;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  }
};
export default NextAuth(authOptions);