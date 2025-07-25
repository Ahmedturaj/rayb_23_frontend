"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */


import InboxComponent from "@/components/shared/inbox"
import { getChatByBusinessMan } from "@/lib/api"
import { useBusinessContext } from "@/lib/business-context"

export default function BusinessInboxPage() {
    const { selectedBusinessId } = useBusinessContext()

    const businessInboxConfig = {
        // Data fetching
        fetchChats: (userId: string, businessId: string) => getChatByBusinessMan(businessId as string).then((res) => res.data),
        queryKey: ["business-chats", selectedBusinessId],

        // Chat display - for business inbox, we show customer info
        getChatName: (chat: any) => chat?.userId?.name || "Unknown User",
        getChatEmail: (chat: any) => chat?.userId?.email || "",
        getChatImage: (chat: any) => chat?.userId?.image,
        getChatId: (chat: any) => chat?._id,

        // Message handling - business sends to customer
        getReceiverId: (chat: any) => chat?.userId?._id,

        // UI
        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search-result",
        emptyStateLinkText: "Go to Search Results",

        // Additional data
        additionalData: selectedBusinessId as string,
    }
    
    return <InboxComponent config={businessInboxConfig} />
}
