"use client"

import InboxComponent from "@/components/shared/inbox"
import { getMyChat } from "@/lib/api"

export default function CustomerInboxPage() {
    const customerInboxConfig = {
        // Data fetching
        fetchChats: (userId: string) => getMyChat(userId).then((res) => res.data),
        queryKey: ["chats"],

        // Chat display - for customer inbox, we show business info
        getChatName: (chat: any) => chat?.bussinessId?.businessInfo?.name || "Unknown Business",
        getChatEmail: (chat: any) => chat?.bussinessId?.businessInfo?.email || "",
        getChatImage: (chat: any) => chat?.bussinessId?.businessInfo?.image?.[0],
        getChatId: (chat: any) => chat?._id,

        // Message handling - customer sends to business
        getReceiverId: (chat: any) => chat?.bussinessId?.user,

        // UI
        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search",
        emptyStateLinkText: "Go to Search Results",
    }

    return <InboxComponent config={customerInboxConfig} />
}
