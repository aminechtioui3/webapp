export type Notification= {
    id: string;
    message: string;
    timestamp: string;
    group?: string;   // Optional: Some notifications might not have a group
    sender?: string;  // Optional: System-generated notifications might not have a sender
    
}

export interface NotificationResponse {
    sent: Notification[];
    received: Notification[];
}

  

// Function to send a notification
export async function sendNotification(notification: { message: string; group: string }): Promise<{ success: boolean }> {
    try {
        const response = await fetch('/api/notifications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notification),
        });

        if (!response.ok) {
            throw new Error('Failed to send notification');
        }

        return { success: true };
    } catch (error) {
        console.error('Error sending notification:', error);
        return { success: false };
    }
}

// Function to fetch notifications
export async function getNotifications(): Promise<NotificationResponse> {
    try {
        const response = await fetch('/api/notifications');

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        // Ensure response data has the correct structure
        const data = await response.json();
        
        const sent = data.sent.map((notif: any) => ({
            message: notif.message || "No message",
            timestamp: notif.timestamp || new Date().toISOString(),
            group: notif.group || "Unknown",
            sender: notif.sender || "System",
        }));

        const received = data.received.map((notif: any) => ({
            message: notif.message || "No message",
            timestamp: notif.timestamp || new Date().toISOString(),
            group: notif.group || "Unknown",
            sender: notif.sender || "System",
        }));

        return { sent, received };
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return { sent: [], received: [] };
    }
}
