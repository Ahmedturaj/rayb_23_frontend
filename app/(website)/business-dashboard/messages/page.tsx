"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */


import InboxComponent from "@/components/shared/inbox"
import { getChatByBusinessMan } from "@/lib/api"
import { useBusinessContext } from "@/lib/business-context"

export default function BusinessInboxPage() {
    const { selectedBusinessId } = useBusinessContext()

    const businessInboxConfig = {
        fetchChats: (_userId?: string, businessId?: string) =>
            businessId ? getChatByBusinessMan(businessId).then((res) => res.data) : Promise.resolve([]),

        queryKey: selectedBusinessId
            ? ["business-chats", selectedBusinessId]
            : ["business-chats"],

        getChatName: (chat: any) => chat?.userId?.name || "Unknown User",
        getChatEmail: (chat: any) => chat?.userId?.email || "",
        getChatImage: (chat: any) => chat?.userId?.image,
        getChatId: (chat: any) => chat?._id,

        getReceiverId: (chat: any) => chat?.userId?._id,

        emptyStateText: "You have no messages yet.",
        emptyStateLink: "/search-result",
        emptyStateLinkText: "Go to Search Results",

        additionalData: selectedBusinessId || "", // If you want to ensure string, fallback to ""
    }

    return <InboxComponent config={businessInboxConfig} />
}
