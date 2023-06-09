import { PageLoader } from '@/HOC/AppWrapper';
import env from '@/utility/env';
import { NextComponentType, NextPageContext } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const authenticatedPage = (
    Component: NextComponentType<NextPageContext, any, {}>
) => {
    const AuthenticatedComponent = (props: any) => {
        const { status } = useSession();
        const { push, pathname } = useRouter();

        if (status === 'loading') {
            return <PageLoader />;
        }

        if (status === 'unauthenticated') {
            const url = encodeURIComponent(env.baseURL + pathname);
            push(`/auth/signin?callbackUrl=${url}`);
            return;
        }

        return <Component {...props} />;
    };

    if (Component.getInitialProps) {
        AuthenticatedComponent.getInitialProps = Component.getInitialProps;
    }

    return AuthenticatedComponent;
};

export default authenticatedPage;
