import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Footer = () => {
  return (
    <footer className="block w-full bg-slate-200 p-5 md:pl-60">
      <div className="flex flex-col md:flex-row  md:justify-between items-center">
        <div className="flex flex-col items-center">
          <span className="font-bold text-slate-700">About us</span>
          <p className="font-medium text-sm text-slate-600">
            Made and Loved❤️ from India🇮🇳{" "}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 mb-1">
            <AvatarImage src="/Hero.jpg" alt="founder"/>
            <AvatarFallback>Founder</AvatarFallback>
          </Avatar>
          <h4 className="font-bold text-sm text-slate-700">Founder</h4>
          <span className="font-normal text-base">Suvrajit Mondal</span>
        </div>
      </div>
      <div className="text-center text-xs font-medium">
        &#169;2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
