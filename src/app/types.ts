export interface Icon {
    iconName: IconName;
    email: string;
}

export enum IconName {
    superBad = 'sentiment_very_dissatisfied',
    bad = 'sentiment_dissatisfied',
    neutral = 'sentiment_neutral',
    good = 'sentiment_satisfied',
    superGood = 'sentiment_very_satisfied',
}

export interface Partners {
    partnerA: IconName;
    partnerB: IconName;
}
