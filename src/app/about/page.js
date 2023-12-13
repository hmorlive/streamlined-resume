// about section
export default function AboutSection() {
  return (
    <section className="flex flex-center min-h-[70vh] container mx-auto px-10 items-center justify-center">
      <div className="w-[600px] max-w-full">
        <h1 className="pl-2 border-l-8 border-orange-700">
          About{" "}
          <span className="font-extrabold text-slate-900">Streamlined</span>
          <span className="font-light">Resume</span>
        </h1>
        <hr className="divider mt-2 mb-4" />
        <h2 className="text-lg">
          Hi, I&apos;m Hazmed Moreno, but my friends call me Haz. I&apos;m gearing up to
          apply for a position as a software engineer at an awesome company. 
          The thing is, I don&apos;t have a lot of public-facing code
          that I can show off. To tackle this, I&apos;ve decided to put together a
          neat app as a showcase of my skills. It&apos;s a perfect opportunity for me
          to demonstrate my knack for coding and my ability to deliver
          innovative solutions. I&apos;m really excited to give them a glimpse of my
          technical capabilities and creativity. Fingers crossed that this app
          will help me stand out in my application!
        </h2>
      </div>
    </section>
  );
}
