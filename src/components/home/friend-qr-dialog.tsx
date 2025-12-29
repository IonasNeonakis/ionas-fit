import { useState } from "react";
// @ts-expect-error should extract QRCode as the type isn't correct
import { QRCode } from "react-qr-code";
import { type Friend } from "@/data/friends.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";

interface FriendQRDialogProps {
    friend: Friend | null;
    onClose: () => void;
}

export function FriendQRDialog({ friend, onClose }: FriendQRDialogProps) {
    const [displayFriend, setDisplayFriend] = useState<Friend | null>(null);

    if (friend && friend !== displayFriend) {
        setDisplayFriend(friend);
    }

    return (
        <Dialog open={!!friend} onOpenChange={(open) => !open && onClose()}>
            <DialogContent 
                className="sm:max-w-md border-none shadow-2xl" 
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={displayFriend?.avatarUrl} />
                            <AvatarFallback>{displayFriend?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {displayFriend?.name}'s Access Code
                    </DialogTitle>
                    <DialogDescription>
                        Scan this QR code to grant access for {displayFriend?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-100">
                          <QRCode  value={displayFriend?.cardNumber ?? ""} size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
