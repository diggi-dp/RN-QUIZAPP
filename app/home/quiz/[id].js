import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Stack, useNavigation, useRouter, useLocalSearchParams } from 'expo-router'
import { COLORS } from '../../../constants/theme'
import { StyleSheet } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'
import TimerSlide from '../../../components/quiz/TimerSlide'
import Button from '../../../components/common/Button'
import { GETQUIZ } from '../../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setStatus } from '../../../redux/slices/profileSlice'
import { STATUSES } from '../../../constants/enum'
import Loader from '../../../components/common/Loader'
import NetworkInfo from '../../../components/common/NetworkInfo'
import ConfirmBox from '../../../components/common/Confirm'
import NoQuestion from '../../../components/quiz/NoQuestion'
import { setToast } from '../../../redux/slices/toastSlice'
import { setResult } from '../../../redux/slices/userSlice'



const Quiz = () => {
    const { difficulty, id } = useLocalSearchParams()

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [selectedAnswer, setSelectedAnswer] = useState([]);

    const [quizData, setQuizData] = useState([])

    // const [result, setResult] = useState({});

    const [confirm, setConfirm] = useState(false)

    const [submitPress, setSubmitQuiz] = useState(false)

    const { internetConnection } = useSelector(state => state.auth)
    const { status } = useSelector(state => state.profile)
    const dispatch = useDispatch()

    const router = useRouter()
    const navigation = useNavigation()

    useEffect(() => {
        const getQuiz = async () => {
            dispatch(setStatus(STATUSES.LOADING))
            try {
                const res = await GETQUIZ(difficulty, id)
                const data = await shuffleOptions(res.data)
                const arr = Array(data.length).fill(null)

                setSelectedAnswer(arr)
                setQuizData(data)

            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setStatus(STATUSES.IDLE))

            }
        }
        getQuiz()
    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            if (quizData.length > 0 && !confirm) {
                setConfirm(true)
                e.preventDefault()
                // return true
            }

        })

        return unsubscribe
    }, [navigation, quizData, confirm])


    useEffect(() => {
        if (submitPress) {
            router.replace('/home/quiz/result');
        }
    }, [submitPress, router]);


    const shuffleOptions = useCallback(async (quizData) => {
        const shuffledQuizData = quizData.map((question) => {
            const options = [question.option1, question.option2, question.option3, question.correctAnswer];
            options.sort(() => Math.random() - 0.5);
            return { ...question, options };
        });
        return shuffledQuizData;
    }, [])


    // confirm modal handlers 
    const confirmBack = () => {
        setConfirm(false)
        router.back()
    }

    const cancelBack = () => {
        setConfirm(false)
    }


    // pre , next , submit button handlers 
    const handleAnswerSelect = (answer) => {
        const ansArr = [...selectedAnswer]
        ansArr[currentQuestion] = answer
        setSelectedAnswer(ansArr);
    };


    const moveToNextQuestion = () => {
        if (currentQuestion < quizData?.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            // setSelectedAnswer('');
        } if (currentQuestion === quizData?.length - 1) {
            //do submit the quiz
            console.log('called plus')

        }
    };

    const moveToPreviousQuestion = () => {
        if (currentQuestion > 0 && currentQuestion <= quizData?.length - 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    }


    //submit the quiz
    const submitQuiz = () => {
        let myscore = 0
        let notAttemptQuestion = 0

        quizData.forEach((question, index) => {
            if (selectedAnswer[index] === question.correctAnswer) {
                myscore++
            } else if (selectedAnswer[index] === null) {
                notAttemptQuestion++
            }
        })

        let resultObj = {
            totalQuestion: quizData.length,
            correct: myscore,
            wrong: quizData.length - notAttemptQuestion - myscore,
            completation: (quizData.length - notAttemptQuestion) * 100 / quizData.length,
            difficultyLevel: difficulty,
            subCategoryId: id
        }

        dispatch(setResult(resultObj))
        setSubmitQuiz(true)
    }

    // when give time got end
    const timesUpHandler = () => {
        dispatch(setToast({
            message: 'Times up !!!',
            type: 'error',
            showToast: true
        }))
        submitQuiz()
    }


    if (!internetConnection) {
        return <NetworkInfo />;
    }

    if (status === STATUSES.LOADING) {
        return <Loader />
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            <View style={styles.imgcontainer}>
                <Image
                    source={require('../../../assets/quiz1.png')}
                    style={{
                        height: scale(180), width: scale(250),
                        overflow: 'visible',
                    }}
                />
            </View>

            {
                quizData?.length > 0 ? <View style={styles.main_container}>

                    <TimerSlide
                        totalTimeInSecond={quizData.length * 60}
                        containerWidth={200}
                        onTimerEnd={() => timesUpHandler()}
                    />

                    <View style={styles.qesNumContainer}>
                        <Text style={styles.qesNum}>
                            Que - <Text style={{ color: '#8D7BF6' }}>
                                {currentQuestion + 1}
                            </Text><Text>/{quizData.length}</Text>
                        </Text>
                    </View>


                    <View style={styles.ques_container}>
                        <Text style={styles.question}>{quizData[currentQuestion]?.description}</Text>

                        <View style={styles.answersList}>
                            {
                                quizData[currentQuestion]?.options?.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleAnswerSelect(item)}
                                        style={[styles.options, selectedAnswer[currentQuestion] === item ? styles.active : null]}
                                    >
                                        <Text style={styles.optionText} >{item}</Text>
                                    </TouchableOpacity>
                                )
                                )
                            }
                        </View>
                    </View>

                    <View style={styles.btncontainer}>
                        {
                            currentQuestion !== 0 && <Button
                                title={'pre'}
                                onPress={() => moveToPreviousQuestion()}
                                borderRadius={8}
                                height={scale(26)}
                                width={scale(80)}
                                borderColor={'gray'}
                                borderWidth={1}
                                backgroundColor={'transparent'}
                                color={COLORS.darkBlue}
                                fontWeight={'500'}
                            />
                        }
                        {
                            currentQuestion === quizData?.length - 1
                                ?
                                <Button
                                    title={'submit'}
                                    onPress={() => submitQuiz()}
                                    borderRadius={10}
                                    height={scale(26)}
                                    width={scale(80)}
                                    borderColor={'gray'}
                                    borderWidth={1}
                                    backgroundColor={'transparent'}
                                    color={COLORS.darkBlue}
                                    fontWeight={'500'}
                                />
                                :
                                <Button
                                    title={'next'}
                                    onPress={() => moveToNextQuestion()}
                                    borderRadius={10}
                                    height={scale(26)}
                                    width={scale(80)}
                                    borderColor={'gray'}
                                    borderWidth={1}
                                    backgroundColor={'transparent'}
                                    color={COLORS.darkBlue}
                                    fontWeight={'500'}
                                />
                        }

                    </View>
                </View>
                    :
                    <NoQuestion />
            }

            {/* confirm box for logout  */}
            <ConfirmBox
                visible={confirm}
                title='Leave Quiz'
                message='sure you want to Quit Quiz?'
                onConfirm={confirmBack}
                onCancel={cancelBack}
            />

        </ScrollView>

    )
}

