// JSON shim over the host JSON. parse builds the json-value ADT ({ form, ... } records, matching the emitted repr);
// stringifyValue reconstructs the original JSON from the ADT; stringify serializes a plain typed value directly.
const json = {
  parse: (text: string): any => {
    const build = (v: any): any => {
      if (v === null) return { form: 'json-null' }
      if (typeof v === 'boolean') return { form: 'json-boolean', value: v }
      if (typeof v === 'number') return { form: 'json-number', value: v }
      if (typeof v === 'string') return { form: 'json-text', value: v }
      if (Array.isArray(v)) return { form: 'json-array', items: v.map(build) }
      return { form: 'json-object', entries: new Map(Object.entries(v).map(([k, x]) => [k, build(x)])) }
    }
    return build(JSON.parse(text))
  },
  stringify: (value: any): string => JSON.stringify(value),
  stringifyValue: (value: any): string => {
    const toJs = (x: any): any => {
      switch (x.form) {
        case 'json-null': return null
        case 'json-array': return x.items.map(toJs)
        case 'json-object': return Object.fromEntries([...x.entries].map(([k, y]: [string, any]) => [k, toJs(y)]))
        default: return x.value
      }
    }
    return JSON.stringify(toJs(value))
  },
  getField: (v: any, key: string): any => (v && v.form === 'json-object' && v.entries.has(key)) ? v.entries.get(key) : { form: 'json-null' },
  getItem: (v: any, i: number): any => (v && v.form === 'json-array' && i >= 0 && i < v.items.length) ? v.items[i] : { form: 'json-null' },
}
