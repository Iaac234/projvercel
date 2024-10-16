import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import "./globals.css";
import Debite from "./Hooks/Debite";

export const metadata = {
    title: 'Debite - All Source of Debate transcripts with sub-par Analysis.',
    images: ['/images/middleIcon.png'],
    description: 'Wondering how to actually get better at debate on your own?',
    openGraph: {
        title: 'Debite - All Source of Debate transcripts with sub-par Analysis.',
        description: 'Wondering how to actually get better at debate on your own?',
        url: 'https://debite.org/',
        images: ['/images/hapynotes.png'],
    }
}


export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="keywords" content="Debite, transcript, docs, all source"/>
            <link rel="shortcut icon" href="favicon.ico"/>
            <link rel="icon" href="favicon.ico"/>
        </head>
        <body>
        <Debite>
            <NavBar/>
            {children}
            <Footer/>
        </Debite>
        </body>
        </html>
    );
}
