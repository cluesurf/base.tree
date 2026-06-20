// JSON over the host JSON. The parsed value is the opaque dynamic value (any); the accessors navigate it directly.
const json = {
  parse: (text: string): any => JSON.parse(text),
  stringify: (value: any): string => JSON.stringify(value),
  getField: (value: any, key: string): any => (value != null && typeof value === 'object' && !Array.isArray(value) && key in value) ? value[key] : null,
  getItem: (value: any, index: number): any => Array.isArray(value) && index >= 0 && index < value.length ? value[index] : null,
  asNumber: (value: any): number => typeof value === 'number' ? value : 0,
  asText: (value: any): string => typeof value === 'string' ? value : '',
  asBoolean: (value: any): boolean => typeof value === 'boolean' ? value : false,
  isNull: (value: any): boolean => value === null || value === undefined,
}
