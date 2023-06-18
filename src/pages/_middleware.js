import { NextResponse } from 'next/server';

export default function middleware(req) {
    const { cookies } = req;
    const url = req.url;
    const openRoutes = ['/login', '/register', '/forget-password'];

    // if (openRoutes.some(route => url.startsWith(route)) && cookies.token) {
    //     return NextResponse.redirect('/');
    // }

    // if (!openRoutes.some((route) => url.startsWith(route)) && !cookies.token) {
    //     return NextResponse.redirect('/login');
    // }
}