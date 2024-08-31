"use client"
import React from 'react'
import sass from './footer.module.scss';
import Image from 'next/image';
import { IconContext } from "react-icons";
import { FaTiktok } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
const Footer = () => {
    return (
        <IconContext.Provider value={{ className: sass.icons }}>
            <footer className={sass.footer}>
                {/* <h2>Footer</h2> */}
                <div className={sass.socialMedia}>
                    <Image
                        className={sass.logo}
                        src="/favicon.ico"
                        alt="PDF.ai logo"
                        width={25}
                        height={25}
                    />
                    <div className={sass.info}>Chat with any PDF: ask questions, get summaries, find information, and more.</div>
                    <ul>
                        <li>
                            <a href="https://www.tiktok.com/@pdfai"
                                target="_blank"><FaTiktok /></a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/pdfdotai/"
                                target="_blank"><FaInstagram /></a >
                        </li>
                        <li>
                            <a href="https://twitter.com/pdfdotai"
                                target="_blank"><FaTwitter /></a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/@pdfai"
                                target="_blank"><FaYoutube /></a>
                        </li>
                    </ul>
                </div>

                <div className={sass.grids}>
                    <div className={sass.card}>
                        <h3>Products</h3>
                        <ul role="list" >
                            <li>
                                <a href="/use-cases">Use cases</a>
                            </li>
                            <li>
                                <a href="/chrome-extension">Chrome extension</a></li>
                            <li>
                                <a href="https://api.pdf.ai/">API docs</a></li>
                            <li>
                                <a href="https://pdf.ai/pricing">Pricing</a></li>
                            <li>
                                <a href="https://pdf.ai/tutorials">Video tutorials</a></li>
                            <li>
                                <a href="https://pdf.ai/resources">Resources</a></li>
                            <li>
                                <a href="https://pdf.ai/blog">Blog</a></li>
                            <li>
                                <a href="/faq">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className={sass.card}>
                        <h3>We also built</h3>
                        <ul role="list" >
                            <li><a href="https://pdf.ai/tools/resume-ai-scanner">Resume AI Scanner</a></li>
                            <li><a href="https://pdf.ai/tools/invoice-ai-scanner">Invoice AI Scanner</a></li>
                            <li><a href="https://pdf.ai/tools/quiz-ai-generator">AI Quiz Generator</a></li>
                            <li><a href="https://quickyai.com">QuickyAI</a></li>
                            <li><a href="https://docsium.com">Docsium</a></li>
                            <li><a href="https://pdf.ai/gpts">PDF GPTs</a></li>
                            <li><a href="https://pdfgen.com">PDF AI generator</a></li>
                            <li><a href="https://pdf.ai/tools">Other PDF tools</a></li>
                        </ul>
                    </div>
                    <div className={sass.card}>
                        <h3>Company</h3>
                        <ul role="list" >
                            <li><a href="/compare/chatpdf-alternative">PDF.ai vs ChatPDF</a></li>
                            <li><a href="/compare/adobe-acrobat-reader-alternative">PDF.ai vs Acrobat Reader</a></li>
                            <li><a href="/privacy-policy">Legal</a></li>
                            <li><a href="/affiliate-program">Affiliate program 💵</a></li>
                            <li><a href="/investor">Investor</a></li></ul>
                    </div>
                </div>
            </footer>

        </IconContext.Provider>
    )
}

export default Footer