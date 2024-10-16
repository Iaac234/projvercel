import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as firebase from "@/app/required/firebase_init";
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { options } from "../../auth/[...nextauth]/options";
import { apiEndPoint } from "@/app/required/comm";

async function validate(url) {
    let key = (new URL(url)).searchParams.get('key');
    const session = await getServerSession(options);
    if (key === "--ujbsnTgbA5tBmUY" || session?.user?.role === "admin") {
        return session;
    }
    return false;
}

export async function GET(request, { params }) {
    const { pid } = params

    try {
        let ref, data;

        if (pid === "_") {
            ref = await getDocs(collection(firebase.firestore, 'p'));
            data = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } else {
            ref = await getDoc(doc(firebase.firestore, 'p', pid));
            data = ref.data();
        }

        if (!data) {
            return NextResponse.json({}, {
                status: 404,
            });
        }

        return NextResponse.json({ data }, {
            status: 200,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, {
            status: 500,
        });
    }
}

export async function POST(request, { params }) {
    let session = await validate(request.url)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, {
            status: 403,
        });
    }

    try {
        const { pid } = params
        let _data = await request.json()

        _data = {
            cont: {
                ...(_data?.mk || {}),
                tt: _data?.tt || '',
                ct: _data?.ct || "",
                tb: _data?.tb || null,
            },
            exp: {
                dt: new Date().toDateString(),
                us: session?.user?.id,
                ur: pid
            }
        }

        await setDoc(doc(firebase.firestore, 'p', pid), _data, { merge: true })

        await fetch(apiEndPoint + "/api/revalidate?key=--ujbsnTgbA5tBmUY&path=/p/" + pid)
        await fetch(apiEndPoint + "/api/revalidate?key=--ujbsnTgbA5tBmUY&path=/p")

        return NextResponse.json({}, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });

    }
}



export async function DELETE(request, { params }) {
    let session = await validate(request.url)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, {
            status: 403,
        });
    }

    const { pid } = params
    try {
        await deleteDoc(doc(firebase.firestore, 'p', pid))

        await fetch(apiEndPoint + "/api/revalidate?key=--ujbsnTgbA5tBmUY&path=/p/" + pid)
        await fetch(apiEndPoint + "/api/revalidate?key=--ujbsnTgbA5tBmUY&path=/p")

        return NextResponse.json({}, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });

    }
}