import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
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
  Pickers,
  MyLoader,
} from '../../../components';
import {
  appIcons,
  appStyles,
  colors,
  registerSchema,
  routes,
} from '../../../services';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import firestore from '@react-native-firebase/firestore';

function Signup(props) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  
  const myData = [
    {label: 'FootBall', value: 'football'},
    {label: 'Baseball', value: 'baseball'},
    {label: 'Cricket', value: 'cricket'},
  ];
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      pickedItem: selectedValue,
    },
    resolver: yupResolver(registerSchema),
  });

  const {navigate} = props.navigation;
  const submitHandler = async ({
    pickedItem,
    firstName,
    email,
    password,
    lastName,
  }) => {
    try {
      setShowLoader(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const res = await firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
        password,
        pickedItem: selectedValue,
      });
      console.log(res);
      navigate(routes.signin);
      setShowLoader(false);
      Toasts.Success('Successfully Loged In');
    } catch (myError) {
      console.log(myError);
    }
  };

  const loadTrue = () => {
    setTimeout(() => {
      navigate(routes.signin);
    }, 1500);
    setShowLoader(true);
  };
  const loadFalse = () => {
    setShowLoader(false);
  };
  return (
    <>
      <Wrapper isMain style={[{}]}>
        <ScrollViews.KeyboardAvoiding>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Logos.Primary size={totalSize(10)} />
            <Spacer isBasic />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper marginHorizontalTiny>
            <Wrapper marginHorizontalBase flexDirectionRow alignItemsCenter>
              <Wrapper flex={1}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInputs.Colored
                      value={value}
                      onChangeText={onChange}
                      placeholder="First Name"
                      iconName="account"
                      iconType="material-community"
                      containerStyle={{marginHorizontal: 0}}
                    />
                  )}
                  name="firstName"
                />
                <Wrapper alignItemsCenter>
                  {errors.firstName && (
                    <Text style={{color: 'red'}} isBasic>
                      {errors.firstName.message}
                    </Text>
                  )}
                </Wrapper>
              </Wrapper>
              <Wrapper flex={0.1} />
              <Wrapper flex={1}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInputs.Colored
                      value={value}
                      onChangeText={onChange}
                      placeholder="Last Name"
                      containerStyle={{marginHorizontal: 0}}
                    />
                  )}
                  name="lastName"
                />
                <Wrapper alignItemsCenter>
                  {errors.firstName && (
                    <Text style={{color: 'red'}} isBasic>
                      {errors.firstName.message}
                    </Text>
                  )}
                </Wrapper>
              </Wrapper>
            </Wrapper>

            <Spacer isBasic />

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInputs.Colored
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email"
                  iconName="email"
                  iconColorRight={colors.appColor9}
                  iconNameRight={'at-sign'}
                  iconTypeRight={'feather'}
                />
              )}
              name="email"
            />
            <Wrapper marginHorizontalLarge alignItemsFlexStart>
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
                <TextInputs.Colored
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  iconColorRight={
                    isPasswordVisible ? colors.appColor9 : colors.appColor9
                  }
                  iconName="lock"
                  secureTextEntry={!isPasswordVisible}
                  iconNameRight={isPasswordVisible ? 'eye' : 'eye-off'}
                  iconTypeRight={'feather'}
                  onPressIconRight={() =>
                    setPasswordVisibility(!isPasswordVisible)
                  }
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
            <Pickers.Primary
              onChange={myItem => setSelectedValue(myItem)}
              containerStyle={{marginTop: 10}}
              placeholder="Select an option"
              data={myData}
            />
            <Spacer isBasic />
            <Buttons.Bordered
              text="Sign Up With Email"
              iconName="account-plus"
              iconType="material-community"
              onPress={handleSubmit(submitHandler)}
            />
            <Spacer isBasic />
            <Buttons.Bordered
              text="Sign Up With Google"
              iconName="google"
              iconType="material-community"
              onPress={loadTrue}
            />
            <Spacer isBasic />
            <Buttons.Bordered
              text="Sign Up With Facebook"
              iconName="facebook"
              iconType="material-community"
              // onPress={submitHandler}
            />
          </Wrapper>
          <Spacer isBasic />
          <Wrapper alignItemsCenter>
            <Icons.WithText
              text="Already have an account, Sign In"
              iconName="arrow-left"
              onPress={() => navigate(routes.signin)}
            />
          </Wrapper>
        </ScrollViews.KeyboardAvoiding>
      </Wrapper>
      <MyLoader isVisible={showLoader} />
    </>
  );
}

export default Signup;
