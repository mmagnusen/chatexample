import { VirtuosoMessageList, VirtuosoMessageListLicense } from "@virtuoso.dev/message-list";
import { randParagraph } from '@ngneat/falso';
import type {VirtuosoMessageListMethods  } from "@virtuoso.dev/message-list";
import { useRef, useState } from "react";

const initialMessages = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    content: randParagraph(),
    timestamp: new Date().toISOString()
}));

const licenseKey = process.env.NEXT_PUBLIC_REACT_VIRTUOSO_LICENSE_KEY as string

const Message = ({ message }: {
    message: {
        id: number;
        content: string;
        timestamp: string;
    }
}) => {
    return (
        <div style={{
            padding: "10px",
            margin: "5px 0",
            background: "white",
            color: "black"
        }}>{message?.content}</div>
    )
}

const Chat = () => {
    const virtuosoChannelRef = useRef<VirtuosoMessageListMethods>(null);
    const [chatMessage, setChatMessage] = useState("")

    const sendMessage = () => {
        virtuosoChannelRef?.current?.data?.append([{
            id: Math.random().toString(36).substring(7), // Generate a random ID
            content: chatMessage,
            timestamp: new Date().toISOString()
        }], () => {
            return {
                index: "LAST",
                align: "end",
                behavior: "smooth",
            };
        });
        setChatMessage("");
    }

    return (
        <div style={{ background: '#dedeff', padding: '0 1rem', display: 'flex', flexDirection: "column",  height: "-webkit-fill-available"}}>
            <div style={{
                background: 'white',
                padding: '1rem',
                flexShrink: 0,
                height: '50px'
            }}><h1 style={{
                fontWeight: 700,
                fontSize: '1.5rem',
                color: "black"
            }}>Messages</h1></div>
            <VirtuosoMessageListLicense licenseKey={licenseKey}>
                <VirtuosoMessageList
                    initialData={initialMessages}
                    initialLocation={{ index: "LAST", align: "end" }}
                    ItemContent={({ data }) => (
                        <Message
                            message={data}
                        />
                    )}
                    ref={virtuosoChannelRef}
                    style={{ height: "100%" }}
                />
                <div style={{
                    height: '200px'
                }}>
                    <textarea 
                    style={{
                        height: '100px',
                        background: 'white',
                        width: '100%',
                        resize: "none",
                        flexShrink: 0,
                        color: "black"
                    }}
                        value={chatMessage}
                        onChange={(event) => setChatMessage(event?.target.value)} />
                    <button style={{
                        padding: '1rem',
                        background: 'pink',
                        cursor: 'pointer',
                        margin: "0 auto",
                        display: 'block',
                        color: "black"

                    }} onClick={sendMessage}>Send message</button>
                </div>
            </VirtuosoMessageListLicense>
        </div>
    )
}

export default Chat;