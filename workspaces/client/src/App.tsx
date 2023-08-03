import React from "react";
import './index.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Home from "@scribbr-assessment-full-stack/client/src/Home";

const queryClient = new QueryClient();


export function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Home/>
        </QueryClientProvider>
    );
}
