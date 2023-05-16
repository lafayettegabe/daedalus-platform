"use client";

import React from "react";
import { useDemoModal } from "./demo-modal";

interface IArgusSystemProps {}

const ArgusSystem: React.FC<IArgusSystemProps> = (props) => {
  const { DemoModal, setShowDemoModal } = useDemoModal();
  const {} = props;
  
  return (
    <div>
      <DemoModal />
      <h1
          className="pb-16 animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Argus System
      </h1>
      
      <button
        onClick={() => setShowDemoModal(true)}
        className="m-auto flex w-40 items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
      >
        <p className="text-gray-600">Modal</p>
      </button>
    
    </div>
  );
};

export default ArgusSystem;