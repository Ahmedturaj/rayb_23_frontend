"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import InboxComponent from "@/components/shared/inbox"
import { getMyChat } from "@/lib/api"

export default function CustomerInboxPage() {
    const customerInboxConfig = {
        // ✅ Make userId optional to match InboxConfig type
        fetchChats: (userId?: string) => {
            return userId ? getMyChat(userId).then((res) => res.data) : Promise.resolve([])
        },

        queryKey: ["chats"],

        getChatName: (chat: any) => chat?.bussinessId?.businessInfo?.name || "Unknown Business",
        getChatEmail: (chat: any) => chat?.bussinessId?.businessInfo?.email || "",
        getChatImage: (chat: any) => chat?.bussinessId?.businessInfo?.image?.[0],
        getChatId: (chat: any) => chat?._id,

        getReceiverId: (chat: any) => chat?.bussinessId?.user,

        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search",
        emptyStateLinkText: "Go to Search Results",
    }

    return <InboxComponent config={customerInboxConfig} />
}
