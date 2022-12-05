import React from "react";
const LayoutHeader = ({ children }) => {
  return (
    <header className="w-main-content max-w-full mv-0 mx-auto">
      <div className="grid grid-cols-[auto_1fr] gap-fluid-space-0 justify-start items-center">
        <img className="rounded-full aspect-square w-fluid-size-9 border-2 border-text-1" src="https://picsum.photos/300/300?random=23" alt="" /> 
        <h1 className="leading-[0.9] text-fluid-3 sm:text-fluid-5">Jhey<br/>Tompkins<span role="img">😎</span></h1>
      </div>
      <div className="py-fluid-space-2">
        <p>🤓 Brings ideas to life with code.</p>
        <p>Whimsy Dev Supreme</p>
        <p>International Speaker</p>
        <p>Joined 2022</p>
        <p>Null island</p>
        <p>Google Dev Rel</p>
        <p>Links</p>
        <button className="bg-red-500">Follow</button>
      </div>
    </header>
  );
};

export default LayoutHeader;
