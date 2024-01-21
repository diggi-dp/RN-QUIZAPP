import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../../constants/theme'
import { scale, verticalScale } from 'react-native-size-matters'
import Icon from '../common/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedSubCategory } from '../../redux/slices/userSlice'

const Welcome = ({ setDiffModal }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const { userData } = useSelector(state => state.profile)
    const { categoryData } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const onHandlePress = (subCategory) => {
        setSearchTerm('')
        dispatch(setSelectedSubCategory(subCategory.id))
        setDiffModal(true)
    }


    const filterData = () => {
        const filteredArr = []
        if (searchTerm?.length > 0) {
            categoryData?.map(item => {
                if (!item.is_deleted && item.SubCategories?.length > 0) {
                    item.SubCategories.map(el => {
                        if (el.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            filteredArr.push(el)
                        }
                    })
                }
            })
        }
        return filteredArr
    }


    const searchData = filterData()


    return (
        <View style={{ paddingHorizontal: scale(16), position: 'relative' }}>

            <View style={styles.headerContainer}>
                <Text style={styles.greetingText}>
                    Hi, {userData.firstName ? userData.firstName : 'User!'}
                </Text>
            </View>

            <Text style={styles.header}>What do you want to improve?</Text>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={searchTerm}
                        onChangeText={(text) => setSearchTerm(text)}
                        placeholder='search for quiz you want'
                    />

                    <View
                       
                        style={styles.overlay}
                    >
                        {
                            searchTerm && searchData?.length > 0 && (

                                searchData.map(item => (
                                    <View key={item.id} style={{ backgroundColor: COLORS.grey, borderBottomColor: 'white', borderBottomWidth: 1 }}>
                                        <TouchableOpacity
                                            style={styles.filter_wrapper}
                                            onPress={() => onHandlePress(item)}
                                        >
                                            <View style={styles.filter_img_container}>
                                                <Image
                                                    source={{ uri: item?.image }}
                                                    resizeMode='cover'
                                                    alt='image'
                                                    style={{ height: 40, width: 40 }}
                                                />
                                                <Text style={styles.filter_wrapper_text}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            )
                        }
                    </View>

                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={() => { }}>
                    <Icon
                        family='AntDesign'
                        iconName='search1'
                        size={24}
                        color={COLORS.darkBlue}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Welcome


const styles = StyleSheet.create({
    headerContainer: {
        marginTop: verticalScale(10),
        marginBottom: verticalScale(10),
        alignItems: 'center',
    },
    greetingText: {
        fontSize: scale(24),
        fontWeight: 'bold',
        color: '#333333',
    },
    header: {
        fontSize: scale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(8),
        color: '#333333',
    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(5),
        height: scale(50),
    },
    searchWrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: COLORS.light,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        // height: "100%",
    },
    searchInput: {
        width: "100%",
        paddingHorizontal: scale(16),

    },
    searchBtn: {
        width: scale(36),
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: scale(12),
    },
    filter_wrapper: {
        marginTop: 5,
        paddingHorizontal: 20,
    },
    filter_img_container: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    filter_wrapper_text: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.black,
        paddingHorizontal: 10,
        marginLeft: 30
    },
    overlay: {
        position: 'absolute',
        top: 55,
        zIndex: 1,
        height: 100,
        width: '100%',
        overflow:'scroll'
        // backgroundColor:COLORS.light
    }
})