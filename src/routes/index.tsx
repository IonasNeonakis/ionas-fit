import {createFileRoute} from "@tanstack/react-router";
// @ts-expect-error type isn't correct in react-qr-code
import {QRCode} from "react-qr-code";
import {useQuery} from "@tanstack/react-query";
import {qrCodeOptions} from "../utils/qrcode.ts";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const {data: qrCodeData, isLoading} = useQuery(qrCodeOptions())

    if (isLoading) return <p>Loading QR…</p>


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

