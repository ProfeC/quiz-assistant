export interface WordsProps {
    currentQuizID: string;
    displayName?: string;
}

export interface WordsState{
    currentSpelling: string;
    currentWord: string;
    displayTime: number;
    showWord: boolean;
    skill: string;
    spellingChecked: boolean;
    spellingMatches: boolean;
    spellingWords: SpellingWordsProps;
    spellingWordsCount: number;
    title: string;
}

export interface SpellingWordsProps {
    words: {};
}