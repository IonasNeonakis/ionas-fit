import {createFileRoute} from "@tanstack/react-router";
// @ts-expect-error type isn't correct in react-qr-code
import {QRCode} from "react-qr-code";
import {useQuery} from "@tanstack/react-query";
import {qrCodeOptions} from "../utils/qrcode.ts";
import {useState} from "react";

export const Route = createFileRoute('/')({
    component: Home,
})

const PEOPLE = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
]

function Home() {
    const {data: qrCodeData, isLoading} = useQuery(qrCodeOptions())
    const [selectedPerson, setSelectedPerson] = useState<{ id: number; name: string } | null>(null)

    if (isLoading) return <p>Loading QR…</p>

    return (
        <main className="container">
            <header className="header">
                <h1>IonasFit</h1>
            </header>

            <section className="qr-section">
                <div className="qr-container">
                    <QRCode value={qrCodeData || ""} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                </div>
                <p className="refresh-text">Refreshes every 5 seconds</p>
            </section>

            <section className="people-section">
                <h2>Quick Access</h2>
                <ul className="people-list">
                    {PEOPLE.map(person => (
                        <li key={person.id} className="person-item" onClick={() => setSelectedPerson(person)}>
                            <span>{person.name}</span>
                            <span className="arrow">→</span>
                        </li>
                    ))}
                </ul>
            </section>

            {selectedPerson && (
                <div className="fullscreen-overlay" onClick={() => setSelectedPerson(null)}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={() => setSelectedPerson(null)}>×</button>
                        <h2>{selectedPerson.name}</h2>
                        <div className="qr-container large">
                            <QRCode value={`PERSON:${selectedPerson.id}:${selectedPerson.name}`} size={300} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                        </div>
                        <p>Scan for details</p>
                    </div>
                </div>
            )}
        </main>
    )
}

