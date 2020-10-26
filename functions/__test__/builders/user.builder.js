const aUser = (id) => {
  const userBase = {
    uid: id,
    displayName: "Irrelevant",
    email: "irrelevant@mail.com",
    photoURL: "irrelevant-avatar.jpg",
    providerData: [
      {
        displayName: null,
        uid: null,
      },
    ],
  };
  return {
    withNameFromProvider(name) {
      userBase.providerData[0].displayName = name;
      return this;
    },
    withProviderId(id) {
      userBase.providerData[0].uid = id;
      return this;
    },
    build() {
      return userBase;
    },
  };
};

exports.aUser = aUser;
