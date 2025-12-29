import {createFileRoute} from "@tanstack/react-router";
import {type Friend} from "@/data/friends.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {useState} from "react";
import {MyQRCodeSection} from "@/components/home/my-qr-code-section.tsx";
import {FriendsSection} from "@/components/home/friends-section.tsx";
import {FriendQRDialog} from "@/components/home/friend-qr-dialog.tsx";

export const Route = createFileRoute('/')({
    component: Home,
})

function Home() {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 p-4 pt-8 md:p-8">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">IonasFit</h1>
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

