import { Link } from "react-router-dom";
import ButtonSvg from "../assets/svg/ButtonSvg";

const Button = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  type = "button",
  disabled = false,
  target,
  rel,
}) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${
    disabled ? "opacity-60 pointer-events-none" : ""
  } ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );

  const renderLink = () => {
    if (!href) return null;
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link to={href} className={classes} onClick={onClick}>
          <span className={spanClasses}>{children}</span>
          {ButtonSvg(white)}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} target={target} rel={rel} onClick={onClick}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </a>
    );
  };

  return href ? renderLink() : renderButton();
};

export default Button;
