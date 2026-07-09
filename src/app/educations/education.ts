export interface Education {
    id?: string;
    order?: number;
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string | Date;
    endDate?: string | Date;
    description: string;
}
