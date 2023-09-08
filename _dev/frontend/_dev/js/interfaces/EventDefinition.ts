export type EventType = 'click'|'change'|'focus'|'submit';

export interface EventDefinition {
  type: EventType;
  element: string;
  dynamic: string | null;
  methodName: any;
}