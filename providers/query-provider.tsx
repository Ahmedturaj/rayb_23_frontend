"use client";

import { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface DashProviderProps {
    children: ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: DashProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>{children}</div>
        </QueryClientProvider>
    );
};

export default QueryProvider;