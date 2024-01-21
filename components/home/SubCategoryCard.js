import React from 'react'
import { Text, TouchableOpacity, Image, View, StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/theme';

const SubCategoryCard = ({ item, selectedSubCategory, handleOnPress }) => {
  
    return (
        <TouchableOpacity
            style={styles.container(selectedSubCategory, item)}
            onPress={() => handleOnPress(item)}
        >
            <View style={styles.cardItemContainer}>
                <View
                    style={styles.imgContainer(selectedSubCategory, item)}
                >
                    <Image
                        source={{ uri: item?.image }}
                        style={styles.img}
                        resizeMode='contain'
                        alt='image'
                    />
                </View>

                <Text style={styles.name(selectedSubCategory, item)} > {item?.name}</Text>

            </View>


        </TouchableOpacity>
    )
}

export default SubCategoryCard



const styles = StyleSheet.create({
    container: (selectedSubCategory, item) => ({
        width: scale(155),
        height: verticalScale(206),
        backgroundColor: selectedSubCategory === item?.id ? COLORS.darkBlue : "#FFF",
        borderRadius: 12,
        justifyContent: "space-between",
        shadowColor: COLORS.white,
    }),
    cardItemContainer: {
        margin: 4,
        borderRadius: 12,
    },
    imgContainer: (selectedSubCategory, item) => ({
        backgroundColor: selectedSubCategory === item?.id ? "#FFF" : COLORS.grey,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    }),
    img: {
        width: '100%',
        height: '84%',
        aspectRatio: 1/1,
    },
    name: (selectedSubCategory, item) => ({
        fontSize: scale(16),
        color: selectedSubCategory === item?.id ? COLORS.white : COLORS.darkBlue,
        fontWeight: '500',
        marginTop: 12 / 1.5,
        alignSelf: 'center'
    })
});