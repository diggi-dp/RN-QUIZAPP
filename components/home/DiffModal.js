import { View, Text, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { scale } from 'react-native-size-matters'
import Dropdown from '../common/SelectDropdown'
import Button from '../common/Button'
import Toast from '../common/Toast'

const DiffModal = ({ visible, onCancel, selectedOption, setSelectedOption, onNext }) => {


    const options = [
        { label: 'Easy', value: 'Easy' },
        { label: 'Medium', value: 'Medium' },
        { label: 'Hard', value: 'Hard' },
    ];


    return (
        <Modal
            visible={visible}
            transparent={false}
            animationType='fade'
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel} >
                <View style={styles.mainContainer}>

                    <TouchableWithoutFeedback >
                        <View style={styles.container}>

                            <Text style={styles.header}>
                                Choose Difficulty Level
                            </Text>

                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    optionData={options}
                                    placeHolder={'select level'}
                                    selectedOption={selectedOption}
                                    setSelectedOption={setSelectedOption}
                                />
                            </View>

                            <View style={styles.btncontainer}>
                                <Button
                                    title='cancel'
                                    onPress={onCancel}
                                    backgroundColor='red'
                                    borderRadius={10}
                                    height={40}
                                    width={120}
                                />

                                <Button
                                    title='next'
                                    borderRadius={10}
                                    height={40}
                                    width={120}
                                    onPress={onNext}
                                />
                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                    <Toast />
                </View>
            </TouchableWithoutFeedback >
        </Modal >

    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '100%',
        backgroundColor: COLORS.light,
    },
    header: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        marginVertical: scale(16)
    },
    btncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: scale(16),
        width: '100%',
        paddingBottom: scale(16),
        position: 'relative',
        zIndex: -10,
    },
    dropdownContainer: {
        height: 230
    },
    btnwrapper: {
        width: '30%',
        margin: 0,
        padding: 0,
        height: 50
    },
})


export default DiffModal