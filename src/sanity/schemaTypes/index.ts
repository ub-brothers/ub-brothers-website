import { type SchemaTypeDefinition } from 'sanity'
import destination from './destination'
import stickerVisa from './stickerVisa'
import tour from './tour'
import hajjVisa from './umrah'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destination, stickerVisa, tour, hajjVisa],
}
