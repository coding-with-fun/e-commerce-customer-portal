import connectMongo from '@/libs/connectDB';
import Customer, { CustomerDataType } from '@/schemas/customer.schema';
import env from '@/utility/env';
import _ from 'lodash';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            authorize: async (credentials) => {
                const email = _.get(credentials, 'email');
                if (!email) {
                    throw new Error('Email not found.');
                }

                await connectMongo();
                const customer = (await Customer.findOne({
                    email,
                })) as CustomerDataType;
                if (!customer) {
                    throw new Error('Customer not found.');
                }
                const customerObject = customer.toObject();
                console.log({
                    ...customerObject,
                });

                return {
                    id: customerObject._id,
                    ...customerObject,
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
                    ...session.user,
                    _id: token._id,
                    url: token.url,
                    contactNumber: token.contactNumber,
                    customerID: token.customerID,
                    name: token.name,
                    email: token.email,
                },
            };
        },
    },
};

export default NextAuth(authOptions);
