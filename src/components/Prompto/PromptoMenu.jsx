import React, { useEffect, useState } from "react";
import { curve} from "../../assets";
import Section from ".././Section";
import Button from ".././Button";


const PromptoMenu = () => {

    return (

        <Section
        className="pt-[12rem] -mt-[5.25rem]"
        crosses
        crossesOffset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <div className="container relative">
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
          <span className="inline-block relative">
                        $PROMPTO{" "}
                        <img
                          src={curve}
                          className="absolute top-full left-0 w-full xl:-mt-2"
                          width={624}
                          height={28}
                          alt="Curve"
                        />
                      </span>
                      </h1>
                      <br></br>
          <div className="flex flex-wrap justify-center gap-4">
          <a
              href="/prompto/daily"
              className="inline-block px-6 py-3 bg-color-1 text-n-1 font-semibold text-sm rounded-md shadow-md hover:bg-color-2 transition-colors"
            >
             HOW TO PLAY
            </a>
            {/* Updated "Play Now" button with "Get in Touch" design */}
            <a
              href="/prompto/daily"
              className="inline-block px-6 py-3 bg-color-5 text-n-1 font-semibold text-sm rounded-md shadow-md hover:bg-color-3 transition-colors"
            >
              PLAY NOW
            </a>
            <a
              href="/prompto/daily"
              className="inline-block px-6 py-3 bg-color-1 text-n-1 font-semibold text-sm rounded-md shadow-md hover:bg-color-2 transition-colors"
            >
              CONNECT WALLET
            </a>
          </div>
        </div>
        </div>
        </Section>
    );
};

export default PromptoMenu;