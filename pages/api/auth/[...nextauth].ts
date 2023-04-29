import env from '@/utility/env';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            authorize: async (credentials) => {
                await new Promise((r) => setTimeout(r, 3000));

                return {
                    email: 'dev@harrsh.com',
                    name: 'Harrsh Patel',
                    id: '11',
                };
            },
        }),
    ],
    secret: env.auth.secret,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
        signOut: '/',
        error: '/',
    },
    debug: true,
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === 'update' && session) {
                return {
                    ...token,
                    ...session.user,
                };
            }

            return {
                ...token,
                ...user,
            };
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
