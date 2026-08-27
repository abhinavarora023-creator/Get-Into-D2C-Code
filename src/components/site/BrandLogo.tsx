type BrandLogoProps = {
  className?: string;
  eager?: boolean;
};

const LOGO_URL = "/getintod2c-logo.png";

export function BrandLogo({ className = "h-12 w-auto", eager = false }: BrandLogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt="GetIntoD2C, A Unit of Parlexa"
      width={512}
      height={337}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );
}
