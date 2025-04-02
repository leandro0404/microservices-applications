// Event types
export const EVENT_TYPES = {
  PROFILE_UPDATED: 'PROFILE_UPDATED',
  PREFERENCE_UPDATED: 'PREFERENCE_UPDATED',
  AUTH_CHANGED: 'AUTH_CHANGED'
};

class EventService {
  constructor() {
    this.listeners = new Map();
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType).add(callback);

    // Add event listener to window
    window.addEventListener(eventType, (event) => {
      callback(event.detail);
    });

    // Return unsubscribe function
    return () => {
      this.listeners.get(eventType).delete(callback);
      window.removeEventListener(eventType, callback);
    };
  }

  emit(eventType, data) {
    const event = new CustomEvent(eventType, {
      detail: data,
      bubbles: true
    });
    window.dispatchEvent(event);
  }
}

export const eventService = new EventService(); 