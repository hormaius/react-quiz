# Refactoring Challenge

***

## What to do:
1. Duplicate "src" folder to "src-no-context"
2. Review data flow and passed props
3. Identify what props are using prop drills
4. Use the Context API to get rid of prop drilling
5. Create a new context named "QuizContext" with the reducer we have learned
6. Create a custom provider component "QuizProvider" and provide all the states to their respective locations
7. Create a custom hook to consume state all over the application
8. Delete unnecessary props
> IMPORTANT: Note what states you need in the upper App component, you might need to wrap the whole App into the context (HINT: try in index.js)