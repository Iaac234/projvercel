"use client"

import React, {useEffect, useRef, useState} from 'react';
import "./style.css"
import {
    BiAlignJustify,
    BiAlignLeft,
    BiAlignMiddle,
    BiAlignRight,
    BiBold,
    BiItalic,
    BiLink,
    BiListOl,
    BiListUl,
    BiRedo,
    BiStrikethrough,
    BiUnderline,
    BiUndo,
    BiUnlink,
    BiUpload
} from 'react-icons/bi';
import {SiGoogledocs} from "react-icons/si";
import {useRouter} from 'next/navigation';
import {CiText} from 'react-icons/ci';
import {CgAdd} from "react-icons/cg";
import {apiEndPoint} from "@/app/required/comm";

export default function Page({params}) {
    const editorRef = useRef(null);
    const image = useRef(false);
    const [showHTML, setShowHTML] = useState(false);
    const [arg, setArg] = useState({})
    const redirect = useRouter()
    const [preUpload, setpreUpload] = useState(false)
    const [choose, setChoose] = useState({
        "motion": null,
        "infoSlide": null,
        "speaker_score": null,
        "side": null,
        "speaker_role": null,
        "debater": null,
        "tournament": null,
        "round": null,
        "genre": null,
    })
    const [img, setImg] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            image.current = file
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    const formatDoc = (cmd, value = null) => {
        if (value) {
            document.execCommand(cmd, false, value);
        } else {
            document.execCommand(cmd);
        }
    };

    const toggleHTMLView = () => {
        setShowHTML(!showHTML);
        if (!showHTML) {
            editorRef.current.textContent = editorRef.current.innerHTML;
        } else {
            editorRef.current.innerHTML = editorRef.current.textContent;
        }
    };

    const addLink = () => {
        const url = prompt("Enter the URL");
        if (url) {
            formatDoc('createLink', url);
        }
    };

    async function handelUpload(event) {
        setArg({...arg, sending: true})
        let entireData = editorRef.current.innerHTML

        entireData = new DOMParser().parseFromString(entireData, 'text/html');

        let _h1 = entireData.querySelectorAll("h1")

        if (_h1.length > 1) {
            alert("Page can have only one major heading, found more than One.")
            setArg({...arg, sending: false})
            return
        }

        _h1 = _h1.item(0)?.innerText
        entireData.querySelector("h1")?.remove()

        if (!_h1) {
            alert("Please add a heading to the page.")
            setArg({...arg, sending: false})
            return
        }

        entireData = entireData.body.innerHTML

        if (!entireData) return
        entireData = entireData.replaceAll("div>", "p>")

        let _url = params?.pid;
        if (_url === "cre") {
            _url = (new Date()).getTime()
            _url = `_kr${_url.toString(21)}${_url.toString(24)}`
            _url = _url.substring(0, 15)
        }
        try {
            let __tb = image.current
            if (image.current && (img && !img?.includes("firebasestorage.googleapis.com"))) {
                console.log("Uploading file")
                let form = new FormData()
                form.append("ig", image.current)
                form.append("pid", _url)

                __tb = await fetch(apiEndPoint + "/api/i?key=--ujbsnTgbA5tBmUY", {
                    method: "POST",
                    body: form
                })

                __tb = await __tb.json()
                __tb = __tb?.file || null
            }

            let post = await fetch(`/api/p/${_url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "ct": entireData,
                    "tt": _h1,
                    "mk": choose,
                    "tb": __tb
                })
            })

            if (post.ok) {
                alert("Upload Success...")
                localStorage.removeItem("__back")
                redirect.push("/p/" + _url)
            } else {
                alert("Upload Failed...")
            }
        } catch (error) {
            alert(error)
        } finally {
            setArg({...arg, sending: false})
        }
    }

    useEffect(() => {
        let _data = localStorage.getItem("__back")

        if (params?.pid === "cre") {
            if (_data) {
                editorRef.current.innerHTML = _data
            } else {
                editorRef.current.innerHTML = "<p>Start writing after removing this text.</p>"
            }
        } else {
            fetch("/api/p/" + params?.pid).then(async (_) => {
                if (_.status === 404) {
                    editorRef.current.innerHTML = "<p>Start writing after removing this text.</p>"
                    redirect.push("/u/cre?force=true&admin=true")
                    return
                }
                let data = await _.json()
                image.current = data?.data?.cont?.tb
                setImg(image.current)
                editorRef.current.innerHTML = `<h1>${data?.data?.cont?.tt}</h1>${data?.data?.cont?.ct}`
            })
        }

        let _p = setInterval(() => {
            if (_data !== editorRef.current.innerHtml) {
                localStorage.setItem("__back", editorRef.current.innerHTML)
            }
        }, 2500)

        return () => {
            clearInterval(_p)
        }
    }, [])

    return (
        <>
            {preUpload &&
                <div
                    className={`fixed z-10 h-full w-full top-0 right-0 backdrop-blur-sm ${arg?.sending ? "blur-sm" : ""}`}
                    onClick={(e) => {
                        if (!document.querySelector(".__viewer").contains(e.target)) {
                            setpreUpload(false)
                        }
                    }}>
                    <div
                        className="__viewer max-h-[90vh] overflow-auto mx-auto w-[90%] border border-black max-w-[1000px] shadow-lg rounded-md bg-white p-2 my-10">
                        <div className="flex border-b mb-1 items-center pb-2 justify-between">
                            <h2 className='text-3xl'>Verify Before Upload</h2>
                            <button className='p-2 text-lg bg-sec text-white rounded-lg border text-center'
                                    onClick={(e) => !arg?.sending && handelUpload(e)}>
                                {arg?.sending ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                        <h2 className='text-2xl'>Thumbnail</h2>
                        <div className="flex justify-center items-center w-full h-52 rounded-lg">
                            <div
                                className={"w-[200px] cursor-pointer flex justify-center items-center rounded h-[200px] border"}
                                onClick={() => {
                                    document.querySelector(".__fileInpS")?.click()
                                }}>
                                <input type="file" accept="image/*" onChange={handleFileChange}
                                       className={"__fileInpS hidden"}/>
                                {img && <div className="overflow-hidden">
                                    <img src={img} alt="Uploaded Preview" className="w-full h-full object-cover"/>
                                </div>}
                                {!img && <CgAdd size={30}/>}
                            </div>
                        </div>
                        <h3 className='text-2xl'>Meta Data</h3>
                        {Object.keys(choose || {}).map((item) => {
                            let _id = item
                            item = choose?.[item]

                            return <div className='flex gap-2 items-center'>
                                <p className='text-sec capitalize'>{_id}</p>
                                <p className='bg-slate-500 h-1 w-1 rounded-full'></p>
                                <p>{item || "None"}</p>
                            </div>
                        })}
                        <div className="gap-2 mt-3">
                            <h3 className='text-2xl'>Content</h3>
                            <div className='h-full border p-1'
                                 dangerouslySetInnerHTML={{__html: editorRef.current?.innerHTML}}></div>
                        </div>
                    </div>
                </div>}
            <div
                className="p-2 min-h-[55px] flex items-center flex-wrap justify-center gap-2 bg-gray-50 shadow-lg border border-t-[var(--secondary)] w-full mx-auto">
                <select name="heading" className="cursor-pointer p-2 text-lg hover:bg-gray-200 rounded-lg border"
                        onChange={(event) => {
                            if (event.target.value === "select") return
                            formatDoc('formatBlock', event.target.value);
                            event.target.value = 'select'
                        }}>
                    <option value="select">Select</option>
                    <option value="p">Normal</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                    <option value="h5">Heading 5</option>
                </select>

                <select name="setAs" className="cursor-pointer p-2 text-lg hover:bg-gray-200 rounded-lg border"
                        onChange={(event) => {
                            let opt = event.target.value
                            if (event.target.value === "select") return

                            let selection = window.getSelection()
                            let parent = selection?.anchorNode?.parentElement?.parentElement?.innerHTML
                            let _old_par = parent

                            if (!parent) return

                            let regX = new RegExp(`<span.*data-roko="(\w+)".*>${selection}</span>`, 'g');
                            opt = `<span data-roko="${opt}" title="${opt}" class="__roko">${selection}</span>`

                            if (event.target.value === "remove") {
                                parent = parent.replace(regX, selection)
                                setChoose({...choose, [event.target.value]: null})
                            } else {
                                setChoose({...choose, [event.target.value]: selection?.toString()})
                                if (regX.test(parent)) {
                                    parent = parent.replace(regX, opt)
                                } else {
                                    parent = parent.replace(selection, opt)
                                }
                            }

                            editorRef.current.innerHTML = editorRef.current.innerHTML.replace(_old_par, parent)

                            event.target.value = "select"
                        }}>
                    <option value="select">Select</option>
                    {Object.keys(choose || {}).map((item) => {
                        let _id = item
                        item = choose?.[item]

                        return <option value={_id} disabled={!!item}>
                            {_id.toUpperCase()}
                        </option>
                    })}
                    <option value="remove">Remove</option>
                </select>

                <button onClick={() => formatDoc('undo')} className="p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <BiUndo/></button>
                <button onClick={() => formatDoc('redo')} className="p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <BiRedo/></button>
                <button onClick={() => formatDoc('bold')} className="p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <BiBold/></button>
                <button onClick={() => formatDoc('italic')} className="p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <BiItalic/></button>
                <button onClick={() => formatDoc('underline')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiUnderline/></button>
                <button onClick={() => formatDoc('strikeThrough')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiStrikethrough/></button>
                <button onClick={() => formatDoc('justifyLeft')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiAlignLeft/></button>
                <button onClick={() => formatDoc('justifyCenter')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiAlignMiddle/></button>
                <button onClick={() => formatDoc('justifyRight')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiAlignRight/></button>
                <button onClick={() => formatDoc('justifyFull')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiAlignJustify/></button>
                <button onClick={() => formatDoc('insertOrderedList')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiListOl/></button>
                <button onClick={() => formatDoc('insertUnorderedList')}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiListUl/></button>
                <button onClick={() => formatDoc('insertUnorderedList')}
                        className="relative p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <input type="color" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                        formatDoc("foreColor", e.target.value);
                    }}/>
                    <CiText color='var(--secondary)'/>
                </button>
                <button onClick={() => {
                    let link = prompt("Enter doc URL:-")

                    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

                    if (!urlPattern.test(link)) {
                        alert("Invalid URL. Please enter a valid URL.");
                        return;
                    }


                    editorRef.current.innerHTML += `<iframe src="${link}"></iframe>`
                }}
                        className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><SiGoogledocs/></button>
                <button onClick={addLink} className="p-2 text-xl hover:bg-gray-200 rounded-lg border"><BiLink/></button>
                <button onClick={() => formatDoc('unlink')} className="p-2 text-xl hover:bg-gray-200 rounded-lg border">
                    <BiUnlink/></button>
                <button onClick={toggleHTMLView}
                        className="p-2 text-lg bg-gray-200 rounded-lg border text-center">&lt;/&gt; | {showHTML ? 'TEXT' : 'HTML'}</button>
                <button onClick={() => setpreUpload(true)}
                        className="p-2 text-lg bg-sec text-white rounded-lg border text-center flex items-center gap-2">
                    <BiUpload/> Upload
                </button>
            </div>

            <section
                ref={editorRef}
                contentEditable
                className="__editor max-w-[1200px] mx-auto w-full h-[85vh] border outline-none p-4 bg-white overflow-y-auto shadow-lg text-gray-800">
                <p className='text-center'>Loading...</p>
            </section>
        </>
    );
};