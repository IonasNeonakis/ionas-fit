import {createFileRoute} from "@tanstack/react-router";
// @ts-expect-error type isn't correct in react-qr-code
import {QRCode} from "react-qr-code";
import {useQuery} from "@tanstack/react-query";
import {qrCodeOptions} from "@/utils/qrcode.ts";
import {FRIENDS, type Friend} from "@/data/friends.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {ScrollArea} from "@/components/ui/scroll-area.tsx";
import {Progress} from "@/components/ui/progress.tsx";
import {useState, useEffect} from "react";
import {Loader2} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 p-4 pt-8 md:p-8">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">IonasFit</h1>
                <p className="text-muted-foreground">Your fitness companion</p>
            </header>

            <div className="w-full max-w-md mx-auto">
                <Tabs defaultValue="my-qr" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="my-qr">My QR</TabsTrigger>
                        <TabsTrigger value="friends">Friends</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="my-qr" className="space-y-4">
                        <MyQRCodeSection />
                    </TabsContent>
                    
                    <TabsContent value="friends" className="space-y-4">
                        <FriendsSection onFriendClick={setSelectedFriend} />
                    </TabsContent>
                </Tabs>
            </div>

            <FriendQRDialog 
                friend={selectedFriend} 
                onClose={() => setSelectedFriend(null)} 
            />
        </div>
    )
}


function MyQRCodeSection() {
    const {data: qrCodeData, isLoading, dataUpdatedAt} = useQuery(qrCodeOptions())
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (!dataUpdatedAt) return;

        const interval = 50; // Update every 50ms for smoothness
        const totalDuration = 5000;

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

function FriendsSection({ onFriendClick }: { onFriendClick: (friend: Friend) => void }) {
    return (
        <Card className="border-none shadow-lg overflow-hidden">
            <CardHeader>
                <CardTitle>Friends</CardTitle>
                <CardDescription>Select a friend to show their access code</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-100">
                    <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {FRIENDS.map((friend) => (
                            <button
                                key={friend.id}
                                onClick={() => onFriendClick(friend)}
                                className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-left"
                            >
                                <Avatar className="h-12 w-12 border">
                                    <AvatarImage src={friend.avatarUrl} alt={friend.name} />
                                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-medium text-slate-900 dark:text-slate-100">{friend.name}</p>
                                    <p className="text-sm text-muted-foreground">Card: {friend.cardNumber}</p>
                                </div>
                                <div className="text-slate-300">
                                    <ChevronRightIcon className="h-5 w-5" />
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function FriendQRDialog({ friend, onClose }: { friend: Friend | null, onClose: () => void }) {
    const {data: qrCodeData, isLoading} = useQuery({
        ...qrCodeOptions(),
        enabled: !!friend
    })

    return (
        <Dialog open={!!friend} onOpenChange={(open) => !open && onClose()}>
            <DialogContent 
                className="sm:max-w-md border-none shadow-2xl" 
                onOpenAutoFocus={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={friend?.avatarUrl} />
                            <AvatarFallback>{friend?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {friend?.name}'s Access Code
                    </DialogTitle>
                    <DialogDescription>
                        Scan this QR code to grant access for {friend?.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center py-6">
                    <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-100">
                        {isLoading ? (
                            <div className="w-[200px] h-[200px] flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : (
                            <QRCode value={qrCodeData || ""} size={200} style={{ height: "auto", maxWidth: "100%", width: "100%" }} />
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}

