export interface Notification {
    message: string;
    timestamp: string;
}

export interface NotificationResponse {
    sent: Notification[];
    received: Notification[];
}

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

export async function getNotifications(): Promise<NotificationResponse> {
    try {
        const response = await fetch('/api/notifications');

        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return { sent: [], received: [] };
    }
}
