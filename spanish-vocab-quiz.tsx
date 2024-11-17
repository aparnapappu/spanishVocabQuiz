import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const vocabularyData = {
  // Los verbos reflexivos
  "aburrirse": "to get bored",
  "acercarse": "to get close to",
  "acordarse de": "to remember",
  "acostarse": "to go to bed",
  "afeitarse": "to shave",
  "alegrarse": "to become happy",
  "amarrarse (los zapatos)": "to tie your shoes",
  "arrepentirse": "to regret",
  "arreglarse": "to get ready",
  "atarse (los zapatos)": "to tie your shoes",
  "bañarse": "to bathe; to take a bath",
  "cepillarse el pelo": "to brush one's hair",
  "cepillarse los dientes": "to brush one's teeth",
  "comerse": "to eat something all up",
  "creerse": "to fall for",
  "darse cuenta de": "to realize",
  "despedirse (de)": "to say goodbye to",
  "despertarse": "to wake up",
  "desvestirse": "to undress",
  "depilarse": "to wax",
  "dormirse": "to fall asleep",
  "ducharse": "to shower; to take a shower",
  "enamorarse de": "to fall in love with",
  "enfermarse": "to get sick",
  "enojarse (con)": "to get angry with",
  "enterarse de": "to find out",
  "irse": "to go away; to leave",
  "lastimarse": "to get hurt; hurt oneself",
  "lavarse la cara": "to wash one's face",
  "lavarse las manos": "to wash one's hands",
  "llenarse": "to be full",
  "llevarse mal/bien": "to get along; not to get along",
  "levantarse": "to get up",
  "maquillarse": "to put on makeup",
  "mirarse": "to look oneself in the mirror",
  "morirse": "to die; to be dying of hunger",
  "negarse": "to refuse",
  "olvidarse": "to forget",
  "parecerse a": "to look alike",
  "peinarse": "to comb one's hair",
  "perderse": "to get lost",
  "ponerse": "to put on",
  "ponerse (+ adj.)": "to become",
  "preocuparse (de/por)": "to worry about",
  "probarse": "to try on",
  "quedarse": "to stay; to remain",
  "quejarse de": "to complain about",
  "quemarse": "to burn oneself",
  "quitarse": "to take off",
  "romperse": "to break an arm leg",
  "secarse": "to dry oneself",
  "sentarse": "to sit down",
  "sentirse": "to feel",
  "vestirse": "to get dressed",
  // En el baño
  "el acondicionador": "the conditioner",
  "el baño": "the bathroom",
  "el cuarto de baño": "the bathroom",
  "el cepillo": "the brush",
  "el cepillo de dientes": "the toothbrush",
  "el champú": "the shampoo",
  "la crema de afeitar": "the shaving cream",
  "la ducha": "the shower",
  "el espejo": "the mirror",
  "el inodoro": "the toilet",
  "el jabón": "the soap",
  "el lavabo": "the sink",
  "el maquillaje": "the makeup",
  "la pasta de dientes": "the toothpaste",
  "el peine": "the comb",
  "la toalla": "the towel",
  // Palabras adicionales
  "el despertador": "alarm clock",
  "la rutina diaria": "daily routine",
  "por la mañana": "in the morning",
  "por la noche": "at night",
  "por la tarde": "in the afternoon; in the evening",
  "por la madrugada": "at night (after 1am)",
  // Expresiones
  "a menudo": "frequently; often",
  "a propósito": "on purpose",
  "a tiempo": "on time",
  "a veces": "sometimes",
  "antes": "beforehand",
  "antes de": "before",
  "apenas": "hardly; scarcely",
  "así": "like this; so",
  "bastante": "quite; enough",
  "casi": "almost",
  "casi nunca": "rarely",
  "de repente": "suddenly",
  "de vez en cuando": "now and then; once in a while",
  "después": "afterwards; then",
  "después de": "after",
  "durante": "during",
  "en aquel entonces": "at that time",
  "en el acto": "immediately",
  "enseguida": "right away",
  "entonces": "then",
  "luego": "then",
  "más tarde": "later on",
  "por casualidad": "by chance",
  "por último": "finally",
  "siempre": "always",
  "una vez": "once",
  "dos veces": "twice",
  "tres veces": "three times"
};

