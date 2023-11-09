import React from "react";
import Image from "next/image";
import { footerLinks } from "@/helpers";
import FooterColumnComponent from "@/components/footer-column.component";

const FooterComponent = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo-purple.svg" width={60} height={20} alt="logo" />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            The world’s leading brands use Dribbble to hire creative talent.
            Browse millions of top-rated portfolios to find your perfect
            creative match.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumnComponent
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <div className="flex-1 flex flex-col gap-4">
            <FooterColumnComponent
              title={footerLinks[1].title}
              links={footerLinks[1].links}
            />
            <FooterColumnComponent
              title={footerLinks[2].title}
              links={footerLinks[2].links}
            />
          </div>
          <FooterColumnComponent
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <div className="flex-1 flex flex-col gap-4">
            <FooterColumnComponent
              title={footerLinks[4].title}
              links={footerLinks[4].links}
            />
            <FooterColumnComponent
              title={footerLinks[5].title}
              links={footerLinks[5].links}
            />
          </div>
          <FooterColumnComponent
            title={footerLinks[6].title}
            links={footerLinks[6].links}
          />
        </div>
      </div>
      <div className="flexBetween footer_copyright">
        <p>@ 2023 Dribble. All rights reserved</p>
        <p className="text-gray">
          <span className="text-black font-semibold">10,580</span>
          &nbsp; projects submitted
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
