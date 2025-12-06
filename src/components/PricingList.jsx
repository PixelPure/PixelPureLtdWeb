import { check } from "../assets";
import { pricing } from "../constants";
import Button from "./Button";

const PricingList = () => {
  return (
    <div className="flex gap-[1rem] max-lg:flex-wrap">
      {pricing.map((item) => {
        const showCurrency = item.showCurrency ?? true;
        const showPlus = item.showPlus ?? true;
        const cardHighlight = item.highlight
          ? "border-color-1/60 shadow-[0_25px_70px_rgba(172,106,255,0.2)]"
          : "border-n-6";

        return (
          <div
            key={item.id}
            className={`w-[19rem] max-lg:w-full h-full px-6 bg-n-8 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3 ${cardHighlight}`}
          >
            {item.badge && (
              <span className="inline-flex items-center rounded-full border border-n-6/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-n-3">
                {item.badge}
              </span>
            )}

            <h4 className="h4 mt-3 mb-3">{item.title}</h4>

            <p className="body-2 min-h-[4rem] mb-3 text-n-1/60">
              {item.description}
            </p>

            {item.price && (
              <div className="flex items-baseline h-[5.5rem] mb-6 gap-2">
                {showCurrency && <div className="h3">£</div>}
                <div className="text-[4.25rem] leading-none font-bold">
                  {item.price}
                </div>
                {showPlus && <div className="h3">+</div>}
              </div>
            )}

            <Button
              className="w-full mb-6"
              href="/contact"
              white={!item.highlight}
            >
              {item.ctaLabel || "Book a call"}
            </Button>

            <ul>
              {item.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start py-5 border-t border-n-6"
                >
                  <img src={check} width={24} height={24} alt="Check" />
                  <p className="body-2 ml-4">{feature}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default PricingList;
