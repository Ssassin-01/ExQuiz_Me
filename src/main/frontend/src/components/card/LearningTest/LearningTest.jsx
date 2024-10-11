import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/LearningTest.css';

const LearningTest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, vocabularyItems: originalVocabularyItems, testOption, graded: gradedFromResult, answers: answersFromResult } = location.state || { title: '', vocabularyItems: [], testOption: 'korean' };

    const [vocabularyItems, setVocabularyItems] = useState([]);
    const [answers, setAnswers] = useState(answersFromResult || {}); // 이전 입력 값을 유지
    const [graded, setGraded] = useState(gradedFromResult || {}); // 이전 graded 상태 유지
    const [missedWords, setMissedWords] = useState([]); // 오답 항목 저장
    const [isRandomized, setIsRandomized] = useState(false); // 단어가 랜덤화되었는지 여부 확인

    useEffect(() => {
        // 초기 랜더링 시 단어 리스트를 원래 순서로 설정
        setVocabularyItems([...originalVocabularyItems]);
    }, [originalVocabularyItems]);

    // 단어를 랜덤으로 섞는 함수
    const shuffleVocabularyItems = () => {
        const shuffled = [...originalVocabularyItems].sort(() => Math.random() - 0.5);
        setVocabularyItems(shuffled); // 랜덤으로 섞인 단어 배열을 상태로 설정
        setAnswers({}); // 정답 초기화
        setGraded({}); // 채점 상태 초기화
        setIsRandomized(true); // 랜덤화 상태 설정
    };

    const handleChange = (index, value) => {
        setAnswers({
            ...answers,
            [index]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let correct = 0;
        const missed = [];
        const correctAnswers = {};
        const gradeStatus = { ...graded }; // 기존 graded 상태를 복사하여 유지

        vocabularyItems.forEach((wordPair, index) => {
            if (graded[index] === 'correct') {
                correct++;
                correctAnswers[index] = wordPair;
                return;
            }

            const userAnswer = answers[index] ? answers[index].trim() : '';
            const correctAnswer = testOption === 'korean' ? wordPair.englishWord : wordPair.koreanWord;

            const correctAnswersArray = correctAnswer.split(',').map(answer => answer.trim().toLowerCase());

            if (correctAnswersArray.includes(userAnswer.toLowerCase())) {
                correct++;
                correctAnswers[index] = wordPair;
                gradeStatus[index] = 'correct';
            } else {
                missed.push(wordPair); // 오답 항목에 단어를 추가
                gradeStatus[index] = 'incorrect';
            }
        });

        setMissedWords(missed);
        setGraded(gradeStatus);

        navigate('/learning/learn-test-result', {
            state: {
                title,
                okWords: Object.values(correctAnswers),
                missedWords: missed, // 오답 항목을 정확하게 결과 페이지로 전달
                vocabularyItems, // 랜덤 또는 기존 단어 순서에 따라 전달
                testOption,
                graded: gradeStatus,
                answers,
                isRandomized, // 랜덤화 여부를 결과 페이지에 전달
            },
        });
    };

    return (
        <div className="testBoxSize">
            <div className="test-container">
                <h1>{title}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="test-word-list">
                        {vocabularyItems.map((wordPair, index) => (
                            <div key={index} className="word-item">
                                <div className="word-content">
                                    <label style={{ fontWeight: 'Bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {index + 1}. {testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}
                                        {graded[index] === 'correct' ? (
                                            <span style={{ color: 'green', marginLeft: '10px' }}>⭕</span>
                                        ) : graded[index] === 'incorrect' ? (
                                            <span style={{ color: 'red', marginLeft: '10px' }}>❌</span>
                                        ) : null}
                                    </label>
                                    <input
                                        className="test-input-box"
                                        type="text"
                                        value={answers[index] || ''}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        placeholder={testOption === 'korean' ? '영어 단어를 입력하세요' : '한국어 단어를 입력하세요'}
                                        disabled={graded[index] === 'correct'}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit">제출</button>
                </form>
            </div>
        </div>
    );
};

export default LearningTest;
