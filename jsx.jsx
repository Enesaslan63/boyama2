import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

/**
 * 1. KURT DOLGU KATMANI: 
 * Bu katman en altta durur ve sadece kurdun iç alanını boyar.
 * Varsayılan olarak şeffaftır.
 */
const KartalDolgu = ({ renk = "transparent" }) => (
  <G>
    
  </G>
);

/**
 * 2. KARTAL SİYAH ÇİZGİLER: 
 * Üstte duran detaylar. Fill her zaman siyahtır.
 */
export const KartalSiyahCizgiler = () => (
  <G fill="black">
    
    
  </G>
);

// ANA BİLEŞEN
const SvgComponent = ({ boyaRengi = "transparent", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={1365.333}
    height={1365.333}
    viewBox="0 0 1024 1024"
    {...props}
  >
    {/* Alt Katman: Boyanabilir alan */}
    <KartalDolgu renk={boyaRengi} />

    {/* Üst Katman: Sabit siyah çizgiler */}
    <KartalSiyahCizgiler />
  </Svg>
);

export default SvgComponent;