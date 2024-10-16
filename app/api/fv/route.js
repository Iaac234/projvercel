import * as firebase from "@/app/required/firebase_init";
import { getServerSession } from "next-auth";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { apiEndPoint } from "@/app/required/comm";
import { options } from "../auth/[...nextauth]/options";

async function validate(url) {
    let key = (new URL(url)).searchParams.get('key');
    const session = await getServerSession(options);
    if (key === "--ujbsnTgbA5tBmUY" || session?.user?.role === "admin") {
        return session;
    }
    return false;
}

export async function POST(request, { params }) {
    let session = await validate(request.url)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, {
            status: 403,
        });
    }

    let _data = await request.json()
    _data = _data?.l

    await setDoc(doc(firebase.firestore, 's', "_s"), { __list: _data }, { merge: true })

    await fetch(apiEndPoint + "/api/revalidate?key=--ujbsnTgbA5tBmUY&path=/")

    return NextResponse.json({}, {
        status: 200
    })
}

export async function GET(request, { params }) {
    let ref = await getDoc(doc(firebase.firestore, 's', "_s"))
    let data = ref.data()

    if (!data) {
        return NextResponse.json({}, {
            status: 404,
        });
    }

    return NextResponse.json({ data }, {
        status: 200
    })
}