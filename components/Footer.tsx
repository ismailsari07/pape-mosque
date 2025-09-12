import {
  FacebookIcon,
  GithubIcon,
  LocateIcon,
  MailIcon,
  PhoneCall,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="flex flex-col items-start gap-3 px-4 py-12 lg:p-24">
      <div className="container flex flex-col items-start gap-3">
        <h2 className="text-5xl font-semibold">Turkish Islamic Center</h2>
        <p className="md:w-1/3 text-lg">
          All are welcome to join our prayers, programs, and community
          gatherings. Experience the warmth of our inclusive spiritual family.
        </p>
        <Button variant={"secondary"}>Support Us</Button>
        <div className="w-full flex flex-col md:flex-row justify-between items-start max-md:gap-5 my-8">
          {/* Follow Us */}
          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-3 text-xl text-gray-700">
              <GithubIcon />
              <TwitterIcon />
              <FacebookIcon />
              <YoutubeIcon />
            </div>

            <h4 className="font-semibold mt-6 mb-2">About Us</h4>
            <ul className="space-y-1">
              <li className="flex gap-2">
                <LocateIcon />
                <a href="#">336 Pape Avenue, Toronto</a>
              </li>
              <li className="flex gap-2">
                <PhoneCall />
                <a href="#">437 443 9648</a>
              </li>
              <li className="flex gap-2">
                <MailIcon />
                <a href="#">iletisim@papecami.com</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold md:mb-3">Services</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Funeral Services</a>
              </li>
              <li>
                <a href="#">Qur'an Lessons</a>
              </li>
              <li>
                <a href="#">Marriage Services</a>
              </li>
              <li>
                <a href="#">Ramadan Iftar Meals</a>
              </li>
            </ul>
          </div>

          {/* Get Help */}
          <div>
            <h4 className="font-semibold md:mb-3">Get Help</h4>
            <ul className="space-y-1">
              <li>
                <a href="#">Dernegimiz</a>
              </li>
              <li>
                <a href="#">Hizmetlerimiz</a>
              </li>
              <li>
                <a href="#">Bagis</a>
              </li>
              <li>
                <a href="#">Faydali Linkler</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="font-semibold">Made with ❤️</p>
      </div>
    </footer>
  );
}
