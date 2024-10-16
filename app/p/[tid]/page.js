import notFound from '@/app/not-found';
import Link from 'next/link';
import React from 'react';
import { CiFacebook, CiLinkedin, CiMail, CiTwitter, CiYoutube } from 'react-icons/ci'
import TableContent from './TableContent';
import { apiEndPoint } from '@/app/required/comm';
import { IoCall } from 'react-icons/io5';
import { SiGmail, SiWhatsapp } from 'react-icons/si';

let cached = null

async function getData(uid) {
    if (process.env.NEXT_IS_WAITING === "true") {
        return {}
    }
    if (!cached || uid !== cached?.exp?.ur) {
        let Data = await fetch(`${apiEndPoint}/api/p/${uid}`)
        if (!Data.ok) {
            return false
        }
        cached = await Data.json()
        cached = cached?.data || cached
    }
    return cached
}

export async function generateMetadata({ params }) {
    let data = await getData(params.tid)
    if (!data?.cont) {
        return {
            title: 'Nothing found',
            description: "We're sorry, We couldn't find the content you looking for",
            other: {
                'robots': 'noindex',
            },
            openGraph: {
                title: 'Nothing found',
                description: "We're sorry, We couldn't find the content you looking for",
                images: ['/images/404_POST.png']
            }
        }
    }

    return {
        title: data?.cont?.tt,
        openGraph: {
            images: [data?.cont?.tb || "/images/app_icon.png"],
            title: data?.cont?.tt,
            url: 'https://hapynotes.rohan-koirala.com.np/post/' + data?.exp?.ur
        },
        alternates: {
            canonical: 'https://hapynotes.rohan-koirala.com.np/post/' + data?.exp?.ur
        },

    }
}

export default async function Page({ params }) {
    let data = await getData(params.tid)

    if (!data?.exp) {
        return notFound()
    }

    let __img = data?.cont?.tb || "https://via.placeholder.com/500"
    let __this_url = apiEndPoint + "/p/" + params.tid
    let __title = data?.cont?.tt

    return <>
        <div className="max-w-4xl mx-auto p-6">
            <div className="w-full h-[400px] bg-gray-200 bg-cover bg-center relative flex items-center justify-center mb-8" style={{
                backgroundImage: `url("${__img}")`
            }}>
                <div className="absolute bottom-1 left-1">
                    <h1 className="text-4xl text-white font-bold">{__title}</h1>
                    <p className='text-white text-[12px]'>Last Update - {data?.exp?.dt}</p>
                </div>
            </div>

            <TableContent tid={params.tid} />

            <div className="__cont" dangerouslySetInnerHTML={{ __html: data?.cont?.ct }}></div>

            <div className="social flex gap-3 my-5 py-3 items-center">
                <a target='_blank' className='p-1 border border-[var(--secondary)]' href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(__this_url)}`}><CiFacebook size={30} /></a>
                <a target='_blank' className='p-1 border border-[var(--secondary)]' href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(__title)}&url=${encodeURIComponent(__this_url)}&via=Debite`}><CiTwitter size={30} /></a>
                <a target='_blank' className='p-1 border border-[var(--secondary)]' href={`https://api.whatsapp.com/send?text=${encodeURIComponent(__title)}%20%0A%0A%20${encodeURIComponent(__this_url)}`}><SiWhatsapp size={30} /></a>
                <a target='_blank' className='p-1 border border-[var(--secondary)]' href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(__this_url)}&title=${encodeURIComponent(__title)}`}><CiLinkedin size={30} /></a>
                <a target='_blank' className='p-1 border border-[var(--secondary)]' href={`mailto:?subject=${encodeURIComponent(__title)}&body=${encodeURIComponent(__title)}%20%0A%0A%20${encodeURIComponent(__this_url)}`}><CiMail size={30} />
                </a>
            </div>
        </div>
    </>
}



export async function generateStaticParams() {
    if (process.env.NEXT_IS_WAITING === "true") {
        return [1]
    }
    let Data = await fetch(apiEndPoint + "/api/p/_")
    if (!Data.ok) {
        return []
    }
    Data = await Data.json()

    Data = Object.entries(Data)

    return Data.map((i) => ({
        post: i[0]
    }))
}