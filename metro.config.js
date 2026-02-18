const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();
  return {
    transformer: {
      // SVG'yi bileşene dönüştüren sihirli satır:
      babelTransformerPath: require.resolve("react-native-svg-transformer")
    },
    resolver: {
      // SVG'yi asset listesinden çıkarıp kaynak kod (source) listesine ekliyoruz
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"]
    }
  };
})();