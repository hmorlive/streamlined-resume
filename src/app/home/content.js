import { faCheckCircle, faClock, faGlobe, faHourglass, faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function HomePageContent() {
  return (
    <>
      <CTA />
    </>
  );
}

/**
 * Call to action section
 */
function CTA() {
  return (
    <section className="my-20 w-full flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-wrap md:flex-nowrap h-fit items-center w-fit gap-4 mx-[10%] md:gap-[10vw] p-4">
        <div className="w-fit flex flex-col gap-6 mx-auto md:text-left md:mx-0">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tighter">
              <span className="text-sky-950 font-extrabold">Streamlined</span>{" "}
              <span className="text-charcoal font-light">Resume</span>
            </h1>
            <h2 className="text-base font-light">
            Build streamlined one-page resumes
          </h2>
          </div>
          <div className="flex items-center gap-4">
          <Link href={"/start"} className="action-btn">
            Get Started
          </Link>
          <Link href={"/about"} className="text-sm text-blue-600">
            View sample
          </Link>
          </div>
        </div>
        <img
          src="/cta.png"
          className="md:w-[200px] lg:w-[300px] max-w-[90vw] h-auto"
          alt="abstract representation of a resume in dark blue and orange. Generated using Dall-e 3."
        />
      </div>
    </section>
  );
}
