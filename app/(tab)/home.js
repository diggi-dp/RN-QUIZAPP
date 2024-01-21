import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import {
    View,
    StyleSheet,
} from 'react-native';
import { COLORS } from '../../constants/theme';
import { scale, verticalScale } from 'react-native-size-matters'
import { GETCATEGORY } from '../../utils/axios';
import { useEffect } from 'react';
import Welcome from '../../components/home/Welcome';
import CategoryContainer from '../../components/home/CategoryContainer';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus } from '../../redux/slices/profileSlice';
import { STATUSES } from '../../constants/enum';
import Loader from '../../components/common/Loader'
import NetworkInfo from '../../components/common/NetworkInfo';
import { setCategoryData, setUserLocation } from '../../redux/slices/userSlice';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location'
import Icon from '../../components/common/Icon';


const HomeScreen = () => {
    const [diffModal, setDiffModal] = useState(false)

    const router = useRouter()

    const { status: loaingStatus } = useSelector(state => state.profile)
    const { internetConnection } = useSelector(state => state.auth)
    const { categoryData, userLocation } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const fetchCategoryData = async () => {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await GETCATEGORY()
            dispatch(setCategoryData(res.data))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            // console.log('error', error.response)
            console.log('error', error)
        }
    }


    const getUserLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })

        dispatch(setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.077,
            longitudeDelta: 0.0421
        }))
    }



    useEffect(() => {
        getUserLocation()
        if (categoryData.length === 0) {
            fetchCategoryData()
        }
    }, [])

    const diffModalSetter = (bool) => {
        setDiffModal(bool)
    }

    if (!internetConnection) {
        return <NetworkInfo />
    }

    if (loaingStatus === STATUSES.LOADING) {
        return <Loader />
    }


    return (
        <>
            <View
                style={{ borderWidth: 1, borderColor: COLORS.grey, marginTop: 25, paddingHorizontal: 10, paddingVertical: 12, flexDirection: 'row', borderRadius: 10, alignItems: 'center' }}
            >
                <Icon family={'Ionicons'} iconName={'md-location-sharp'} size={28} color={'#e45050'} />
                <TouchableOpacity onPress={() => router.push('/home/map')} style={{ marginLeft: 10, flexDirection: 'row', width: '85%' }}>
                    <Text style={{ fontWeight: '500', marginHorizontal:5 }}>Latitude : {userLocation.latitude}</Text>
                    <Text style={{ fontWeight: '500', marginHorizontal:5}}>Longitude : {userLocation.longitude}</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >

                <Welcome setDiffModal={diffModalSetter} />

                {
                    categoryData.length > 0 &&
                    categoryData.filter(item => !item.is_deleted).map(category => (
                        <View key={category.id} style={{ zIndex: -1 }}>
                            <CategoryContainer
                                category={category}
                                diffModal={diffModal}
                                setDiffModal={diffModalSetter}
                            />
                        </View>
                    ))
                }

            </ScrollView>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light,
    },
    headerContainer: {
        marginTop: verticalScale(40),
        marginBottom: verticalScale(20),
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
        marginBottom: verticalScale(20),
        color: '#333333',
    },
    categoryList: {
        justifyContent: 'space-between',
        gap: 8
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
});

export default HomeScreen;
