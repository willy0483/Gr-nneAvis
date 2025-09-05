import type { T_Donations } from "@/lib/types";

const Donations = ({ theme }: T_Donations) => {
  let imgSrc = "";
  let caption = "";
  let title = "";
  let caption2 = "";
  let amount = "";

  if (theme === "klimant") {
    imgSrc = "/images/banners/banner_image2.jpg";
    caption = "Tak fordi du handler brugt, med omtanke for klimaet";
    caption2 = "Sammen med dig har vi siden starten indsamlet:";
    title = "Donationer til dato";
    amount = "452.231,50 kr";
  } else if (theme === "jorden") {
    imgSrc = "images/banners/banner_image3.jpg";
    caption = "Tak fordi du handler brugt, med omtanke for jorden";
    caption2 = "Sammen med dig har vi i år indsamlet:";
    title = "Donationer i år";
    amount = "112.452,75 kr";
  }

  return (
    <figure className="relative h-[180px] w-full overflow-hidden ">
      <img
        src={imgSrc}
        alt={caption}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 z-10" />
      <figcaption className="relative z-20 flex flex-col  bg-black/30 justify-start h-full px-6 py-4 text-left">
        <h3 className="text-white text-2xl md:text-3xl font-light mb-2 drop-shadow">
          {title}
        </h3>
        <p className="text-white text-base md:text-lg mb-1 drop-shadow">
          {caption2}
        </p>
        <span className=" text-3xl md:text-4xl font-semibold mb-2 text-end text-app-accent">
          {amount}
        </span>
        <p className="text-white text-xs md:text-sm mt-auto drop-shadow">
          {caption}
        </p>
      </figcaption>
    </figure>
  );
};
export default Donations;
