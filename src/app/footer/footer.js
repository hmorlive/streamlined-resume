import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Footer () {
  return (
    <footer className='mt-auto text-white bg-slate-950 p-4 py-6 w-full'>
      <div className='container mx-auto flex flex-col flex-wrap justify-start gap-4 lg:flex-row lg:justify-between items-center'>
        {/* Logo and Contact */}
        <div className='flex flex-col items-center md:items-start mb-4 md:mb-0 gap-1'>
        <span className="font-extrabold text-lg">Streamlined<span className="font-light">Resume</span></span>
        </div>
        {/* Policies and Copyright */}
        <div className='flex flex-col text-center items-center md:items-end mt-4 md:mt-0 gap-2'>
          <p className='mb-2 font-normal text-sm text-center'>
            &copy; {new Date().getFullYear()} Streamlined Resume by Hazmed Moreno. All rights
            reserved.
          </p>
        </div>
        <Link href={"https://github.com/hmorlive/streamlined-resume"} target='_black' aria-label='Link to Github Repo' title='Link to Github Repo'><FontAwesomeIcon icon={faGithub} /></Link>
      </div>
    </footer>
  )
}

// may add phone later =>  <span className='text-sm flex items-center justify-center'><FontAwesomeIcon icon={faPhone} className="mr-2 text-xs" />+1  (833) 250-8564 |&nbsp;<span className='text-xs'>Mon-Fri 10am-4pm EST</span></span>