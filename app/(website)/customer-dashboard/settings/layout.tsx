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
                <div className="col-span-2">
                    <SettingsSidebar />
                </div>
                <div className="col-span-5">
                    {children}
                </div>
            </div>
        </main >
    );
}