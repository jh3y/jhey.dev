import { ImageResponse } from "@vercel/og";
import fs from "node:fs";
import path from "node:path";

const OG = ({ title }: { title: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <div
        style={{
          backgroundImage:
            "linear-gradient(90deg,#0000 59px 59px,hsl(0 0% 70%) 59px 60px), linear-gradient(0deg,#0000 59px 59px,hsl(0 0% 70%) 59px 60px)",
          backgroundSize: "60px 60px, 60px 60px",
          backgroundPosition: "12px 0, 0 12px",
          backgroundColor: "hsl(0 0% 98%)",
          position: "absolute",
          height: "100%",
          width: "100%",
          maskImage: "linear-gradient(-20deg, #0000 50%, #fff);",
        }}
      />

      <svg
        style={{
          color: "hsl(0 0% 50%)",
          width: "36px",
          height: "36px",
          position: "absolute",
          top: "24px",
          left: "21px",
        }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.98448 20.5882L2.80803 22.2056M2.58756 20.8087L4.20495 21.9851"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22.144 0.730378L20.6832 2.09646M20.7306 0.683043L22.0966 2.1438"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M3.90821 18.5526L3.31262 18.6252C3.34465 18.8878 3.54486 19.0984 3.80547 19.1437L3.90821 18.5526ZM20.601 4.22249L20.9918 4.67774C21.1597 4.53359 21.2346 4.30872 21.1868 4.09266C21.1389 3.8766 20.9759 3.70444 20.7628 3.64473L20.601 4.22249ZM21.2033 4.21343C21.1967 3.88212 20.9228 3.6189 20.5915 3.62549C20.2602 3.63209 19.997 3.90601 20.0036 4.23732L21.2033 4.21343ZM20.9477 21.5139L20.8449 22.105C21.0215 22.1357 21.2025 22.0859 21.3384 21.9692C21.4744 21.8524 21.5511 21.6811 21.5475 21.5019L20.9477 21.5139ZM3.03505 11.3945L2.64423 10.9393C2.49201 11.0699 2.41517 11.268 2.43946 11.4672L3.03505 11.3945ZM13.8216 1.69999C13.5025 1.61059 13.1714 1.79679 13.082 2.11587C12.9926 2.43496 13.1788 2.7661 13.4979 2.8555L13.8216 1.69999ZM4.29903 19.0078L20.9918 4.67774L20.2102 3.76723L3.51739 18.0973L4.29903 19.0078ZM20.0036 4.23732L20.3478 21.5258L21.5475 21.5019L21.2033 4.21343L20.0036 4.23732ZM3.80547 19.1437L20.8449 22.105L21.0504 20.9227L4.01094 17.9614L3.80547 19.1437ZM3.42587 11.8498L14.0485 2.73064L13.2669 1.82012L2.64423 10.9393L3.42587 11.8498ZM4.50379 18.4799L3.63063 11.3219L2.43946 11.4672L3.31262 18.6252L4.50379 18.4799ZM20.7628 3.64473L13.8216 1.69999L13.4979 2.8555L20.4391 4.80024L20.7628 3.64473Z"
          fill="currentColor"
        />
        <path
          d="M15.7227 7.75L20.7223 21.2501"
          stroke="currentColor"
          stroke-width="1.2"
        />
        <path
          d="M8.13672 14.2656L20.724 21.2521"
          stroke="currentColor"
          stroke-width="1.2"
        />
        <path
          d="M7.0673 8.29748C6.95522 7.98564 6.61156 7.8237 6.29972 7.93579C5.98788 8.04787 5.82595 8.39153 5.93803 8.70337L7.0673 8.29748ZM9.12245 14.0153L7.0673 8.29748L5.93803 8.70337L7.99318 14.4212L9.12245 14.0153Z"
          fill="currentColor"
        />
        <path
          d="M15.6133 8.16406L10.4977 5.50155"
          stroke="currentColor"
          stroke-width="1.2"
          stroke-linecap="round"
        />
      </svg>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "2rem",
          padding: "64px 128px",
          height: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "DM Serif",
            fontWeight: 700,
            color: "hsl(0 0% 10%)",
            fontSize: "80px",
            backgroundClip: "text",
            color: "#0000",
            lineHeight: 0.9,
            padding: "2rem .2rem",
            backgroundImage:
              "linear-gradient(#ff6467, #ff6467), linear-gradient(#ff6467, #ff6467), linear-gradient(hsl(0 0% 20%), hsl(0 0% 20%))",
            backgroundRepeat: "no-repeat",
            backgroundSize: "280px 100px, 320px 100px, 100% 100%",
            backgroundPosition: "0 100px, 0 120px, 0 0",
          }}
        >
          What if you could build anything?
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontSize: "32px",
            marginBottom: "30px",
            fontWeight: 300,
            color: "hsl(0 0% 20%)",
            width: "700px",
          }}
        >
          Master the tools, mindset, and techniques behind crafting exceptional
          user interfaces
        </div>
      </div>
      <div
        style={{
          transform: "rotate(-90deg) translateY(-0px)",
          transformOrigin: "1px 100%",
          whiteSpace: "nowrap",
          display: "flex",
          position: "absolute",
          left: "100%",
          bottom: "0",
          height: "64px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "0 44px",
            fontSize: "22px",
            fontFamily: "Inter Regular",
            fontWeight: 600,
            whiteSpace: "nowrap",
            alignItems: "center",
            color: "hsl(0 0% 60%)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", padding: "0px" }}>
            <div style={{ color: "black" }}>The Craft of UI&nbsp;</div> – A
            course from Jhey Tompkins
          </div>
          <img
            alt=""
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            src="https://jhey.dev/headshot.png"
          />
        </div>
      </div>
    </div>
  );
};

const Inter = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/Inter_28pt-ExtraLight.ttf"),
);
const DMSerif = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/DMSerifText-Regular.ttf"),
);
const InterRegular = fs.readFileSync(
  path.join(process.cwd(), "public/fonts/Inter_28pt-Regular.ttf"),
);

export const generateOG = ({ title }: { title: string }) => {
  const og = new ImageResponse(<OG title={title} />, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: Inter,
        style: "normal",
      },
      {
        name: "Inter Regular",
        data: InterRegular,
        style: "normal",
      },
      {
        name: "DM Serif",
        data: DMSerif,
        style: "normal",
      },
    ],
  });
  return og;
};