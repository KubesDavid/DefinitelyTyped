/// <reference types="chatwoot-web" />

window.chatwootSettings = {
    hideMessageBubble: false,
    showUnreadMessagesDialog: true,
    position: "left",
    locale: "en",
    useBrowserLanguage: false,
    type: "expanded_bubble",
    launcherTitle: "Chat with us",
    showPopoutButton: true,
    widgetStyle: "flat",
    darkMode: "auto",
    welcomeTitle: "Need help?",
    welcomeDescription: "We're here to support you.",
    availableMessage: "We're online.",
    unavailableMessage: "We're offline.",
    enableFileUpload: true,
    enableEmojiPicker: true,
    enableEndConversation: true,
    baseDomain: "example.com",
};

window.chatwootSDK.run({
    websiteToken: "website-token",
    baseUrl: "https://app.chatwoot.com",
});

window.$chatwoot.hasLoaded; // $ExpectType boolean
window.$chatwoot.isOpen; // $ExpectType boolean
window.$chatwoot.resetTriggered; // $ExpectType boolean
window.$chatwoot.toggle();
window.$chatwoot.toggle("open");
window.$chatwoot.toggle("close");
window.$chatwoot.toggleBubbleVisibility("show");
window.$chatwoot.toggleBubbleVisibility("hide");
window.$chatwoot.popoutChatWindow();

window.$chatwoot.setUser("user-1", {
    name: "John Doe",
    email: "john@example.com",
    avatar_url: "https://example.com/avatar.png",
    phone_number: "+420123456789",
    identifier_hash: "identifier-hash",
    description: "Customer",
    country_code: "CZ",
    city: "Prague",
    company_name: "Example, Inc.",
    social_profiles: {
        twitter: "john",
        linkedin: "john-doe",
        facebook: "john.doe",
        github: "john",
    },
    custom_attributes: {
        plan: "paid",
        accountId: 1,
        verified: true,
    },
});
window.$chatwoot.setUser(42, { email: "john@example.com" });

window.$chatwoot.setCustomAttributes({
    accountId: 1,
    pricingPlan: "paid",
    renewalDate: new Date(),
    verified: true,
});
window.$chatwoot.deleteCustomAttribute("pricingPlan");
window.$chatwoot.setConversationCustomAttributes({ orderId: "ORD-1" });
window.$chatwoot.deleteConversationCustomAttribute("orderId");
window.$chatwoot.setLabel("support-ticket");
window.$chatwoot.removeLabel("support-ticket");
window.$chatwoot.setLocale();
window.$chatwoot.setLocale("cs");
window.$chatwoot.setColorScheme();
window.$chatwoot.setColorScheme("dark");
window.$chatwoot.reset();

window.addEventListener("chatwoot:ready", event => {
    event.detail; // $ExpectType null
});

window.addEventListener("chatwoot:opened", event => {
    event.detail; // $ExpectType null
});

window.addEventListener("chatwoot:closed", event => {
    event.detail; // $ExpectType null
});

window.addEventListener("chatwoot:on-message", event => {
    event.detail; // $ExpectType Message
    event.detail.content; // $ExpectType string | null
    event.detail.message_type; // $ExpectType 0 | 1 | 2 | 3
});

window.addEventListener("chatwoot:on-start-conversation", event => {
    event.detail.hasConversation; // $ExpectType boolean
});

window.addEventListener("chatwoot:error", event => {
    event.detail; // $ExpectType unknown
});

window.addEventListener("chatwoot:postback", event => {
    event.detail.data.payload; // $ExpectType string
});

// @ts-expect-error
window.chatwootSDK.run({
    websiteToken: "website-token",
});

// @ts-expect-error
window.$chatwoot.toggle("expanded");
// @ts-expect-error
window.$chatwoot.toggleBubbleVisibility("visible");
// @ts-expect-error
window.$chatwoot.setUser("user-1", { phone_number: "+420123456789" });
// @ts-expect-error
window.$chatwoot.setCustomAttributes({ invalid: {} });
// @ts-expect-error
window.$chatwoot.setColorScheme("sepia");
