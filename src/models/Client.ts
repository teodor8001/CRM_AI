export interface Client {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    createdAt: string; // ISO string
    notes?: string;
    status?: 'Uncontacted' | 'Contacted';
}
