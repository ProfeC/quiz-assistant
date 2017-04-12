// Type definitions for Quiz Assistant v2.0.0
// Project: Quiz Assistant
// Definitions by: G. L. Clark, II <https://github.com/ProfeC>
// Template: http://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html

/*~ If your library has properties exposed on a global variable,
 *~ place them here.
 *~ You should also place types (interfaces and type alias) here.
 */
declare namespace QuizAssistant {
    //~ We can write 'QuizAssistant.timeout = 50;'
    let timeout: number;

    //~ We can access 'QuizAssistant.version', but not change it
    const version: string;

    //~ We can write 'QuizAssistant.initialData = {some object};'
    let initialData: {};

    //~ We can write 'const v: QuizAssistant.VetID = 42;'
    //~  or 'const v: QuizAssistant.VetID = "bob";'
    type VetID = string | number;


    //~ We can declare a variable as
    //~   'var s: QuizAssistant.CatSettings = { weight: 5, name: "Maru" };'
    // interface CatSettings {
    //     weight: number;
    //     name: string;
    //     tailLength?: number;
    // }

    interface AppProps {
        initialData: InitialDataProps;
        displayName?: string;
    }

    interface AppState {
        initialData: InitialDataProps;
        quizzes: {};
        currentQuizID: string;
        currentContent: {};
        fetchQuizList: any;
    }

    interface InitialDataProps {
        quizzes?: {};
    }

    interface SpellingWordsProps {
        words: {};
    }

    interface WordsProps {
        currentQuizID: string;
        displayName?: string;
    }

    interface WordsState{
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

    //~ We can invoke 'QuizAssistant.checkCat(c)' or 'QuizAssistant.checkCat(c, v);'
    function checkCat(c: Cat, s?: VetID);
}
