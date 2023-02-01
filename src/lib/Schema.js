export const Schema__Form__MetaDataGenerator = {
  fields: [
    {
      label: "URLs",
      name: "urls",
      type: "text",
      element: `textarea`,
      placeholder: `Enter URLs to generate meta data for, one per line`,
      validations: {
        required: {
          value: true,
          message: `Enter URLs to generate meta data for. One per line`,
        },
        pattern: {
          value: ``,
          message: `Must be only valid URLs`,
        },
      },
    },
    {
      label: "Meta Title Suffix",
      name: "metaTitleSuffix",
      type: "text",
      element: `input`,
      placeholder: `Add a suffix which appends at the end of the meta title (leave empty to auto generate)`,
      // validations: {
      //   required: {
      //     value: true,
      //     message: `Enter URLs to generate meta data for. One per line`,
      //   },
      //   pattern: {
      //     value: ``,
      //     message: `Must be only valid URLs`,
      //   },
      // },
    },
  ],
  button: {
    title: `Generate Meta Data`,
    type: `submit`,
    variant: `primary`,
    className: ``,
  },
};

export const Schema__Form__Login = {
  fields: [
    {
      label: "Email address",
      name: "email",
      type: "email",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Email address is required`,
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: `Please enter a valid email address`,
        },
      },
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      element: `input`,
      validations: {
        required: {
          value: true,
          message: `Password is required`,
        },
        minLength: {
          value: 10,
          message: `Must be at least 10 characters`,
        },
      },
    },
  ],
  button: {
    title: `Log in`,
    type: `submit`,
    variant: `primary`,
    className: `w-100`,
  },
};

export const Schema__Generic_Variables = {
  loginSuccessUrl: "/onboardings",
  homeUrl: "/onboardings",
  domain: "https://clients-oneims.netlify.app",
};
