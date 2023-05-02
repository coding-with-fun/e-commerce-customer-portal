import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            _id: string;
            url: string;
            contactNumber: string;
            customerID: string;
            name: string;
            email: string;
        };
    }
}
