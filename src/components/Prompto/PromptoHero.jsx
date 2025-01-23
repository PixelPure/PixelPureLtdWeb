import {curve, heroBackground} from "../../assets";
import Section from "../Section";



const PromptoHero = () => {

    return (
        
        <Section
        id="PromptoHero"
        >
            <div className="container relative">
                <div className= "relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
                    <h1 className="h1 mb-6">
                        <span className="inline-block relative">
                            $PROMPTO
                            <img
                                src={curve}
                                className="absolute top-full left-0 w-full xl:-mt-2"
                                width={624}
                                height={28}
                                alt="Curve"
                            />
                        </span>
                    </h1>
                </div>
            </div>



        </Section>
    )

};


export default PromptoHero;


