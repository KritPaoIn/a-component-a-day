import React from "react";

interface ComponentPreviewProps {
  children?: React.ReactNode;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({ children }) => {
  return (
    <div className="border-primary mx-auto flex w-full max-w-[14rem] flex-1 flex-col rounded-md border shadow-sm md:max-w-[18rem]">
      <div className="bg-primary border-primary w-full rounded-t-md border-b p-2 text-xs">
        Preview
      </div>
      <div
        className="bg-tertiary flex aspect-square items-center justify-center rounded-b-md"
        style={{ minWidth: `${React.Children.count(children) * 100}%` }}
      >
        {children ? (
          React.Children.map(children, (child, i) => {
            return (
              <div
                key={`elem${i}`}
                className="flex h-full w-full items-center justify-center"
              >
                {child}
              </div>
            );
          })
        ) : (
          <p>No previews found</p>
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;
