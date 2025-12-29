import * as React from "react";
import { FRIENDS, type Friend } from "@/data/friends.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";

interface FriendsSectionProps {
    onFriendClick: (friend: Friend) => void;
}

export function FriendsSection({ onFriendClick }: FriendsSectionProps) {
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
