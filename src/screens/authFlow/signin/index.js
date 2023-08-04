import React, {Component, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {totalSize} from 'react-native-dimension';
import {
  Logos,
  Toasts,
  Icons,
  TextInputs,
  Buttons,
  ScrollViews,
  Wrapper,
  Spacer,
  MyLoader,
} from '../../../components';
import {
  appStyles,
  colors,
  fontFamily,
  fontSize,
  loginSchema,
  routes,
  sizes,
} from '../../../services';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';

function Signin(props) {
  const [showLoader, setShowLoader] = useState(false);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const {navigate} = props.navigation;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });

  const submitHandler = async ({email, password}) => {
    try {
      setShowLoader(true);
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      const res = await firestore().collection('users').doc(user.uid).get();
      if (res.exists) {
        setShowLoader(false);
        navigate(routes.app);
        Toasts.Success('Signed In');
        console.log('Valid');
      }
    } catch (myError) {
      setShowLoader(false);
      if (myError.code === 'auth/wrong-password') {
        Toasts.Error('Wrong Password');
      } else if (myError.code === 'auth/invalid-email') {
        Toasts.Error('invalid-email');
      } else if (myError.code === 'auth/user-not-found') {
        Toasts.Error('Email not Found');
      } else {
        Toasts.Error('Invalid credentials');
        console.log(myError);
      }
    }
  };

  return (
    <>
      <Wrapper isMain style={[{}]}>
        <ScrollViews.KeyboardAvoiding>
          <Spacer isBasic />
          <Wrapper animation={'zoomInUp'} alignItemsCenter>
            <Logos.Primary size={totalSize(10)} />
            <Spacer isDoubleBase />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper marginHorizontalBase>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInputs.Underlined
                  // title={'Enter your Email'}
                  // titleStyle={{ marginBottom: 35}}
                  value={value}
                  iconNameRight={'at-sign'}
                  iconTypeRight={'feather'}
                  iconColorRight={colors.appColor9}
                  onChangeText={onChange}
                  placeholder="Email"
                  iconName="email"
                />
              )}
              name="email"
            />
            <Wrapper alignItemsCenter>
              {errors.email && (
                <Text style={{color: 'red'}} isBasic>
                  {errors.email.message}
                </Text>
              )}
            </Wrapper>
            <Spacer isBasic />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInputs.Underlined
                  // titleStyle={{...appStyles.h6, ...appStyles.fontMedium}}
                  // title={'Password'}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  iconName="lock"
                  iconNameRight={isPasswordVisible ? 'eye' : 'eye-off'}
                  iconTypeRight={'feather'}
                  iconColorRight={
                    isPasswordVisible ? colors.appColor9 : colors.appColor9
                  }
                  secureTextEntry={!isPasswordVisible}
                  onPressIconRight={() =>
                    setPasswordVisibility(!isPasswordVisible)
                  }
                  invertColors
                />
              )}
              name="password"
            />
            <Wrapper marginHorizontalLarge alignItemsFlexStart>
              {errors.password && (
                <Text style={{color: 'red'}} isBasic>
                  {errors.password.message}
                </Text>
              )}
            </Wrapper>
            <Spacer isDoubleBase />
            <Buttons.Colored
              text="Sign In"
              iconName="login"
              iconType="material-community"
              onPress={handleSubmit(submitHandler)}
            />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Icons.WithText
              textStyle={appStyles.h6}
              iconSize={sizes.icons.large}
              text="Register Now"
              iconName="arrow-right"
              direction="row-reverse"
              onPress={() => navigate(routes.signup)}
            />
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
      <MyLoader isVisible={showLoader} />
    </>
  );
}

export default Signin;
