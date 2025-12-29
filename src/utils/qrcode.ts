import {queryOptions} from "@tanstack/react-query";
import {createServerFn, createServerOnlyFn} from "@tanstack/react-start";
import * as crypto from "node:crypto";
import {serverEnv} from "@/config/env.ts";

const GUID = "TVR"
const PREFIX = "GM2";


const generateHash = createServerOnlyFn(async (timestamp: number) => {
    const CARD_NUMBER = serverEnv.CARD_NUMBER;
    const DEVICE_ID = serverEnv.DEVICE_ID;

    const dataToHash = CARD_NUMBER + GUID + timestamp + DEVICE_ID;
    const hash = crypto.createHash("sha256").update(dataToHash).digest("hex");

    // return hash last 8
    return hash.slice(-8).toUpperCase();
})


export const generateQrCodeData = createServerFn()
    .handler(async () => {
        const timestamp = Math.floor(Date.now() / 1000);

        const hash = await generateHash(timestamp);

        const CARD_NUMBER = serverEnv.CARD_NUMBER;

        return `${PREFIX}:${CARD_NUMBER}:${GUID}:${timestamp}:${hash}`;
    })


const REFETCH_INTERVAL_MS = 5_000;

export const qrCodeOptions = () => queryOptions({
    queryKey: ["QRCode"],
    queryFn: () => generateQrCodeData(),
    refetchInterval: REFETCH_INTERVAL_MS,
    placeholderData: (previousData) => previousData
})