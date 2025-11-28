import { User } from "./user.model";

export interface Feedback
{
    FeedbackId?: number;
    UserId: number;
    FeedbackText: string;
    Date: Date;
    User?: User;
}
