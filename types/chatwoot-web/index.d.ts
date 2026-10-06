declare namespace Chatwoot {
    type Position = "left" | "right";
    type BubbleType = "standard" | "expanded_bubble";
    type WidgetStyle = "standard" | "flat";
    type ColorScheme = "light" | "dark" | "auto";

    type CustomAttributeValue = string | number | boolean | Date;
    type CustomAttributes = Record<string, CustomAttributeValue>;

    interface Config {
        websiteToken: string;
        baseUrl: string;
    }

    interface Settings {
        hideMessageBubble?: boolean | undefined;
        showUnreadMessagesDialog?: boolean | undefined;
        position?: Position | undefined;
        locale?: string | undefined;
        useBrowserLanguage?: boolean | undefined;
        type?: BubbleType | undefined;
        launcherTitle?: string | undefined;
        showPopoutButton?: boolean | undefined;
        widgetStyle?: WidgetStyle | undefined;
        darkMode?: ColorScheme | undefined;
        welcomeTitle?: string | undefined;
        welcomeDescription?: string | undefined;
        availableMessage?: string | undefined;
        unavailableMessage?: string | undefined;
        enableFileUpload?: boolean | undefined;
        enableEmojiPicker?: boolean | undefined;
        enableEndConversation?: boolean | undefined;
        baseDomain?: string | undefined;
    }

    interface SocialProfiles {
        twitter?: string | undefined;
        linkedin?: string | undefined;
        facebook?: string | undefined;
        github?: string | undefined;
    }

    interface UserAttributes {
        name?: string | undefined;
        email?: string | undefined;
        avatar_url?: string | undefined;
        phone_number?: string | undefined;
        identifier_hash?: string | undefined;
        description?: string | undefined;
        country_code?: string | undefined;
        city?: string | undefined;
        company_name?: string | undefined;
        social_profiles?: SocialProfiles | undefined;
        custom_attributes?: CustomAttributes | undefined;
    }

    type User = UserAttributes & ({ name: string } | { email: string } | { avatar_url: string });

    interface SDK {
        run(config: Config): void;
    }

    interface Widget {
        readonly baseUrl: string;
        readonly baseDomain: string | undefined;
        readonly hasLoaded: boolean;
        readonly hideMessageBubble: boolean;
        readonly isOpen: boolean;
        readonly position: Position;
        readonly websiteToken: string;
        readonly locale: string | undefined;
        readonly useBrowserLanguage: boolean;
        readonly type: BubbleType;
        readonly launcherTitle: string;
        readonly showPopoutButton: boolean;
        readonly showUnreadMessagesDialog: boolean;
        readonly widgetStyle: WidgetStyle;
        readonly resetTriggered: boolean;
        readonly darkMode: ColorScheme;
        readonly welcomeTitle: string;
        readonly welcomeDescription: string;
        readonly availableMessage: string;
        readonly unavailableMessage: string;
        readonly enableFileUpload: boolean | undefined;
        readonly enableEmojiPicker: boolean;
        readonly enableEndConversation: boolean;
        readonly identifier?: string | number | undefined;
        readonly user?: User | undefined;

        toggle(state?: "open" | "close"): void;
        toggleBubbleVisibility(visibility: "show" | "hide"): void;
        popoutChatWindow(): void;
        setUser(identifier: string | number, user: User): void;
        setCustomAttributes(customAttributes: CustomAttributes): void;
        deleteCustomAttribute(customAttribute: string): void;
        setConversationCustomAttributes(customAttributes: CustomAttributes): void;
        deleteConversationCustomAttribute(customAttribute: string): void;
        setLabel(label: string): void;
        removeLabel(label: string): void;
        setLocale(locale?: string): void;
        setColorScheme(darkMode?: ColorScheme): void;
        reset(): void;
    }

    interface MessageSender {
        [key: string]: unknown;
        id: number;
        name: string | null;
        type: "user" | "contact" | "agent_bot";
    }

    interface Attachment {
        [key: string]: unknown;
        id: number;
        message_id: number;
        account_id: number;
        file_type: string;
    }

    interface Message {
        [key: string]: unknown;
        id: number;
        content: string | null;
        message_type: 0 | 1 | 2 | 3;
        content_type:
            | "text"
            | "input_text"
            | "input_textarea"
            | "input_email"
            | "input_select"
            | "cards"
            | "form"
            | "article"
            | "incoming_email"
            | "input_csat"
            | "integrations"
            | "sticker"
            | "voice_call";
        content_attributes: Record<string, unknown>;
        created_at: number;
        conversation_id: number;
        attachments?: Attachment[] | undefined;
        sender?: MessageSender | undefined;
    }

    interface StartConversationEventDetail {
        hasConversation: boolean;
    }

    interface PostbackEventDetail {
        event: "postback";
        data: {
            payload: string;
        };
    }
}

interface Window {
    $chatwoot: Chatwoot.Widget;
    chatwootSDK: Chatwoot.SDK;
    chatwootSettings?: Chatwoot.Settings | undefined;
}

interface WindowEventMap {
    "chatwoot:ready": CustomEvent<null>;
    "chatwoot:opened": CustomEvent<null>;
    "chatwoot:closed": CustomEvent<null>;
    "chatwoot:on-message": CustomEvent<Chatwoot.Message>;
    "chatwoot:on-start-conversation": CustomEvent<Chatwoot.StartConversationEventDetail>;
    "chatwoot:error": CustomEvent<unknown>;
    "chatwoot:postback": CustomEvent<Chatwoot.PostbackEventDetail>;
}
