import CredentialsProvider from 'next-auth/providers/credentials';

export const options = {
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                let user = {
                    id: "yhNgr54678Hbsjyi39sH",
                    password: "12345678",
                    username: 'admin',
                    email: 'admin@rajesh.com'
                };
                if (credentials?.username === user?.username && credentials?.password === user?.password) {
                    user = {...user, role: "admin"}
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.name = user.username;
                token.role = user.role;
            }
            return token;
        },

        async session({session, token}) {
            if (token?.id) {
                session.user = session.user || {};
                session.user.id = token.id;
                session.user.role = token?.role || null;
            }
            return session;
        }

    },
    cookies: {
        sessionToken: {
            name: `next_auth.session_token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
                path: "/"
            }
        }
    },
    session: {
        jwt: true,
        maxAge: 2 * 60 * 60,
    },
}