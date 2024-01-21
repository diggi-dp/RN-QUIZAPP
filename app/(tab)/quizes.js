import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from '../../components/common/Icon'
import { COLORS } from '../../constants/theme'
import { scale } from 'react-native-size-matters'
import { useRouter } from 'expo-router'

const Quizes = () => {

    const router = useRouter()
    const { result } = useSelector(state => state.user)

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                    <Icon family={'Ionicons'} iconName="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={styles.editButtonText}>Recently played quizes</Text>

            <ScrollView style={styles.container}>
                {
                    result.length > 0 ?
                        [...result].reverse().map((item, index) => {
                            return (
                                <View key={index} style={styles.box}>
                                    <View style={styles.content_container}>

                                        <Image
                                            source={require('../../assets/app_logo.png')}
                                            resizeMode='contain'
                                            style={{ width: scale(80), height: scale(80) }}
                                        />

                                        <View style={styles.text_wrapper}>
                                            <Text style={{ fontSize: 22, fontWeight: '500', color: COLORS.darkBlue }}>
                                                subCategory : {item.subCategoryId}
                                            </Text>
                                            <Text style={{ color: COLORS.grey }}>
                                                difficuly : {item.difficultyLevel}
                                            </Text>
                                            <Text style={{ color: COLORS.grey }}>
                                                correct : {item.correct}
                                            </Text>
                                            <Text style={{ color: COLORS.grey }}>
                                                wrong : {item.wrong}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            )
                        })

                        :
                        <View>
                            <Text>There is no Quizes</Text>
                        </View>
                }
            </ScrollView>
        </>

    )
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        marginTop: scale(20),
        backgroundColor: COLORS.light
    },
    backButton: {
        alignSelf: 'center'
    },
    editButton: {
        padding: scale(8),
    },
    editButtonText: {
        fontSize: scale(12),
        fontWeight: 'bold',
        color: COLORS.grey,
        paddingHorizontal: 20,
        marginTop: 20
    },
    box: {
        flex: 1,
        height: scale(100),
        borderWidth: 1,
        borderColor: COLORS.blue,
        marginTop: 20
    },
    content_container: {
        height: scale(80),
        marginHorizontal: 16,
        marginVertical: 11,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    text_wrapper: {
        flex: 1,
        height: scale(80),
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 20,
    }
})


export default Quizes