import { api } from "@/lib/api";
import { useAuth } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const { loginData } = useAuth();
  const handleSubmit = () => {
    if (email) {
      api.post("newsletters", { email: email }, loginData?.accessToken);
      toast.success("Email added", {
        id: "added-email",
      });
      setEmail("");
    }
  };

  return (
    <footer className="bg-app-accent text-white py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-2">Nyhedsbrev</h3>
          <p className="mb-4 text-sm text-black">
            Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og
            få de seneste klima opdateringer direkte i din indbakke
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Din email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded bg-white text-black flex-1 min-w-0"
            />
            <button
              onClick={handleSubmit}
              className="bg-app-primary hover:cursor-pointer text-white px-4 py-2 rounded font-semibold border border-white"
            >
              Tilmeld
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Kontakt</h3>
          <p className="mb-1 text-sm text-black">Redningen 32</p>
          <p className="mb-1 text-sm text-black">2210 Vinterby Øster</p>
          <p className="mb-1 text-sm text-black">+45 89229422</p>
          <p className="mb-1 text-sm text-black">dga@info.dk</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">FN's Verdensmål</h3>
          <p className="mb-4 text-sm text-black">
            Vi støtter på organisatorisk plan op om FN's verdensmål og har
            derfor besluttet at en del af overskuddet går direkte til verdensmål
            nr 13, klimaindsats.
          </p>
          <a
            href="https://www.verdensmaalene.dk/fakta/verdensmaalene"
            className="underline text-white text-sm"
          >
            Læs mere om verdensmålene her
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
