import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            authorize: async (credentials) => {
                return {
                    email: 'dev@harrsh.com',
                    name: 'Harrsh Patel',
                    id: '11',
                };
            },
        }),
    ],
    secret: 'abcd',
    session: {
        strategy: 'jwt',
    },
    debug: true,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    // ...token,
                    email: token.email,
                    id: token.id,
                    name: token.name,
                },
            };
        },
    },
};

export default NextAuth(authOptions);
