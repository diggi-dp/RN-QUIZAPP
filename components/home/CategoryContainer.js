import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'
import { useState } from 'react'
import SubCategoryCard from './SubCategoryCard'
import DiffModal from './DiffModal'
import { useRouter } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../../redux/slices/toastSlice'
import { setSelectedSubCategory, setSelectedDifficultyLevel } from '../../redux/slices/userSlice'


const CategoryContainer = ({ category, diffModal, setDiffModal }) => {


    const router = useRouter()
    const { selectedDifficultyLevel, selectedSubCategory } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleCardPress = (item) => {
        setDiffModal(true)
        dispatch(setSelectedSubCategory(item.id))
    }

    const modalcloser = () => {
        dispatch(setSelectedDifficultyLevel(''))
        setDiffModal(false)
    }

    const handleOnNext = () => {
        if (selectedDifficultyLevel === '') {
            dispatch(setToast({
                message: 'please select difficulty level',
                type: 'warn',
                showToast: true
            }))
        }

        if (selectedSubCategory !== null && selectedDifficultyLevel !== '') {
            setDiffModal(false)
            router.push({
                pathname: `/home/quiz/${selectedSubCategory}`,
                params: {
                    difficulty: selectedDifficultyLevel
                }
            })
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>

                <Text style={styles.headerTitle}>{category?.name}</Text>

                <TouchableOpacity >
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardsContainer}>
                {
                    category.SubCategories.length > 0 &&
                    <FlatList
                        data={category?.SubCategories}
                        keyExtractor={item => item?.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            columnGap: scale(12),
                            paddingHorizontal: scale(16)
                        }}
                        renderItem={({ item }) => {
                            return <SubCategoryCard
                                item={item}
                                selectedSubCategory={selectedSubCategory}
                                handleOnPress={handleCardPress}
                            />
                        }
                        }
                    />
                }

            </View>

            <DiffModal
                visible={diffModal}
                onCancel={modalcloser}
                selectedOption={selectedDifficultyLevel}
                setSelectedOption={(value) => dispatch(setSelectedDifficultyLevel(value))}
                onNext={handleOnNext}
            />

        </View>
    )
}

export default CategoryContainer


const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingVertical: 12,
        backgroundColor: '#DDE6ED',
        marginHorizontal: 0,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(16),
    },
    headerTitle: {
        fontSize: scale(17),
        color: COLORS.darkBlue,
    },
    headerBtn: {
        fontSize: scale(12),
        color: 'black',
    },
    cardsContainer: {
        marginTop: 10,
        paddingHorizontal: scale(0)
    },
    categoryCard: {
        flex: 0.5,
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: verticalScale(20),
    },
    cardImage: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: scale(16),
    },
    imageOverlay: {
        borderRadius: 12,
        opacity: 1,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFFFFF',
    },
})