export interface Friend {
    id: string;
    name: string;
    cardNumber: string;
    avatarUrl?: string;
}

export const FRIENDS: Friend[] = [
    {
        id: "1",
        name: "Marie",
        cardNumber: "F172605612",
        avatarUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Maria"
    },
    {
        id: "2",
        name: "Olivier",
        cardNumber: "F177061960",
        avatarUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Aiden"
    },
    {
        id: "3",
        name: "Pej",
        cardNumber: "F172989414",
        avatarUrl: "https://api.dicebear.com/9.x/open-peeps/svg?seed=Jameson"
    }
] as const;
