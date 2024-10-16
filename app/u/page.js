"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { IoAddOutline } from "react-icons/io5";
import { useEffect } from 'react';

export default function page() {
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        router.push("/")
    }, [])

    // useEffect(() => {
    //     if (!data?.user?.id && !data?.user?.email && data?.user) {
    //         router.push('/login')
    //     }
    // }, [data?.user?.id])


    return <div className="mx-auto min-h-[100vh] p-6">
        <div className="flex justify-between mx-auto max-w-[1000px] mb-4 border-b pb-2">
            <h1 className="text-2xl font-bold text-sec">Created Contents</h1>
            <div className="actions">
                <Link href="/u/cre?new=true&by=admin"
                    className="flex gap-2 cursor-pointer p-[9px] items-center border rounded-lg">
                    <IoAddOutline size={25} />
                    <div className="w-[1px] h-[20px] bg-pri"></div>
                    <p className="text-lg">Upload</p>
                </Link>
            </div>
        </div>
        <div className="rounded-lg overflow-hidden flex gap-2 flex-col justify-center">
            {[
                {
                    motion: "This house believes in freedom of speech",
                    "info slide": "Discuss how freedom of speech impacts democracy.",
                    "speaker score": 82,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "John Doe",
                    tournamnet: "Global Debating Championship",
                    round: "Semi-Final",
                    "motion type": "Policy"
                },
                {
                    motion: "This house supports a universal basic income",
                    "info slide": "Universal basic income ensures a financial safety net for all.",
                    "speaker score": 78,
                    "team position": "2nd Opp",
                    "speaker role": "Deputy Leader of Opposition",
                    debater: "Jane Smith",
                    tournamnet: "National Debating League",
                    round: "Quarter-Final",
                    "motion type": "Economic"
                },
                {
                    motion: "This house believes that AI will benefit society more than harm",
                    "info slide": "AI has various implications for industries, jobs, and privacy.",
                    "speaker score": 85,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "Alice Johnson",
                    tournamnet: "Tech Debate 2024",
                    round: "Final",
                    "motion type": "Technology"
                },
                {
                    motion: "This house believes in freedom of speech",
                    "info slide": "Discuss how freedom of speech impacts democracy.",
                    "speaker score": 82,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "John Doe",
                    tournamnet: "Global Debating Championship",
                    round: "Semi-Final",
                    "motion type": "Policy"
                },
                {
                    motion: "This house supports a universal basic income",
                    "info slide": "Universal basic income ensures a financial safety net for all.",
                    "speaker score": 78,
                    "team position": "2nd Opp",
                    "speaker role": "Deputy Leader of Opposition",
                    debater: "Jane Smith",
                    tournamnet: "National Debating League",
                    round: "Quarter-Final",
                    "motion type": "Economic"
                },
                {
                    motion: "This house believes that AI will benefit society more than harm",
                    "info slide": "AI has various implications for industries, jobs, and privacy.",
                    "speaker score": 85,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "Alice Johnson",
                    tournamnet: "Tech Debate 2024",
                    round: "Final",
                    "motion type": "Technology"
                },
                {
                    motion: "This house would ban all single-use plastics",
                    "info slide": "The environmental impact of single-use plastics is severe.",
                    "speaker score": 80,
                    "team position": "2nd Prop",
                    "speaker role": "Deputy Prime Minister",
                    debater: "Mark Williams",
                    tournamnet: "Eco Debates World Cup",
                    round: "Preliminary Round",
                    "motion type": "Environment"
                },
                {
                    motion: "This house believes that social media does more harm than good",
                    "info slide": "Social media's effects on mental health and misinformation.",
                    "speaker score": 83,
                    "team position": "1st Opp",
                    "speaker role": "Leader of Opposition",
                    debater: "Emma Davis",
                    tournamnet: "Youth Debate Summit",
                    round: "Grand Final",
                    "motion type": "Social"
                },
                {
                    motion: "This house would abolish the death penalty",
                    "info slide": "The ethical and moral arguments surrounding the death penalty.",
                    "speaker score": 77,
                    "team position": "2nd Prop",
                    "speaker role": "Deputy Prime Minister",
                    debater: "Oliver Brown",
                    tournamnet: "Global Justice Debate",
                    round: "Octo-Final",
                    "motion type": "Legal"
                },
                {
                    motion: "This house supports open borders",
                    "info slide": "The economic and social implications of open border policies.",
                    "speaker score": 81,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "Sophia Miller",
                    tournamnet: "International Debate League",
                    round: "Round of 16",
                    "motion type": "International"
                },
                {
                    motion: "This house believes that healthcare should be a universal right",
                    "info slide": "The debate over public vs private healthcare systems.",
                    "speaker score": 84,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "Liam Garcia",
                    tournamnet: "Health and Policy Debate",
                    round: "Final",
                    "motion type": "Healthcare"
                },
                {
                    motion: "This house would legalize recreational drugs",
                    "info slide": "Consider the impacts on public health and crime rates.",
                    "speaker score": 79,
                    "team position": "2nd Opp",
                    "speaker role": "Deputy Leader of Opposition",
                    debater: "Ava Rodriguez",
                    tournamnet: "Liberty Debates 2024",
                    round: "Semi-Final",
                    "motion type": "Legal"
                },
                {
                    motion: "This house believes in reforming the United Nations",
                    "info slide": "The role of the UN in modern global governance.",
                    "speaker score": 86,
                    "team position": "1st Prop",
                    "speaker role": "Prime Minister",
                    debater: "Isabella Hernandez",
                    tournamnet: "Global Governance Debate",
                    round: "Grand Final",
                    "motion type": "Political"
                }
            ].map((item) => {
                return <>
                    <div
                        className="w-full max-w-[1000px] justify-between flex p-2 mx-auto rounded-lg border-[#00000027] border">
                        <div className="flex items-center gap-5">
                            <div className="border border-[#00000027] rounded-md p-2">
                                <h2 className="text-5xl text-sec">{item?.motion?.charAt(0)?.toUpperCase()}</h2>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Link href={"/p/" + item?.id}>
                                    <h2 className="text-xl">{item?.motion?.substring(0, 70)}</h2>
                                </Link>
                                <p className="text-sm">{item?.['info slide']?.substring(0, 100)}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link href={`/u/${item?.id}?edit=true`} className="cursor-pointer">
                                <CiEdit size={25} />
                            </Link>
                            <div className="cursor-pointer">
                                <CiTrash size={25} />
                            </div>
                        </div>
                    </div>
                </>
            })}
        </div>
    </div>
}