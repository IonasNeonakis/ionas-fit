import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
// @ts-expect-error should extract QRCode as the type isn't correct
import { QRCode } from "react-qr-code";
import { Loader2 } from "lucide-react";
import {qrCodeOptions, REFETCH_QR_INTERVAL_MS} from "@/utils/qrcode.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Progress } from "@/components/ui/progress.tsx";

export function MyQRCodeSection() {
    const { data: qrCodeData, isLoading, dataUpdatedAt } = useQuery(qrCodeOptions())
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!dataUpdatedAt) return;

        const interval = 50; // Update every 50ms for smoothness
        const totalDuration = REFETCH_QR_INTERVAL_MS;

        const timer = setInterval(() => {
            const elapsed = Date.now() - dataUpdatedAt;
            const remaining = Math.max(0, totalDuration - elapsed);
            setProgress((remaining / totalDuration) * 100);
        }, interval);

        return () => clearInterval(timer);
    }, [dataUpdatedAt]);

    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
                <CardTitle>Member Access</CardTitle>
                <CardDescription>Scan this code to enter the gym</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pb-8">
                <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-100">
                    {isLoading ? (
                        <div className="w-[256px] h-64 flex items-center justify-center">
                            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <QRCode value={qrCodeData} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                    )}
                </div>
                <div className="mt-6 w-full max-w-[256px] space-y-2">
                    <Progress value={isLoading ? undefined : progress} className="h-1" />
                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider font-medium">
                        {isLoading ? "Fetching QR Code" : "Refreshing QR Code"}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
