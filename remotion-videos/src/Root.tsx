import React from "react";
import { Composition } from "remotion";
import { CountryRanking } from "./compositions/CountryRanking";

export const Root: React.FC = () => {
  return (
    <>
      {/* Top 10 most populated countries — 30 s, 1920×1080 */}
      <Composition
        id="CountryRanking"
        component={CountryRanking}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