const exampleSentences = {
  "aburrirse": "Me aburro en esta clase - I'm bored in this class",
  "acostarse": "Me acuesto temprano - I go to bed early",
  "bañarse": "Me baño todas las mañanas - I take a bath every morning",
  "cepillarse los dientes": "Me cepillo los dientes después de comer - I brush my teeth after eating",
  "ducharse": "Me ducho antes de trabajar - I shower before work",
  "despertarse": "Me despierto a las 7 - I wake up at 7",
  "levantarse": "Me levanto cuando sale el sol - I get up when the sun rises",
  "peinarse": "Me peino después de ducharme - I comb my hair after showering",
  "vestirse": "Me visto rápidamente - I get dressed quickly",
  "el despertador": "Mi despertador suena a las 6 - My alarm clock rings at 6",
  "por la mañana": "Tomo café por la mañana - I drink coffee in the morning",
  "por la noche": "Leo un libro por la noche - I read a book at night",
  "a menudo": "Voy al gimnasio a menudo - I go to the gym often",
  "siempre": "Siempre llego temprano - I always arrive early"
};

const motivationalPhrases = [
  "¡Sigue intentando! You're getting better!",
  "¡Casi! Keep practicing!",
  "¡Tú puedes! You can do it!",
  "Great effort! Let's try another one!",
  "Learning takes time - you're doing great!",
  "That's a tricky one - keep going!",
  "Practice makes perfect! Let's continue!",
  "You're making progress! Keep it up!"
];

const emojis = ['🌟', '⭐', '🎉', '👏', '🎈', '🎊', '🌈', '✨', '💫', '🦄', '🌺', '🌸', '🎯', '🏆', '💪'];

const normalizeText = (text) => {
  return text
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const areSimilar = (str1, str2) => {
  const norm1 = normalizeText(str1);
  const norm2 = normalizeText(str2);

  // Remove common words that don't affect meaning
  const removeCommonWords = (text) => {
    return text.replace(/\b(the|to|a|an|in|on|at|for|of|with)\b/g, '').trim();
  };

  const clean1 = removeCommonWords(norm1);
  const clean2 = removeCommonWords(norm2);

  // Split into words and check overlap
  const words1 = new Set(clean1.split(' '));
  const words2 = new Set(clean2.split(' '));
  
  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);
  
  return intersection.size / union.size >= 0.7;
};

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

function SpanishVocabQuiz () {
  const [currentWord, setCurrentWord] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const getNewWord = () => {
    const words = Object.keys(vocabularyData);
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);
    setUserAnswer('');
    setFeedback('');
    setShowAnswer(false);
  };

  const checkAnswer = () => {
    const correctAnswer = vocabularyData[currentWord];
    if (areSimilar(userAnswer, correctAnswer)) {
      setFeedback(`¡Correcto! ${getRandomItem(emojis)}`);
      setShowAnswer(false);
    } else {
      setFeedback(`${getRandomItem(motivationalPhrases)}`);
      setShowAnswer(true);
    }
  };

  // Initialize with a random word
  React.useEffect(() => {
    getNewWord();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center"> Govind's Spanish Vocabulary Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">¿Qué significa?</h2>
            <p className="text-2xl text-blue-600">{currentWord}</p>
          </div>
          
          <div className="space-y-4">
            <Input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
              placeholder="Type the English meaning..."
              className="w-full"
            />
            
            <div className="flex gap-2">
              <Button 
                onClick={checkAnswer}
                className="w-1/2"
              >
                Check Answer
              </Button>
              <Button 
                onClick={getNewWord}
                variant="outline"
                className="w-1/2"
              >
                Next Word
              </Button>
            </div>
          </div>

          {feedback && (
            <Alert>
              <AlertDescription>{feedback}</AlertDescription>
            </Alert>
          )}

          {showAnswer && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
              <p className="font-semibold">The correct answer is: {vocabularyData[currentWord]}</p>
              {exampleSentences[currentWord] && (
                <p className="italic mt-2">
                  Example: {exampleSentences[currentWord]}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SpanishVocabQuiz;
