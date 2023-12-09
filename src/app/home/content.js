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
        <div className="w-fit flex flex-col gap-2 mx-auto md:text-left md:mx-0">
          <div>
            <h2>Hi <strong>Two Barrels</strong>!</h2>
            <h1 className="text-5xl font-extrabold tracking-tighter">
              <span className="text-sky-950 font-extrabold">Streamlined</span>{" "}
              <span className="text-charcoal font-light">Resume</span>
            </h1>
            <span className="text-xs">
              by{" "}
              <Link
                href={"https://hazmedmoreno.com"}
                className="font-extrabold text-indigo-600"
                target="blank"
              >
                Hazmed Moreno
              </Link>
            </span>
          </div>
          <h2>
            Create a streamlined one-page resume to land your dream job, in minutes.
          </h2>
          <Link href={"/start"} className="action-btn mt-4">
            Get Started
          </Link>
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
