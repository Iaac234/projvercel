import {options} from "../auth/[...nextauth]/options";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import * as firebase from "@/app/required/firebase_init";

const {getServerSession} = require("next-auth");
const {NextResponse} = require("next/server");

async function validate(url) {
    let key = (new URL(url)).searchParams.get('key');
    const session = await getServerSession(options);
    if (key === "--ujbsnTgbA5tBmUY" || session?.user?.role === "admin") {
        return session;
    }
    return false;
}

export async function POST(request, {params}) {
    try {
        let session = await validate(request.url)
        if (!session) {
            return NextResponse.json({error: "Unauthorized"}, {
                status: 403,
            });
        }

        let data = await request.formData()

        let file = data.get("ig")

        if (file) {
            file = await uploadBytes(ref(firebase.storage, `${data.get("pid")}/${data.get("pid")}`), file);
            file = await getDownloadURL(file.ref)
            return NextResponse.json({file}, {
                status: 200,
            })
        }
        throw new Error("Unauthorized");
    } catch (error) {
        return NextResponse.json({error: error.message}, {
            status: 500,
        })
    }
}