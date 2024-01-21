import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react'
import { checkLoginUser } from '../utils/services/auth.Service';
import NetworkInfo from '../components/common/NetworkInfo';
import { useSelector } from 'react-redux';



const index = () => {
  const [auth, setAuth] = useState('')


  const { internetConnection } = useSelector(state => state.auth)

  useEffect(() => {

    const getToken = async () => {
      try {
        const status = await checkLoginUser()
        if (status) {
          setAuth('authenticated')
        }
        setAuth(status)

      } catch (error) {
        console.log({ 'error1': error.message })
        setAuth('not_authenticated')
      }
    }

    getToken()

  }, [])


  // useFocusEffect(
  //   useCallback(() => {
  //     const checkConnectivity = async () => {
  //       const state = await NetInfo.fetch();
  //       console.log('mount', state.isConnected)

  //       setIsConnected(state.isConnected);
  //     };

  //     checkConnectivity();

  //     const unsubscribe = NetInfo.addEventListener((state) => {
  //       setIsConnected(state.isConnected);
  //     });

  //     return () => {
  //       console.log('unmount')
  //       unsubscribe();
  //     };
  //   }, [])
  // );

  // const handleRefresh = async () => {
  //   const state = await NetInfo.fetch();
  //   console.log(state.isConnected)
  //   setIsConnected(state.isConnected);
  // };


  if (!internetConnection) {
    return <NetworkInfo />;
  }
  if (auth === 'authenticated') {
    return <Redirect href='/home' />
  }
  else if (auth === 'not_authenticated') {
    return <Redirect href='/login' />
  }
  return null
}

export default index



