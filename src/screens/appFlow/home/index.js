import React, {Component, useEffect, useState} from 'react';
import {FlatList, View, Image, TouchableOpacity} from 'react-native';
import {
  Text,
  Wrapper,
  Toasts,
  MyLoader,
  StatusBars,
  Headers,
} from '../../../components';
import {appStyles, colors, sizes} from '../../../services';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [postData, setpostData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let tempData = [];
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total:', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
          console.log('User ID', documentSnapshot.id, documentSnapshot.data());
        });
        setpostData(tempData);
      });
  };
  // const closeModal = () => {
  //   console.log(showLoader);
  //   setShowLoader(false);
  // };
  return (
    <>
      <StatusBars.Dark />
      <Wrapper style={{marginTop: 50}}>
        <FlatList
          data={postData}
          renderItem={({item}) => (
            // <Wrapper flex={1}>
            <Wrapper
              marginVerticalTiny
              paddingHorizontalBase
              paddingVerticalBase
              background2
              isCardView>
              <Text isMediumTitle isBoldFont>
                {item.email}
              </Text>
              <Wrapper marginHorizontalBase>
                <Text isLarge>{item.firstName}</Text>
                <Text isLarge>{item.lastName}</Text>
                <Text isUnderlined isBoldFont isLarge>
                  {item.password}
                </Text>
              </Wrapper>
            </Wrapper>
          )}
        />
      </Wrapper>
      {/* <Image
                resizeMode="contain"
                source={{uri: item.img}}
                style={{width: 20, height: 20}}
              /> */}
      {/* <Wrapper flex={1} isCenter style={{backgroundColor: 'lightgreen'}}>
        <TouchableOpacity>
          <Text isBoldFont isLargeTitle>
            LogOut
          </Text>
        </TouchableOpacity>
      </Wrapper>
      <MyLoader isVisible={showLoader} /> */}
    </>
  );
}

export default Home;
