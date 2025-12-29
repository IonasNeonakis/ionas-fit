export interface Friend {
    id: string;
    name: string;
    cardNumber: string;
    avatarUrl?: string;
}

export const FRIENDS: Friend[] = [
    {
        id: "1",
        name: "Alice Johnson",
        cardNumber: "12345678",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice"
    },
    {
        id: "2",
        name: "Bob Smith",
        cardNumber: "87654321",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob"
    },
    {
        id: "3",
        name: "Charlie Brown",
        cardNumber: "11223344",
        avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie"
    }
];
