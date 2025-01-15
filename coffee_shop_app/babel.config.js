module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel", // Required for expo-router
      "nativewind/babel",  // Only if you're using NativeWind (Tailwind CSS)
    ],
  };
};


// module.exports = function (api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo'],
//       plugins: ["nativewind/babel"]
//     };
//   };
  