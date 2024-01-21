import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters';
import { Stack, useNavigation, useRouter } from 'expo-router';
import ScoreCircle from '../../../components/quiz/ScoreCircle';
import Icon from '../../../components/common/Icon';
import { COLORS } from '../../../constants/theme';
import { useSelector } from 'react-redux';

const ResultScreen = () => {

    const { result } = useSelector(state => state.user)
    const router = useRouter()
    const navigation = useNavigation()
    const { selectedDifficultyLevel, selectedSubCategory } = useSelector(state => state.user)
    let finalResult = result[result.length - 1]

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={{ backgroundColor: COLORS.light, flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={require('../../../assets/quizbgimg.png')}
                            resizeMode='cover'
                            style={{ width: scale(200), height: scale(200), borderRadius: scale(200 / 2) }}
                        />
                        <View style={styles.img_text_wrapper}>
                            <Text style={styles.img_text}>
                                your score
                            </Text>
                            <Text style={styles.img_text_score}>{finalResult.correct} pt</Text>
                        </View>

                        <View style={styles.circle_wrapper}>
                            <ScoreCircle
                                data={`${finalResult.completation}%`}
                                name={'Completation'}
                                outerViewstyle={{
                                    bottom: -scale(12),
                                    left: scale(6)
                                }}
                            />
                            <ScoreCircle
                                data={finalResult.totalQuestion}
                                name={'Total question'}
                                outerViewstyle={{
                                    bottom: -scale(40),
                                    left: scale(0)
                                }}
                            />
                            <ScoreCircle
                                data={finalResult.correct}
                                name={'Correct'}
                                outerViewstyle={{
                                    bottom: -scale(40),
                                    left: scale(0)
                                }}
                            />
                            <ScoreCircle
                                data={finalResult.wrong}
                                name={'Wrong'}
                                outerViewstyle={{
                                    bottom: -scale(12),
                                    right: scale(6)
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.box_wrapper}>
                    <ScoreCircle
                        data={<Icon family={'AntDesign'} iconName={'home'} size={30} color={'white'} />}
                        name={'Home'}
                        outerViewstyle={{ marginBottom: 20 }}
                        innerViewStyle={{
                            borderRadius: 16,
                            padding: 10,
                            backgroundColor: '#2AAD7A',
                        }}
                        onPress={() => navigation.navigate("home")}

                    />

                    <ScoreCircle
                        data={<Icon family={'AntDesign'} iconName={'user'} size={30} color={'white'} />}
                        name={'Profile'}
                        outerViewstyle={{ marginBottom: 20 }}
                        innerViewStyle={{
                            borderRadius: 16,
                            padding: 10,
                            backgroundColor: '#6757C9',
                        }}
                        onPress={() => navigation.navigate("profile")}

                    />

                    <ScoreCircle
                        data={<Icon family={'AntDesign'} iconName={'sharealt'} size={30} color={'white'} />}
                        name={'Share Score'}
                        outerViewstyle={{ marginBottom: 20 }}
                        innerViewStyle={{
                            borderRadius: 16,
                            backgroundColor: '#CC7CE3',
                            padding: 10
                        }}
                    />

                    <ScoreCircle
                        data={<Icon family={'AntDesign'} iconName={'reload1'} size={30} color={'white'} />}
                        name={'Play Again'}
                        outerViewstyle={{ marginBottom: 20 }}
                        innerViewStyle={{
                            borderRadius: 16,
                            backgroundColor: '#424D9C',
                            padding: 10
                        }}
                        onPress={() => {
                            router.replace({
                                pathname: `/home/quiz/${selectedSubCategory}`,
                                params: {
                                    difficulty: selectedDifficultyLevel
                                }
                            })
                        }}
                    />


                </View>
            </View>
        </>
    )
}

export default ResultScreen;

const styles = StyleSheet.create({
    container: {
        height: scale(350),
        backgroundColor: COLORS.light,
        position: "relative",
    },
    imgContainer: {
        height: scale(320),
        // width: "100%",
        backgroundColor: '#dddffc',
        borderBottomLeftRadius: scale(300),
        borderBottomRightRadius: scale(300),
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        left: -scale(100),
        right: -scale(100),

    },
    img_text_wrapper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -scale(34) }, { translateY: -scale(28) }],
    },
    img_text: {
        fontSize: 18,
        color: COLORS.light,
        fontWeight: '500'
    },
    img_text_score: {
        fontSize: 24,
        color: COLORS.light,
        fontWeight: '800',
        alignSelf: 'center'
    },
    circle_wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
        bottom: 0
    },
    box_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginVertical: 40,
        padding: 35
    }
})