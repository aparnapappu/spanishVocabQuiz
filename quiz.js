const vocabularyData = {
  // Los verbos reflexivos
  "aburrirse": "to get bored",
  "acercarse": "to get close to",
  "acordarse de": "to remember",
  // ... [Add all vocabulary from previous code]
};

const exampleSentences = {
  "aburrirse": "Me aburro en esta clase - I'm bored in this class",
  "acostarse": "Me acuesto temprano - I go to bed early",
  // ... [Add all example sentences from previous code]
};

function SpanishQuiz() {
    const [currentWord, setCurrentWord] = React.useState('');
    const [userAnswer, setUserAnswer] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [showAnswer, setShowAnswer] = React.useState(false);

    const getRandomWord = () => {
        const words = Object.keys(vocabularyData);
        return words[Math.floor(Math.random() * words.length)];
    };

    React.useEffect(() => {
        setCurrentWord(getRandomWord());
    }, []);

    const checkAnswer = () => {
        const correctAnswer = vocabularyData[currentWord].toLowerCase();
        const userGuess = userAnswer.toLowerCase().trim();

        if (correctAnswer === userGuess) {
            setFeedback("¡Correcto! 🎉");
            setShowAnswer(false);
        } else {
            setFeedback("Keep trying! Here's the correct answer:");
            setShowAnswer(true);
        }
    };

    const nextWord = () => {
        setCurrentWord(getRandomWord());
        setUserAnswer('');
        setFeedback('');
        setShowAnswer(false);
    };

    return (
        <div className="min-h-screen p-4">
            <div className="card max-w-lg mx-auto">
                <h1 className="text-2xl font-bold text-center mb-4">Spanish Vocabulary Quiz</h1>
                
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">¿Qué significa?</h2>
                    <p className="text-2xl text-blue-600">{currentWord}</p>
                </div>

                <input
                    type="text"
                    className="input"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                    placeholder="Type the English meaning..."
                />

                <div className="flex gap-2">
                    <button 
                        className="button button-primary w-1/2"
                        onClick={checkAnswer}>
                        Check Answer
                    </button>
                    <button 
                        className="button w-1/2"
                        onClick={nextWord}>
                        Next Word
                    </button>
                </div>

                {feedback && (
                    <div className="mt-4 p-4 bg-blue-50 rounded">
                        <p>{feedback}</p>
                        {showAnswer && (
                            <div className="mt-2">
                                <p className="font-bold">{vocabularyData[currentWord]}</p>
                                {exampleSentences[currentWord] && (
                                    <p className="italic mt-2">
                                        Example: {exampleSentences[currentWord]}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<SpanishQuiz />, document.getElementById('root'));
