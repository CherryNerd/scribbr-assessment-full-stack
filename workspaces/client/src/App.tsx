import { APP_TITLE } from "@scribbr-assessment-full-stack/common";
import React, { useState } from "react";
import './index.css';

export function App() {
  return (
    <div>
      <h1 className={"text-3xl font-bold underline"}>Welcome to {APP_TITLE}!</h1>
      <p>This would be probably the starting point of your app.</p>
    </div>
  );
}
