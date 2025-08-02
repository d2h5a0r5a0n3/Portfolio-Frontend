export interface Education {
    id?: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string | Date;
    endDate?: string | Date;
    description: string;
}
