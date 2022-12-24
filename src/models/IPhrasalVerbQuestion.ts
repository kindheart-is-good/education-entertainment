export interface IPhrasalVerbQuestion {
    id: number;
    questionText: string;
    variants: IPhrasalVerbVariant[];
}

export interface IPhrasalVerbVariant {
    variantNumber: number;
    isRightAnswer: boolean;
    verbAndParticle: string;
    meaning: string;
    example: string;
}
