// src/types/user.d.ts

export type User = {
	id: string | null;
    name: string | undefined | null;
    email: string | null;
    credits: number | null;
	instagramTokenExpiry?: Date | null; 
    instagramConnected?: boolean;
    instagramId?: string | null; 
    instagramToken?: string | null;
	creditTransactions?: CreditTransaction[];
};