export default Quiz


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddffc'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: verticalScale(12),
        marginTop: verticalScale(20),
        paddingHorizontal: scale(10)
    },
    imgcontainer: {
        paddingTop: verticalScale(6),
        alignItems: 'center',
        height: verticalScale(180),
        marginTop: verticalScale(20),
    },
    main_container: {
        margin: scale(20),
        backgroundColor: COLORS.light,
        alignItems: 'center',
        borderRadius: 10,
        padding: scale(20)
    },
    qesNumContainer: {
        marginVertical: scale(6),
    },
    qesNum: {
        fontSize: scale(15),
        fontWeight: '600'
    },
    ques_container: {
        paddingVertical: scale(10),
        paddingHorizontal: scale(10),
        width: scale(250),
    },
    question: {
        fontSize: scale(18),
        fontWeight: '500',
        paddingBottom: scale(20),
    },
    answersList: {

    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: scale(5),
        alignItems: 'center',
        width: '100%',
    },
    options: {
        marginVertical: scale(4),
        paddingVertical: scale(10),
        borderRadius: 5,
        borderColor: '#222',
        borderWidth: 0.05,

    },
    active: {
        backgroundColor: '#dddffc'
    },
    optionText: {
        paddingHorizontal: scale(10),
        fontSize: 15,
        height: scale(20),
    }
})