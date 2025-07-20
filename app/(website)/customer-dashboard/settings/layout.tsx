import React from "react";
import SettingsSidebar from "./settings-sidebar";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="container">
            <div className="grid grid-cols-7 gap-6">
                <div className="lg:col-span-2">
                    <SettingsSidebar />
                </div>
                <div className="lg:col-span-5 col-span-7">
                    {children}
                </div>
            </div>
        </main >
    );
}