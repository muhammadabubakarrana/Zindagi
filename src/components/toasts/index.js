const {default: Toast} = require('react-native-root-toast');
const {colors, appStyles} = require('../../services');

export const Success = text => {
  Toast.show(text ? text : 'Toast Message', {
    backgroundColor: colors.black, //colors.black
    textColor: 'white',
    textStyle: [appStyles.h6], //[appStyles.h6]
    duration: 3500,
    shadow: true,
    shadowColor: colors.appBgColor1,
  });
};
export const Error = text => {
  Toast.show(text ? text : 'Toast Message', {
    backgroundColor: 'white', //colors.appColor2
    textColor: colors.error,
    textStyle: [appStyles.h6], //[appStyles.h6]
    duration: 6000,
    shadow: false,
    // shadowColor: colors.appBgColor1
  });
};
