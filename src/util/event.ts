/**
 * @ignore
 * get view event name, with name:event
 * @param type original event type
 * @param name event trigger shape name
 * @returns the name:event string
 */
export function getEventName(type: string, name?: string): string {
  if (type.includes(':')) {
    return type;
  }

  return name ? `${name}:${type}` : type;
}
