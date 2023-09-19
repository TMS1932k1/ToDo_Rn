export const regexEmail = (email: string): boolean => {
  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  const isEmail = regexp.test(email);
  //console.log('isEmail: ' + isEmail);
  return isEmail;
};

export const regexPassword = (password: string): boolean => {
  const regexp = new RegExp(/^.*([\d]){10}$/m);
  const isPassword = regexp.test(password);
  //console.log('isPassword: ' + isPassword);
  return isPassword;
};
