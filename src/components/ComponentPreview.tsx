import React from "react";

interface ComponentPreviewProps {
  children: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ children }) => {
  return <div
      className="flex flex-col mx-auto flex-1 max-w-[14rem] border border-primary rounded-md md:max-w-[18rem] shadow-sm w-full"
    >
      <div
        className="bg-primary p-2 w-full rounded-t-md border-b border-primary text-xs"
      >
        Preview
      </div>
      <div
        className="flex justify-center items-center bg-terniary aspect-square rounded-b-md"
        style={{minWidth: `${React.Children.count(children) * 100}%`}}
      >
        {children ? React.Children.map(children, (child, i) => {
          return (
            <div key={`elem${i}`} className="h-full border w-full flex justify-center items-center">
              {child}
            </div>
          )
        }) : <p>No previews found</p>}
      </div>
    </div> 
}

export default ComponentPreview;