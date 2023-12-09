//Modal Container
export default function Modal({ children }) {
    return (
      <div className="w-full h-full fixed flex items-center justify-center left-0 top-0 z-20 bg-gray-200 bg-opacity-70">
        <div className="w-[500px] max-w-[90vw] relative shadow shadow-orange-100 p-10 bg-white rounded-md  flex flex-col gap-2">
          {children}
        </div>
      </div>
    );
  }
  