import React from 'react'
import ErrorScreen from '../components/common/ErrorScreen'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStatus } from '../redux/slices/profileSlice'
import { STATUSES } from '../constants/enum'

const Error = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setStatus(STATUSES.IDLE))
    }, [])
    return (
        <>
            <ErrorScreen />
        </>
    )
}

export default Error