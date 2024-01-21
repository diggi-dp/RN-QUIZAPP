import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from './Icon';




const Dropdown = ({ optionData, placeHolder, selectedOption, setSelectedOption }) => {

    const [data, setData] = useState(optionData);

    const [clicked, setClicked] = useState(false);

    const [search, setSearch] = useState('');


    const searchRef = useRef();

    const onSearch = search => {
        if (search !== '') {
            let tempData = data.filter(item => {
                return item.value.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(optionData);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                }}
                onPress={() => {
                    setClicked(!clicked);
                }}>

                <Text style={{ fontWeight: '600' }}>
                    {selectedOption == '' ? `${placeHolder ? placeHolder : 'Select'}` : selectedOption}
                </Text>

                {
                    clicked ? (
                        <Icon
                            family={'AntDesign'}
                            iconName={'down'}
                            style={{ width: 20, height: 20 }}
                        />
                    ) : (
                        <Icon
                            family={'AntDesign'}
                            iconName={'up'}
                            style={{ width: 20, height: 20 }}
                        />
                    )
                }

            </TouchableOpacity>


            {
                clicked ? (
                    <View
                        style={{
                            elevation: 10,
                            marginTop: 10,
                            height: 200,
                            alignSelf: 'center',
                            width: '90%',
                            backgroundColor: '#fff',
                            borderRadius: 10,
                        }}>
                        <TextInput
                            placeholder="Search.."
                            value={search}
                            ref={searchRef}
                            onChangeText={txt => {
                                onSearch(txt);
                                setSearch(txt);
                            }}
                            style={{
                                width: '90%',
                                height: 50,
                                alignSelf: 'center',
                                borderWidth: 0.2,
                                borderColor: '#8e8e8e',
                                borderRadius: 7,
                                marginTop: 5,
                                paddingLeft: 20,
                            }}
                        />

                        <FlatList
                            style={{ height: '100%' }}
                            data={data}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        style={{
                                            width: '85%',
                                            alignSelf: 'center',
                                            height: 50,
                                            justifyContent: 'center',
                                            borderBottomWidth: 0.5,
                                            borderColor: '#8e8e8e',
                                        }}
                                        onPress={() => {
                                            setSelectedOption(item.value);
                                            setClicked(!clicked);
                                            onSearch('');
                                            setSearch('');
                                        }}>
                                        <Text style={{ fontWeight: '600' }}>{item.label}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                    </View>
                )
                    :
                    null
            }


        </View>
    );
};

export default Dropdown;