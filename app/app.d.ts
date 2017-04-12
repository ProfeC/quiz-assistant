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
    let timerID: number;

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

    interface QuizGridProps {
      id: string;
      title: string;
      subject: string;
      onQuizClick: any
    }

    interface QuizGridState {}

    interface SpellingWordsProps {
        words: object[];
    }

    interface WordsProps {
        currentQuizID: string;
        displayName?: string;
        timerID?: number;
    }

    interface WordsState{
        currentSpelling: string;
        currentWord: string;
        displayTime: number;
        showWord: boolean;
        skill: string;
        spellingChecked: boolean;
        spellingMatches: boolean;
        spellingWords: string[];
        spellingWordsCount: number;
        title: string;
    }

    //~ There's some class we can create via 'let c = new myLib.Cat(42)'
    //~ Or reference e.g. 'function f(c: myLib.Cat) { ... }
    // class Cat {
    //     constructor(n: number);

    //     //~ We can read 'c.age' from a 'Cat' instance
    //     readonly age: number;

    //     //~ We can invoke 'c.purr()' from a 'Cat' instance
    //     purr(): void;
    // }

    //~ We can invoke 'QuizAssistant.checkCat(c)' or 'QuizAssistant.checkCat(c, v);'
    // function checkCat(c: Cat, s?: VetID);
}
