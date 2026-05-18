import React from "react";
import { Composition } from "remotion";
import { PromoVideo, promoVideoSchema } from "./compositions/PromoVideo";
import { ProductSpotlight, productSpotlightSchema } from "./compositions/ProductSpotlight";

export const Root: React.FC = () => {
  return (
    <>
      {/* 15-second promo reel — 1080×1920 (vertical/Reels) */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        schema={promoVideoSchema}
        defaultProps={{
          productName: "Kit Distribution Gates K015574XS",
          price: "7 830 DZD",
          oldPrice: "8 900 DZD",
          category: "Distribution & Courroie",
          tagline: "Livraison Cash à la Livraison — 48 wilayas",
          accentColor: "#ff6b00",
        }}
      />

      {/* 10-second product spotlight — 1080×1080 (square/Instagram) */}
      <Composition
        id="ProductSpotlight"
        component={ProductSpotlight}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1080}
        schema={productSpotlightSchema}
        defaultProps={{
          productName: "Plaquettes Brembo P61040N",
          price: "3 480 DZD",
          brand: "Brembo",
          category: "Freinage",
        }}
      />
    </>
  );
};
