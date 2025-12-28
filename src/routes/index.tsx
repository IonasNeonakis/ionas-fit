import {createFileRoute} from "@tanstack/react-router";
import {QRCode} from "react-qr-code";
import {generateQrCodeData} from "../utils/qrcodeGenerator.ts";

export const Route = createFileRoute('/')({
    component: Home,
    loader: () => generateQrCodeData()
})

function Home() {
    const qrCodeData = Route.useLoaderData()

    console.log(qrCodeData);

    return (
        <>
            <div>
                Hello World
            </div>
            <div style={{background: "white", padding: "16px"}}>
                <QRCode value={qrCodeData}/>
            </div>
        </>
    )
}

