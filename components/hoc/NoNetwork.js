import React, { useEffect, useState } from 'react';
import NetworkInfo from '../common/NetworkInfo';
import { checkInternetConnectivity } from '../../utils/axios';


const withOfflineScreen = (WrappedComponent) => {
    const WithOfflineScreen = (props) => {
        const [isConnected, setIsConnected] = useState(true);
        useEffect(() => {
            const checkConnectivity = async () => {
                const isConnected = await checkInternetConnectivity();
                setIsConnected(isConnected);
            };

            checkConnectivity();
        }, []);

        const handleRefresh = async () => {
            const isConnected = await checkInternetConnectivity();
            setIsConnected(isConnected);
        };

        console.log('status',isConnected)
        if (!isConnected) {
            ocnsole.log('call')
            return <NetworkInfo onRefresh={handleRefresh} />;
        }

        return <WrappedComponent {...props} />;
    };

    return WithOfflineScreen;
};

export default withOfflineScreen;
